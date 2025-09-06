import type { Router } from 'vue-router'
import { useAppStore, useRouteStore, useTabStore } from '@/store'
import { local } from '@/utils'

const title = import.meta.env.VITE_APP_NAME

export function setupRouterGuard(router: Router) {
  const appStore = useAppStore()
  const routeStore = useRouteStore()
  const tabStore = useTabStore()

  router.beforeEach(async (to, from, next) => {
    // 判断是否是外链，如果是直接打开网页并拦截跳转
    if (to.meta.isLink) {
      window.open(to.meta.linkPath)
      next(false) // 取消当前导航
      return
    }
    // 开始 loadingBar
    appStore.showProgress && window.$loadingBar?.start()

    // 判断有无TOKEN,登录鉴权
    const isLogin = Boolean(local.get('accessToken'))

    // 处理根路由重定向
    if (to.path === '/') {
      if (isLogin) {
        // 已登录，重定向到首页
        next({ path: import.meta.env.VITE_HOME_PATH, replace: true })
      }
      else {
        // 未登录，重定向到登录页
        next({ path: '/login', replace: true })
      }
      return
    }

    // 如果用户未登录，重定向到登录页
    if (!isLogin) {
      const redirect = to.name === 'not-found' ? undefined : to.fullPath
      next({ path: '/login', query: { redirect } })
      return
    }

    // 如果用户已登录且访问login页面，重定向到首页
    if (to.name === 'login' && isLogin) {
      next({ path: '/' })
      return
    }

    // 判断路由有无进行初始化
    if (!routeStore.isInitAuthRoute && to.name !== 'login') {
      try {
        await routeStore.initAuthRoute()
        // 动态路由加载完回到根路由
        if (to.name === 'not-found') {
        // 等待权限路由加载好了，回到之前的路由,否则404
          next({
            path: to.fullPath,
            replace: true,
            query: to.query,
            hash: to.hash,
          })
          return
        }
      }
      catch {
        // 如果路由初始化失败（比如 401 错误），重定向到登录页
        local.remove('accessToken')
        const redirect = to.fullPath !== '/' ? to.fullPath : undefined
        next({ path: '/login', query: redirect ? { redirect } : undefined })
        return
      }
    }

    next()
  })
  router.beforeResolve((to) => {
    // 设置菜单高亮
    routeStore.setActiveMenu(to.meta.activePath ?? to.fullPath)
    // 添加tabs
    tabStore.addTab(to)
    // 设置高亮标签;
    tabStore.setCurrentTab(to.fullPath as string)
  })

  router.afterEach((to) => {
    // 修改网页标题
    document.title = `${to.meta.title} - ${title}`
    // 结束 loadingBar
    appStore.showProgress && window.$loadingBar?.finish()
  })
}
