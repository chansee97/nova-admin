import { useRouteStore } from './route'
import { fetchLogin, fetchUserInfo } from '@/service'
import { router } from '@/router'
import { useAppRouter } from '@/hooks'
import { local } from '@/utils'

const emptyInfo: Auth.UserInfo = {
  userId: 0,
  userName: '',
  nickName: '',
  avatar: '',
  role: 'user',
}
export const useAuthStore = defineStore('auth-store', {
  state: () => {
    return {
      userInfo: local.get('userInfo') || emptyInfo,
      token: local.get('token') || '',
      refreshToken: local.get('refreshToken') || '',
      loginLoading: false,
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
      const { toLogin } = useAppRouter(false)
      // 清除本地缓存
      this.clearAuthStorage()
      // 清空路由、菜单等数据
      const routeStore = useRouteStore()
      routeStore.resetRouteStore()
      this.$reset()
      if (route.meta.requiresAuth)
        await toLogin()
    },
    clearAuthStorage() {
      local.remove('token')
      local.remove('refreshToken')
      local.remove('userInfo')
    },

    /* 用户登录 */
    async login(username: string, password: string) {
      this.loginLoading = true
      const { error, data } = await fetchLogin({ username, password })
      if (error) {
        this.loginLoading = false
        return
      }
      // 处理登录信息
      await this.handleAfterLogin(data)

      this.loginLoading = false
    },

    /* 登录后的处理函数 */
    async handleAfterLogin(data: ApiAuth.loginToken) {
      // 将token和userInfo保存下来
      const catchSuccess = await this.catchUserInfo(data)

      // 添加路由和菜单
      const routeStore = useRouteStore()
      await routeStore.initAuthRoute()

      // 登录写入信息成功
      if (catchSuccess) {
        // 进行重定向跳转
        const { toLoginRedirect } = useAppRouter(false)
        await toLoginRedirect()

        // 触发用户提示
        window.$notification?.success({
          title: '登录成功!',
          content: `欢迎回来😊，${this.userInfo.nickName}!`,
          duration: 3000,
        })
        return
      }
      // 如果不成功则重置存储
      await this.resetAuthStore()
    },

    /* 缓存用户信息 */
    async catchUserInfo(userInfo: ApiAuth.loginToken) {
      let catchSuccess = false
      const { accessToken, refreshToken, id } = userInfo
      const { error, data } = await fetchUserInfo({ userId: id })
      if (error)
        return catchSuccess

      // 先存储token
      local.set('token', accessToken)
      local.set('refreshToken', refreshToken)
      this.token = accessToken
      this.refreshToken = refreshToken
      // 请求/存储用户信息
      local.set('userInfo', data)
      this.userInfo = data
      catchSuccess = true

      return catchSuccess
    },
    async toggleUserRole(role: Auth.RoleType) {
      await this.login(role, '123456')
    },
  },
})
