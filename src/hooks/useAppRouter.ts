import type { RouteLocationRaw } from 'vue-router'
import { router as gobalRouter } from '@/router'

/**
 * @description: 全局路由方法，vue-router自带的useRouter，在根目录下不能用
 * @param {*} isSetup
 * @return {*}
 */
export function useAppRouter(isSetup = true) {
  const router = isSetup ? useRouter() : gobalRouter
  const route = router.currentRoute

  /* 路由跳转方法 */
  async function routerPush(to: RouteLocationRaw) {
    await router.push(to)
  }

  /* 路由跳转方法 */
  async function routerReplace(to: RouteLocationRaw) {
    await router.replace(to)
  }

  /* 前进后退方法 */
  function routerGo(delta: number) {
    router.go(delta)
  }

  /* 跳转根页方法 */
  async function toRoot() {
    await routerPush({ path: '/appRoot' })
  }
  /* 跳转至登录页 */
  async function toLogin(redirectUrl?: string) {
    const redirect = redirectUrl || route.value.fullPath
    const targetUrl = {
      name: 'login',
      query: { redirect },
    }
    await routerPush(targetUrl)
  }
  /* 跳转重定向方法 */
  async function toLoginRedirect() {
    const { query } = route.value
    if (query?.redirect)
      await routerPush(query.redirect as string)
    else
      await toRoot()
  }

  return {
    routerPush,
    routerReplace,
    routerGo,
    toRoot,
    toLogin,
    toLoginRedirect,
  }
}
