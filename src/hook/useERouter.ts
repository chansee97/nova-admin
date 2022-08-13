import { useRouter, RouteLocationRaw } from 'vue-router';
import { router as gobalRouter } from '@/router';

/**
 * @description: 全局路由方法，vue-router自带的useRouter，在根目录下不能用
 * @param {*} isSetup
 * @return {*}
 */
export function useERouter(isSetup = true) {
  const router = isSetup ? useRouter() : gobalRouter;
  const route = router.currentRoute;

  /* 路由跳转方法 */
  function routerPush(to: RouteLocationRaw) {
    router.push(to);
  }

  /* 路由跳转方法 */
  function routerReplace(to: RouteLocationRaw) {
    router.replace(to);
  }

  /* 前进后退方法 */
  function routerGo(delta: number) {
    router.go(delta);
  }

  /* 跳转根页方法 */
  function toRoot() {
    routerPush({ name: 'root' });
  }
  /* 跳转至登录页 */
  function toLogin(redirectUrl?: string) {
    const redirect = redirectUrl || route.value.fullPath;
    const targetUrl = {
      name: 'login',
      query: { redirect },
    };
    routerPush(targetUrl);
  }
  /* 跳转重定向方法 */
  function toLoginRedirect() {
    const { query } = route.value;
    if (query?.redirect) {
      routerPush(query.redirect as string);
    } else {
      toRoot();
    }
  }

  return {
    routerPush,
    routerReplace,
    routerGo,
    toRoot,
    toLogin,
    toLoginRedirect,
  };
}
