import type { Router } from 'vue-router';

import { createPermissionGuard } from './permission';

const appTitle = import.meta.env.VITE_APP_TITLE;

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 判断是否是外链，如果是直接打开网页并拦截跳转
    if (to.meta.herf) {
      window.open(to.meta.herf);
      return false;
    }
    // 开始 loadingBar
    window.$loadingBar?.start();
    // 权限操作
    await createPermissionGuard(to, from, next);
  });
  router.afterEach((to) => {
    // 修改网页标题
    document.title = `${to.meta.title} — ${appTitle}`;
    // 结束 loadingBar
    window.$loadingBar?.finish();
  });
}
