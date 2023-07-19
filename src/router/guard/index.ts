import type { Router } from 'vue-router'
import { createPermissionGuard } from './permission'
import { useRouteStore, useTabStore } from '@/store'

const title = import.meta.env.VITE_APP_NAME

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 判断是否是外链，如果是直接打开网页并拦截跳转
    if (to.meta.herf) {
      window.open(to.meta.herf)
      return false
    }
    // 开始 loadingBar
    window.$loadingBar?.start()
    // 权限操作
    await createPermissionGuard(to, from, next)
  })

  router.beforeResolve((to) => {
    const routeStore = useRouteStore()
    const tabStore = useTabStore()
    // 设置菜单高亮
    routeStore.setActiveMenu(to.meta.activeMenu ?? to.fullPath)
    // 添加tabs
    tabStore.addTab(to)
    // 设置高亮标签;
    tabStore.setCurrentTab(to.name as string)
  })

  router.afterEach((to) => {
    // 修改网页标题
    document.title = `${to.meta.title} - ${title}`
    // 结束 loadingBar
    window.$loadingBar?.finish()
  })
}
