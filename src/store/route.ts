import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { h } from 'vue'
import { clone, construct, min } from 'radash'
import type { RouteRecordRaw } from 'vue-router'
import { $t, arrayToTree, local, renderIcon } from '@/utils'
import { router } from '@/router'
import { fetchUserRoutes } from '@/service'
import { staticRoutes } from '@/router/routes.static'
import { usePermission } from '@/hooks'
import { BasicLayout } from '@/layouts/index'
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
      router.removeRoute('appRoot')
    },
    // set the currently highlighted menu key
    setActiveMenu(key: string) {
      this.activeMenu = key
    },
    /* 生成侧边菜单的数据 */
    createMenus(userRoutes: AppRoute.RowRoute[]) {
      const resultMenus = clone(userRoutes).map(i => construct(i)) as AppRoute.Route[]

      // filter menus that do not need to be displayed
      const visibleMenus = resultMenus.filter(route => !route.meta.hide)

      // generate side menu
      this.menus = arrayToTree(this.transformAuthRoutesToMenus(visibleMenus))
    },

    // render the returned routing table as a sidebar
    transformAuthRoutesToMenus(userRoutes: AppRoute.Route[]): MenuOption[] {
      const { hasPermission } = usePermission()
      // Filter out side menus without permission
      return userRoutes.filter(i => hasPermission(i.meta.roles))
        //  Sort the menu according to the order size
        .sort((a, b) => {
          if (a.meta && a.meta.order && b.meta && b.meta.order)
            return a.meta.order - b.meta.order
          else if (a.meta && a.meta.order)
            return -1
          else if (b.meta && b.meta.order)
            return 1
          else return 0
        })

        // Convert to side menu data structure
        .map((item) => {
          const target: MenuOption = {
            id: item.id,
            pid: item.pid,
            label:
                (!item.meta.menuType || item.meta.menuType === 'page')
                  ? () =>
                      h(
                        RouterLink,
                        {
                          to: {
                            path: item.path,
                          },
                        },
                        { default: () => $t(`route.${String(item.name)}`, item.meta.title) },
                      )
                  : () => $t(`route.${String(item.name)}`, item.meta.title),
            key: item.path,
            icon: item.meta.icon ? renderIcon(item.meta.icon) : undefined,
          }
          return target
        })
    },
    createRoutes(routes: AppRoute.RowRoute[]) {
      const { hasPermission } = usePermission()

      // Structure the meta field
      let resultRouter = clone(routes).map(i => construct(i)) as AppRoute.Route[]

      // Route permission filtering
      resultRouter = resultRouter.filter(i => hasPermission(i.meta.roles))

      // Generate an array of route names that need to be kept alive
      this.cacheRoutes = resultRouter.filter((i) => {
        return i.meta.keepAlive
      })
        .map(i => i.name)

      // Generate routes, no need to import files for those with redirect
      const modules = import.meta.glob('@/views/**/*.vue')
      resultRouter = resultRouter.map((item: AppRoute.Route) => {
        if (item.componentPath && !item.redirect)
          item.component = modules[`/src/views${item.componentPath}`]
        return item
      })

      // Generate route tree
      resultRouter = arrayToTree(resultRouter) as AppRoute.Route[]

      const appRootRoute: RouteRecordRaw = {
        path: '/appRoot',
        name: 'appRoot',
        redirect: import.meta.env.VITE_HOME_PATH,
        component: BasicLayout,
        meta: {
          title: '',
          icon: 'icon-park-outline:home',
        },
        children: [],
      }

      // Set the correct redirect path for the route
      this.setRedirect(resultRouter)

      // Insert the processed route into the root route
      appRootRoute.children = resultRouter as unknown as RouteRecordRaw[]
      router.addRoute(appRootRoute)
    },
    setRedirect(routes: AppRoute.Route[]) {
      routes.forEach((route) => {
        if (route.children) {
          if (!route.redirect) {
            // Filter out a collection of child elements that are not hidden
            const visibleChilds = route.children.filter(child => !child.meta.hide)

            // Redirect page to the path of the first child element by default
            let target = visibleChilds[0]

            // Filter out pages with the order attribute
            const orderChilds = visibleChilds.filter(child => child.meta.order)

            if (orderChilds.length > 0)
              target = min(orderChilds, i => i.meta.order!) as AppRoute.Route

            route.redirect = target.path
          }

          this.setRedirect(route.children)
        }
      })
    },
    async initRouteInfo() {
      if (import.meta.env.VITE_AUTH_ROUTE_MODE === 'dynamic') {
        const userInfo = local.get('userInfo')

        if (!userInfo || !userInfo.id) {
          const authStore = useAuthStore()
          authStore.resetAuthStore()
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
      this.createRoutes(rowRoutes)

      // Generate side menu
      this.createMenus(rowRoutes)

      this.isInitAuthRoute = true
    },
  },
})
