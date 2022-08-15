import { defineStore } from 'pinia';
import { renderIcon, getUserInfo } from '@/utils';
import { MenuOption, radioGroupProps } from 'naive-ui';
import { setDynamicRoutes } from '@/router/guard/dynamic';
import { router } from '@/router';

interface RoutesStatus {
  isInitAuthRoute: boolean;
  menus: any;
  userRoutes: any;
}
export const useRouteStore = defineStore('route-store', {
  state: (): RoutesStatus => {
    return {
      userRoutes: [],
      isInitAuthRoute: false,
      menus: [],
    };
  },
  actions: {
    resetRouteStore() {
      this.resetRoutes();
      this.$reset();
    },
    resetRoutes() {
      /* 删除后面添加的路由 */
      router.removeRoute('test');
    },
    async setUserRoutes() {
      this.userRoutes = getUserInfo().userRoutes;
    },
    async setMenus() {
      this.setUserRoutes();
      this.menus = this.transformAuthRoutesToMenus(this.userRoutes);
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

    /* 将路由树转换成一维数组 */
    FlatAuthRoutes(routes: AppRoute.Route[]) {
      let result: AppRoute.Route[] = [];
      routes.forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(item, 'children')) {
          const temp = item.children || [];
          delete item.children;
          result.push(item);
          result = [...result, ...this.FlatAuthRoutes(temp)];
        } else {
          result.push(item);
        }
      });
      return result;
    },

    async initAuthRoute() {
      await this.setMenus();
      await setDynamicRoutes();
      this.isInitAuthRoute = true;
    },
  },
});
