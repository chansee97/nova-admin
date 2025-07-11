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
    if (to.meta.href) {
      window.open(to.meta.href)
      next(false) // 取消当前导航
      return
    }
    // 开始 loadingBar
    appStore.showProgress && window.$loadingBar?.start()

    // 判断有无TOKEN,登录鉴权
    const isLogin = Boolean(local.get('accessToken'))

    // 如果是login路由，直接放行
    if (to.name === 'login') {
      // login页面不需要任何认证检查，直接放行
      // 继续执行后面的逻辑
    }
    // 如果路由明确设置了requiresAuth为false，直接放行
    else if (to.meta.requiresAuth === false) {
      // 明确设置为false的路由直接放行
      // 继续执行后面的逻辑
    }
    // 如果路由设置了requiresAuth为true，且用户未登录，重定向到登录页
    else if (to.meta.requiresAuth === true && !isLogin) {
      const redirect = to.name === '404' ? undefined : to.fullPath
      next({ path: '/login', query: { redirect } })
      return
    }

    // 判断路由有无进行初始化
    if (!routeStore.isInitAuthRoute) {
      await routeStore.initAuthRoute()
      // 动态路由加载完回到根路由
      if (to.name === '404') {
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

    // 如果用户已登录且访问login页面，重定向到首页
    if (to.name === 'login' && isLogin) {
      next({ path: '/' })
      return
    }

    next()
  })
  router.beforeResolve((to) => {
    // 设置菜单高亮
    routeStore.setActiveMenu(to.meta.activeMenu ?? to.fullPath)
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
