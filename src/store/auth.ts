import { router } from '@/router'
import { fetchLogin } from '@/service'
import { local } from '@/utils'
import { useRouteStore } from './router'
import { useTabStore } from './tab'

interface AuthStatus {
  userInfo: Api.Login.Info | null
  token: string
}
export const useAuthStore = defineStore('auth-store', {
  state: (): AuthStatus => {
    return {
      userInfo: local.get('userInfo'),
      token: local.get('accessToken') || '',
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
    async logout() {
      const route = unref(router.currentRoute)
      // 清除本地缓存
      this.clearAuthStorage()
      // 清空路由、菜单等数据
      const routeStore = useRouteStore()
      routeStore.resetRouteStore()
      // 清空标签栏数据
      const tabStore = useTabStore()
      tabStore.clearAllTabs()
      // 重置当前存储库
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
      local.remove('accessToken')
      local.remove('refreshToken')
      local.remove('userInfo')
    },

    /* 用户登录 */
    async login(userName: string, password: string) {
      try {
        const { isSuccess, data } = await fetchLogin({ userName, password })
        if (!isSuccess)
          return

        // 处理登录信息
        await this.handleLoginInfo(data)
      }
      catch (e) {
        console.warn('[Login Error]:', e)
      }
    },

    /* 处理登录返回的数据 */
    async handleLoginInfo(data: Api.Login.Info) {
      // 将token和userInfo保存下来
      local.set('userInfo', data)
      local.set('accessToken', data.accessToken)
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
    },
  },
})
