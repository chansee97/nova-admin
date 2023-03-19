import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { getToken } from '@/utils/auth';
import { useRouteStore, useTabStore } from '@/store';

export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {

  const routeStore = useRouteStore();
  const tabStore = useTabStore();

  // 判断有无TOKEN,登录鉴权
  const isLogin = Boolean(getToken());

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

  // 判断路由有无进行初始化
  if (!routeStore.isInitAuthRoute) {
    await routeStore.initAuthRoute();
    // 动态路由加载完回到根路由
    if (to.name === 'not-found') {
      // 等待权限路由加载好了，回到之前的路由,否则404
      const path = to.redirectedFrom?.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  }

  // 权限路由已经加载，仍然未找到，重定向到404
  if (to.name === 'not-found') {
    next({ name: 'not-found', replace: true });
    return false;
  }

  // 判断当前页是否在login,则定位去首页
  if (to.name === 'login') {
    next({ path: '/appRoot' })
    return false;
  }

  // 设置菜单高亮
  if (to.meta.activeMenu) {
    routeStore.setActiveMenu(to.meta.activeMenu);
  } else {
    routeStore.setActiveMenu(to.fullPath);
  }

  // 添加tabs
  tabStore.addTab(to);
  // 设置高亮标签;
  tabStore.setCurrentTab(to.name as string);
  next()
}
