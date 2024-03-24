import { useRouteStore } from './route'
import { useTabStore } from './tab'
import { fetchLogin } from '@/service'
import { router } from '@/router'
import { local } from '@/utils'

interface AuthStatus {
  userInfo: ApiAuth.loginInfo | null
  token: string
}
export const useAuthStore = defineStore('auth-store', {
  state: (): AuthStatus => {
    return {
      userInfo: local.get('userInfo'),
      token: local.get('token') || '',
    }
  },
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token)
    },
  },
  actions: {
    /* 登录退出，重置用户信息等 */
    async resetAuthStore() {
      const route = unref(router.currentRoute)
      // 清除本地缓存
      this.clearAuthStorage()
      // 清空路由、菜单等数据
      const routeStore = useRouteStore()
      routeStore.resetRouteStore()
      // 清空标签栏数据
      const tabStore = useTabStore()
      tabStore.clearAllTabs()
      // 重制当前存储库
      this.$reset()
      // 重定向到登录页
      if (route.meta.requiresAuth) {
        router.push({
          name: 'login',
          query: {
            redirect: route.fullPath,
          },
        })
      }
    },
    clearAuthStorage() {
      local.remove('token')
      local.remove('refreshToken')
      local.remove('userInfo')
    },

    /* 用户登录 */
    async login(username: string, password: string) {
      const { error, data } = await fetchLogin({ username, password })
      if (error)
        return

      // 处理登录信息
      await this.handleAfterLogin(data)
    },

    /* 登录后的处理函数 */
    async handleAfterLogin(data: ApiAuth.loginInfo) {
      // 将token和userInfo保存下来
      local.set('userInfo', data)
      local.set('token', data.accessToken)
      local.set('refreshToken', data.refreshToken)
      this.token = data.accessToken
      this.userInfo = data

      // 添加路由和菜单
      const routeStore = useRouteStore()
      await routeStore.initAuthRoute()

      // 进行重定向跳转
      const route = unref(router.currentRoute)
      const query = route.query as { redirect: string }
      router.push({
        path: query.redirect || '/',
      })

      // 触发用户提示
      window.$notification?.success({
        title: '登录成功!',
        content: `欢迎回来😊，${this.userInfo?.nickname}!`,
        duration: 3000,
      })
    },
  },
})
