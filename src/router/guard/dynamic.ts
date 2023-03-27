import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/layouts/index'
import { useRouteStore } from '@/store'
import { usePermission } from '@/hooks'

// 引入所有页面
const modules = import.meta.glob('../../views/**/*.vue')

/* 含有子级的路由重定向到第一个子级 */
function setRedirect(routes: AppRoute.Route[]) {
  routes.forEach((route) => {
    if (route.children) {
      const nonHiddenChild = route.children.find(child => !child.meta || !child.meta.hide)
      if (nonHiddenChild)
        route.redirect = nonHiddenChild.path

      setRedirect(route.children)
    }
  })
}
/* 路由树转换成一维数组 */
function FlatAuthRoutes(routes: AppRoute.Route[]) {
  let result: AppRoute.Route[] = []
  routes.forEach((item: AppRoute.Route) => {
    if (item.children) {
      const temp = item.children || []
      delete item.children
      result.push(item)
      result = [...result, ...FlatAuthRoutes(temp)]
    }
    else {
      result.push(item)
    }
  })
  return result
}
/* 路由无权限过滤 */
function filterPermissionRoutes(routes: AppRoute.Route[]) {
  const { hasPermission } = usePermission()
  return routes.filter((route) => {
    return hasPermission(route.meta.roles)
  })
}

function createCatheRoutes(routes: AppRoute.Route[]) {
  return routes
    .filter((item) => {
      return item.meta.keepAlive
    })
    .map(item => item.name)
}
export async function createDynamicRoutes(routes: AppRoute.Route[]) {
  /* 复制一层 */
  let resultRouter = JSON.parse(JSON.stringify(routes))
  /* 设置路由重定向到子级第一个 */
  setRedirect(resultRouter)
  // 数组降维成一维数组,然后删除所有的childen
  resultRouter = FlatAuthRoutes(resultRouter)
  /* 路由权限过滤 */
  resultRouter = filterPermissionRoutes(resultRouter)
  // 过滤需要缓存的路由name数组
  const routeStore = useRouteStore()
  routeStore.cacheRoutes = createCatheRoutes(resultRouter)
  // 生成路由，有redirect的不需要引入文件
  resultRouter = resultRouter.map((item: any) => {
    if (!item.redirect) {
      // 动态加载对应页面
      item.component = modules[`../../views${item.path}/index.vue`]
    }
    return item
  })

  const appRootRoute: RouteRecordRaw = {
    path: '/appRoot',
    name: 'appRoot',
    redirect: '/dashboard/workbench',
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
