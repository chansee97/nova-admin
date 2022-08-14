import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { getToken } from '@/utils/auth';
import { useRouteStore, useAuthStore } from '@/store';

export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const isLogin = Boolean(getToken());
  const routeStore = useRouteStore();

  // 判断路由有无进行初始化
  if (!routeStore.isInitAuthRoute) {
    // 没有初始化路由 => 登录鉴权
    // 登录鉴权
    if (!isLogin) {
      if (to.name === 'login') {
        next();
      } else {
        const redirect = to.fullPath;
        next({ path: '/login', query: { redirect } });
      }
      return false;
    }

    // 有登录但是没有路由，初始化路由等
    await routeStore.initAuthRoute();
  }
  // 权限路由已经加载，仍然未找到，重定向到not-found
  // if (to.name === 'not-found-page') {
  //   next({ name: 'not-found-page', replace: true });
  // }

  // next({ name: 'root' });
  next();
}
