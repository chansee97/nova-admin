import type { Router } from 'vue-router';

export function setupRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // console.log('%c [to]-24', 'font-size:13px; background:pink; color:#bf2c9f;', to);
    next();
  });
  router.afterEach((to) => {
    // 设置document title
    // useTitle(to.meta.title);
    // 结束 loadingBar
    // window.$loadingBar?.finish();
  });
}
