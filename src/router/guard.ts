import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import { useAppStore, useRouteStore, useTabStore } from '@/store'
import { local } from '@/utils'

const title = import.meta.env.VITE_APP_NAME

// 路由上下文
interface RouteContext {
  appStore: ReturnType<typeof useAppStore>
  routeStore: ReturnType<typeof useRouteStore>
  tabStore: ReturnType<typeof useTabStore>
  isLogin: boolean
}

// 外链处理
function handleExternalLink(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  if (to.meta.isLink) {
    window.open(to.meta.linkPath as string)
    next(false)
    return true
  }
  return false
}

// 根路径重定向
function handleRootPath(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, context: RouteContext) {
  if (to.path === '/') {
    if (context.isLogin) {
      next({ path: import.meta.env.VITE_HOME_PATH, replace: true })
    }
    else {
      next({ path: '/login', replace: true })
    }
    return true
  }
  return false
}

// 登录页面访问处理
function handleLoginPage(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, context: RouteContext) {
  if (to.name === 'login' && context.isLogin) {
    next({ path: import.meta.env.VITE_HOME_PATH, replace: true })
    return true
  }
  return false
}

// 认证检查
function handleAuthentication(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, context: RouteContext) {
  if (!context.isLogin && to.name !== 'login' && to.meta?.requiresAuth !== false) {
    const redirect = to.name === 'not-found' ? undefined : to.fullPath
    next({ path: '/login', query: { redirect } })
    return true
  }
  return false
}

// 路由初始化
async function handleRouteInitialization(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, context: RouteContext) {
  if (context.isLogin && to.name !== 'login' && !context.routeStore.isInitAuthRoute) {
    try {
      await context.routeStore.initAuthRoute()

      if (to.name === 'not-found') {
        next({
          path: to.fullPath,
          replace: true,
          query: to.query,
          hash: to.hash,
        })
        return true
      }
    }
    catch (error) {
      console.error('Route initialization failed:', error)
      local.remove('accessToken')
      context.routeStore.resetRouteStore()
      const redirect = to.fullPath !== '/' && to.fullPath !== '/login' ? to.fullPath : undefined
      next({ path: '/login', query: redirect ? { redirect } : undefined, replace: true })
      return true
    }
  }
  return false
}

// 路由处理器列表
const routeHandlers = [
  handleExternalLink,
  handleRootPath,
  handleLoginPage,
  handleAuthentication,
  handleRouteInitialization,
]

// 处理路由
async function processRoute(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, context: RouteContext) {
  for (const handler of routeHandlers) {
    const handled = await handler(to, from, next, context)
    if (handled)
      return
  }

  // 如果没有任何处理器处理该路由，则继续导航
  next()
}

export function setupRouterGuard(router: Router) {
  const appStore = useAppStore()
  const routeStore = useRouteStore()
  const tabStore = useTabStore()

  router.beforeEach(async (to, from, next) => {
    // 开始 loadingBar
    appStore.showProgress && window.$loadingBar?.start()

    // 创建路由上下文
    const context: RouteContext = {
      appStore,
      routeStore,
      tabStore,
      isLogin: Boolean(local.get('accessToken')),
    }

    // 使用函数式处理路由
    await processRoute(to, from, next, context)
  })

  router.beforeResolve((to) => {
    // 设置菜单高亮
    routeStore.setActiveMenu(to.meta.activePath || to.fullPath)
    // 添加tabs
    tabStore.addTab(to)
    // 设置高亮标签
    tabStore.setCurrentTab(to.fullPath as string)
  })

  router.afterEach((to) => {
    // 修改网页标题
    document.title = `${to.meta.title || 'Nova Admin'} - ${title}`
    // 结束 loadingBar
    appStore.showProgress && window.$loadingBar?.finish()
  })
}
