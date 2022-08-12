import type { Router } from 'vue-router';
import { getToken } from '@/utils/auth';

// const authStore = useAuthStore();

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
    next();
  });
  // router.afterEach((_to) => {});
}
