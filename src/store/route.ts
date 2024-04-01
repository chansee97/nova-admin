import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { h } from 'vue'
import { clone, construct, min } from 'radash'
import type { RouteRecordRaw } from 'vue-router'
import { arrayToTree, local, renderIcon } from '@/utils'
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
      /* 删除后面添加的路由 */
      router.removeRoute('appRoot')
    },
    /* 设置当前高亮的菜单key */
    setActiveMenu(key: string) {
      this.activeMenu = key
    },
    /* 生成侧边菜单的数据 */
    createMenus(userRoutes: AppRoute.RowRoute[]) {
      const resultMenus = clone(userRoutes).map(i => construct(i)) as AppRoute.Route[]
      // arrayToTree2()
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
            icon: item.meta.icon ? renderIcon(item.meta.icon) : undefined,
          }
          return target
        })
    },
    setRedirect(routes: AppRoute.Route[]) {
      routes.forEach((route) => {
        if (route.children) {
          if (!route.redirect) {
            // 过滤出没有隐藏的子元素集
            const visibleChilds = route.children.filter(child => !child.meta.hide)

            // 过滤出含有order属性的页面
            const orderChilds = visibleChilds.filter(child => child.meta.order)

            // 重定向页默认第一个子元素的路径
            let target = route.children[0]
            if (orderChilds.length > 0)
            // 有order则取最小者重定向
              target = min(orderChilds, i => i.meta.order as number) as AppRoute.Route

            route.redirect = target.path
          }

          this.setRedirect(route.children)
        }
      })
    },
    createRoutes(routes: AppRoute.RowRoute[]) {
      const { hasPermission } = usePermission()
      // 结构化meta字段
      let resultRouter = clone(routes).map(i => construct(i)) as AppRoute.Route[]
      // 路由权限过滤
      resultRouter = resultRouter.filter(i => hasPermission(i.meta.roles))

      // 生成需要keepAlive的路由name数组
      this.cacheRoutes = resultRouter.filter((i) => {
        return i.meta.keepAlive
      })
        .map(i => i.name)

      // 生成路由，有redirect的不需要引入文件
      const modules = import.meta.glob('@/views/**/*.vue')
      resultRouter = resultRouter.map((item: any) => {
        if (item.componentPath && !item.redirect)
          item.component = modules[`/src/views${item.componentPath}`]
        return item
      })

      resultRouter = arrayToTree(resultRouter) as AppRoute.Route[]
      console.warn('🚀 ~ createRoutes ~ resultRouter:', resultRouter)
      this.setRedirect(resultRouter)
      const appRootRoute: RouteRecordRaw = {
        path: '/appRoot',
        name: 'appRoot',
        redirect: import.meta.env.VITE_HOME_PATH,
        component: BasicLayout,
        meta: {
          title: '首页',
          icon: 'icon-park-outline:home',
        },
        children: [],
      }
      // 根据角色过滤后的插入根路由中
      appRootRoute.children = resultRouter as unknown as RouteRecordRaw[]
      // 插入路由表
      router.addRoute(appRootRoute)
    },
    async initRouteInfo() {
      if (import.meta.env.VITE_AUTH_ROUTE_MODE === 'dynamic') {
        // 根据用户id来获取用户的路由
        const userInfo = local.get('userInfo')

        if (!userInfo || !userInfo.id) {
          const authStore = useAuthStore()
          authStore.resetAuthStore()
          return
        }

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
      // 初始化路由信息
      const rowRoutes = await this.initRouteInfo()
      if (!rowRoutes) {
        window.$message.error('获取路由失败，请稍后再试')
        return
      }
      this.rowRoutes = rowRoutes
      // 生成真实路由并插入
      this.createRoutes(rowRoutes)
      // 生成侧边菜单
      this.createMenus(rowRoutes)

      this.isInitAuthRoute = true
    },
  },
})
