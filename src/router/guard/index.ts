import type { Router } from 'vue-router';

import { createPermissionGuard } from './permission';

const appTitle = import.meta.env.VITE_APP_TITLE;

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 开始 loadingBar
    window.$loadingBar?.start();
    // 权限操作
    await createPermissionGuard(to, from, next);
  });
  router.afterEach((to) => {
    // 修改网页标题
    document.title = `${to.meta.title}——${appTitle}`;
    // 结束 loadingBar
    window.$loadingBar?.finish();
  });
}
