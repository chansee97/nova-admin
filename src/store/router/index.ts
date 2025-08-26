import type { MenuOption } from 'naive-ui'
import { router } from '@/router'
import { staticRoutes } from '@/router/routes.static'
import { fetchUserRoutes } from '@/api'
import { $t } from '@/utils'
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
        try {
          // Get user's route
          const { data } = await fetchUserRoutes({
            id: 1,
          })
          if (!data) {
            throw new Error('Failed to fetch user routes')
          }

          return data
        }
        catch (error) {
          console.error('Failed to initialize route info:', error)
          throw error
        }
      }
      else {
        this.rowRoutes = staticRoutes
        return staticRoutes
      }
    },
    async initAuthRoute() {
      this.isInitAuthRoute = false

      try {
        // Initialize route information
        const rowRoutes = await this.initRouteInfo()
        if (!rowRoutes) {
          const error = new Error('Failed to get route information')
          window.$message.error($t(`app.getRouteError`))
          throw error
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
      }
      catch (error) {
        // 重置状态并重新抛出错误
        this.isInitAuthRoute = false
        throw error
      }
    },
  },
})
