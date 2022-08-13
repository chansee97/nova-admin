import type { Router } from 'vue-router';
import { getToken } from '@/utils/auth';

const appTitle = import.meta.env.VITE_APP_TITLE;

export function setupRouterGuard(router: Router) {
  const isLogin = Boolean(getToken());

  router.beforeEach((to, _from, next) => {
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
    // 修改网页标题
    document.title = `${to.meta.title}——${appTitle}`;
    next();
  });
  // router.afterEach((_to) => {});
}
