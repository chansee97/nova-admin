import { createMenus, createRoutes } from './helper'
import { $t, local } from '@/utils'
import { router } from '@/router'
import { fetchUserRoutes } from '@/service'
import { staticRoutes } from '@/router/routes.static'
import { useAuthStore } from '@/store/auth'

interface RoutesStatus {
  isInitAuthRoute: boolean
  menus: AppRoute.Route[]
  rowRoutes: AppRoute.RowRoute[]
  activeMenu: string | null
  cacheRoutes: string[]
}
export const useRouteStore = defineStore('route-store', {
  state: (): RoutesStatus => {
    return {
      isInitAuthRoute: false,
      menus: [],
      rowRoutes: [],
      activeMenu: null,
      cacheRoutes: [],
    }
  },
  actions: {
    resetRouteStore() {
      this.resetRoutes()
      this.$reset()
    },
    resetRoutes() {
      if (router.hasRoute('appRoot'))
        router.removeRoute('appRoot')
    },
    // set the currently highlighted menu key
    setActiveMenu(key: string) {
      this.activeMenu = key
    },

    async initRouteInfo() {
      if (import.meta.env.VITE_AUTH_ROUTE_MODE === 'dynamic') {
        const userInfo = local.get('userInfo')

        if (!userInfo || !userInfo.id) {
          const authStore = useAuthStore()
          authStore.logout()
          return
        }

        // Get user's route
        const { data } = await fetchUserRoutes({
          id: userInfo.id,
        })

        if (!data)
          return

        return data
      }
      else {
        this.rowRoutes = staticRoutes
        return staticRoutes
      }
    },
    async initAuthRoute() {
      this.isInitAuthRoute = false

      // Initialize route information
      const rowRoutes = await this.initRouteInfo()
      if (!rowRoutes) {
        window.$message.error($t(`app.getRouteError`))
        return
      }
      this.rowRoutes = rowRoutes

      // Generate actual route and insert
      const routes = createRoutes(rowRoutes)
      router.addRoute(routes)

      // Generate side menu
      this.menus = createMenus(rowRoutes)

      this.isInitAuthRoute = true
    },
  },
})
