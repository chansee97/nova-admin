import { router } from '@/router'
import { fetchLogin, fetchUserInfo } from '@/service'
import { local } from '@/utils'
import { useRouteStore } from './router'
import { useTabStore } from './tab'

interface AuthStatus {
  userInfo: Entity.User | null
}
export const useAuthStore = defineStore('auth-store', {
  state: (): AuthStatus => {
    return {
      userInfo: null,
    }
  },
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.userInfo)
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
    async login(userName: string, password: string, captchaId?: string, captcha?: string) {
      const loginData: any = { userName, password }

      // 如果提供了验证码相关参数，则添加到登录数据中
      if (captchaId && captcha) {
        loginData.captchaId = captchaId
        loginData.captcha = captcha
      }

      const { data } = await fetchLogin(loginData)

      // 处理登录信息

      await this.handleLoginInfo(data)
    },

    /* 处理登录返回的数据 */
    async handleLoginInfo(data: any) {
      // 将token保存下来
      local.set('accessToken', data.accessToken)
      if (data.refreshToken) {
        local.set('refreshToken', data.refreshToken)
      }

      const res = await fetchUserInfo()
      this.userInfo = res.data

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
  persist: {
    storage: localStorage,
  },
})
