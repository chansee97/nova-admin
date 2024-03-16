import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { h } from 'vue'
import { clone, construct } from 'radash'
import { arrayToTree, local, renderIcon } from '@/utils'
import { createDynamicRoutes } from '@/router/guard/dynamic'
import { router } from '@/router'
import { fetchUserRoutes } from '@/service'
import { staticRoutes } from '@/router/staticRoutes'
import { usePermission } from '@/hooks'

interface RoutesStatus {
  isInitAuthRoute: boolean
  menus: any
  userRoutes: AppRoute.RowRoute[]
  activeMenu: string | null
  authRouteMode: ImportMetaEnv['VITE_AUTH_ROUTE_MODE']
  cacheRoutes: string[]
}
export const useRouteStore = defineStore('route-store', {
  state: (): RoutesStatus => {
    return {
      userRoutes: [],
      isInitAuthRoute: false,
      menus: [],
      activeMenu: null,
      authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
      cacheRoutes: [],
    }
  },
  actions: {
    resetRouteStore() {
      this.resetRoutes()
      this.$reset()
    },
    resetRoutes() {
      /* 删除后面添加的路由 */
      router.removeRoute('appRoot')
    },
    /* 判断当前路由和子路由中是否存在为routeName的路由 */
    hasPathinAllPath(routeName: string, userRoutes: AppRoute.Route) {
      if (userRoutes.name === routeName)
        return true

      if (userRoutes.children && userRoutes.children.length !== 0) {
        const arr: boolean[] = []
        userRoutes.children.forEach((item) => {
          arr.push(this.hasPathinAllPath(routeName, item))
        })
        return arr.some((item) => {
          return item
        })
      }
      return false
    },
    /* 设置当前高亮的菜单key */
    setActiveMenu(key: string) {
      this.activeMenu = key
    },
    /* 生成侧边菜单的数据 */
    createMenus(userRoutes: AppRoute.RowRoute[]) {
      this.userRoutes = userRoutes

      const resultMenus = clone(userRoutes).map(i => construct(i)) as AppRoute.Route[]
      /** 过滤不需要显示的菜单 */
      const visibleMenus = resultMenus.filter(route => !route.meta.hide)
      // 生成侧边菜单
      this.menus = arrayToTree(this.transformAuthRoutesToMenus(visibleMenus))
    },

    //* 将返回的路由表渲染成侧边栏 */
    transformAuthRoutesToMenus(userRoutes: AppRoute.Route[]): MenuOption[] {
      const { hasPermission } = usePermission()
      /** 过滤没有权限的侧边菜单 */
      return userRoutes.filter(i => hasPermission(i.meta.roles))
      /** 根据order大小菜单排序  */
        .sort((a, b) => {
          if (a.meta && a.meta.order && b.meta && b.meta.order)
            return a.meta.order - b.meta.order
          else if (a.meta && a.meta.order)
            return -1
          else if (b.meta && b.meta.order)
            return 1
          else return 0
        })
        /** 转换为侧边菜单数据结构 */
        .map((item) => {
          const target: MenuOption = {
            id: item.id,
            pid: item.pid,
            label:
                (!item.children || item.children.length === 0)
                  ? () =>
                      h(
                        RouterLink,
                        {
                          to: {
                            path: item.path,
                          },
                        },
                        { default: () => item.meta.title },
                      )
                  : item.meta.title,
            key: item.path,
            icon: renderIcon(item.meta.icon),
          }
          /** 判断子元素 */
          if (item.children) {
            const children = this.transformAuthRoutesToMenus(item.children)
            // 只有子元素有且不为空时才添加
            if (children.length !== 0)
              target.children = children
            else target.children = undefined
          }
          return target
        })
    },
    /* 初始化动态路由 */
    async initDynamicRoute() {
      // 根据用户id来获取用户的路由
      const userInfo = local.get('userInfo')

      if (!userInfo || !userInfo.id)
        return

      const { data: routes } = await fetchUserRoutes({
        id: userInfo.id,
      })

      if (!routes)
        return
      // 根据用户返回的路由表来生成真实路由
      const appRoutes = createDynamicRoutes(routes)
      // 生成侧边菜单
      this.createMenus(routes)
      // 插入路由表
      router.addRoute(appRoutes)
    },
    /* 初始化静态路由 */
    initStaticRoute() {
      // 根据静态路由表来生成真实路由
      const appRoutes = createDynamicRoutes(staticRoutes)
      // 生成侧边菜单
      this.createMenus(staticRoutes)
      // 插入路由表
      router.addRoute(appRoutes)
    },

    async initAuthRoute() {
      this.isInitAuthRoute = false
      if (this.authRouteMode === 'dynamic')
        await this.initDynamicRoute()
      else this.initStaticRoute()

      this.isInitAuthRoute = true
    },
  },
})
