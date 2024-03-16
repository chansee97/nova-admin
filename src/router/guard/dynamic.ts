import type { RouteRecordRaw } from 'vue-router'
import { clone, construct, min } from 'radash'
import { BasicLayout } from '@/layouts/index'
import { useRouteStore } from '@/store'
import { usePermission } from '@/hooks'
import { arrayToTree } from '@/utils'

// 引入所有页面
const modules = import.meta.glob('../../views/**/*.vue')

/* 含有子级的路由重定向到第一个子级 */
function setRedirect(routes: AppRoute.Route[]) {
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

      setRedirect(route.children)
    }
  })
}
export function createDynamicRoutes(routes: AppRoute.RowRoute[]) {
  const { hasPermission } = usePermission()
  // 结构化meta字段
  let resultRouter = clone(routes).map(i => construct(i)) as AppRoute.Route[]
  // 路由权限过滤
  resultRouter = resultRouter.filter(i => hasPermission(i.meta.roles))

  // 生成需要keepAlive的路由name数组
  const routeStore = useRouteStore()
  routeStore.cacheRoutes = resultRouter.filter((i) => {
    return i.meta.keepAlive
  })
    .map(i => i.name)

  // 生成路由，有redirect的不需要引入文件
  resultRouter = resultRouter.map((item: any) => {
    if (item.componentPath && !item.redirect)
      item.component = modules[`../../views${item.componentPath}`]
    return item
  })

  resultRouter = arrayToTree(resultRouter) as AppRoute.Route[]
  setRedirect(resultRouter)
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
  return appRootRoute
}
