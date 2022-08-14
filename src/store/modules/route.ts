import { defineStore } from 'pinia';
import { renderIcon, getUserInfo } from '@/utils';
import type { MenuOption } from 'naive-ui';
// import { useAuthStore } from './auth';

// const authStore = useAuthStore();

interface RoutesStatus {
  isInitAuthRoute: boolean;
  menus: any;
}
export const useRouteStore = defineStore('route-store', {
  state: (): RoutesStatus => {
    return {
      isInitAuthRoute: false,
      menus: [],
    };
  },
  actions: {
    async setMenus() {
      const { userRoutes } = getUserInfo();
      this.menus = this.transformAuthRoutesToMenus(userRoutes);
    },
    // 将返回的路由表渲染成侧边栏
    transformAuthRoutesToMenus(userRoutes: Auth.UserInfoPermissions[]): MenuOption[] {
      return userRoutes.map((item) => {
        const target: MenuOption = {
          label: item.meta.title,
          key: item.path,
        };
        // 判断有无图标
        if (item.meta.icon) {
          target.icon = renderIcon(item.meta.icon);
        }
        // 判断子元素
        if (item.children) {
          target.children = this.transformAuthRoutesToMenus(item.children);
        }
        return target;
      });
    },

    async initAuthRoute() {
      await this.setMenus();
      this.isInitAuthRoute = true;
    },
  },
});
