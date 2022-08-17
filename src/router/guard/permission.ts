import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { getToken } from '@/utils/auth';
import { useRouteStore } from '@/store';
// import { setDynamicRoutes } from './dynamic';

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
        // login除了404，其余在登录后重定向到之前的网页
        const redirect = to.name === 'not-found' ? undefined : to.fullPath;
        next({ path: '/login', query: { redirect } });
      }
      return false;
    }
    // 有登录但是没有路由，初始化路由、侧边菜单等
    // await setDynamicRoutes();
    await routeStore.initAuthRoute();
    // 动态路由加载完回到根路由
    next({ name: 'root' });
    return false;
  }
  // 权限路由已经加载，仍然未找到，重定向到not-found
  // if (to.name === 'not-found-page') {
  //   next({ name: 'not-found-page', replace: true });
  // }

  // next({ name: 'root' });
  next();
}
