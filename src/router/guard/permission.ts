import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { getToken } from '@/utils/auth';
import { useRouteStore, useTabStore } from '@/store';

export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
) {
  console.log("🚀 ~ file: permission.ts:9 ~ to:", to)

  const routeStore = useRouteStore();
  const tabStore = useTabStore();

  // 判断有无TOKEN,登录鉴权
  const isLogin = Boolean(getToken());
  if (!isLogin) {
    const redirect = to.name === 'not-found' ? undefined : to.fullPath;
    return { path: '/login', query: { redirect } };
  }

  // 判断路由有无进行初始化
  if (!routeStore.isInitAuthRoute) {
    await routeStore.initAuthRoute();
  }

  // 动态路由加载完回到根路由
  if (to.name === 'not-found' && to.redirectedFrom) {
    // 等待权限路由加载好了，回到之前的路由,否则404
    const path = to.redirectedFrom.fullPath;
    return { path, replace: true, query: to.query, hash: to.hash };
  }

  // 判断当前页是否在login,则定位去首页
  if (to.name === 'login') {
    return { path: '/appRoot' }
  }

  // 权限路由已经加载，仍然未找到，重定向到404
  if (to.name === 'not-found') {
    return { name: 'not-found', replace: true };
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
}
