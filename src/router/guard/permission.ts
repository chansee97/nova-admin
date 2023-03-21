import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { getToken } from '@/utils/auth';
import { useRouteStore } from '@/store';

export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const routeStore = useRouteStore();

  // 判断有无TOKEN,登录鉴权
  const isLogin = Boolean(getToken());
  if (!isLogin) {
    if (to.name == 'login') {
      next()
    }
    if (to.name !== 'login') {
      const redirect = to.name === '404' ? undefined : to.fullPath;
      next({ path: '/login', query: { redirect } });
    }
    return false
  }

  // 判断路由有无进行初始化
  if (!routeStore.isInitAuthRoute) {
    await routeStore.initAuthRoute();
    // 动态路由加载完回到根路由
    if (to.name === '404' && to.redirectedFrom) {
      // 等待权限路由加载好了，回到之前的路由,否则404
      const path = to.redirectedFrom?.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  }

  // 权限路由已经加载，仍然未找到，重定向到404
  // if (to.name === '404') {
  //   next({ name: '404', replace: true });
  //   return false;
  // }

  // 判断当前页是否在login,则定位去首页
  if (to.name === 'login') {
    next({ path: '/appRoot' })
    return false;
  }

  next()
}
