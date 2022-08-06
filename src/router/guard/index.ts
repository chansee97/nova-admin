import type { Router } from 'vue-router';

export function setupRouterGuard(router: Router) {
  router.beforeEach((_to, _from, next) => {
    next();
  });
  // router.afterEach((_to) => {});
}
