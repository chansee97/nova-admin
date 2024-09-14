import type { MenuOption } from 'naive-ui'
import { router } from '@/router'
import { staticRoutes } from '@/router/routes.static'
import { fetchUserRoutes } from '@/service'
import { useAuthStore } from '@/store/auth'
import { $t, local } from '@/utils'
import { createMenus, createRoutes, generateCacheRoutes } from './helper'

interface RoutesStatus {
  isInitAuthRoute: boolean
  menus: MenuOption[]
  rowRoutes: AppRoute.RowRoute[]
  activeMenu: string | null
  cacheRoutes: string[]
}
export const useRouteStore = defineStore('route-store', {
  state: (): RoutesStatus => {
    return {
      isInitAuthRoute: false,
      activeMenu: null,
      menus: [],
      rowRoutes: [],
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
      if (import.meta.env.VITE_ROUTE_LOAD_MODE === 'dynamic') {
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

      // Generate the route cache
      this.cacheRoutes = generateCacheRoutes(rowRoutes)

      this.isInitAuthRoute = true
    },
  },
})
