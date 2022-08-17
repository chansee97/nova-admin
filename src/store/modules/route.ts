import { defineStore } from 'pinia';
import { renderIcon, getUserInfo } from '@/utils';
import { MenuOption } from 'naive-ui';
import { createDynamicRoutes } from '@/router/guard/dynamic';
import { router } from '@/router';
import { fetchUserRoutes } from '@/service';

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
      router.removeRoute('appRoot');
    },
    createMenus(userRoutes: AppRoute.Route[]) {
      this.userRoutes = userRoutes;
      this.menus = this.transformAuthRoutesToMenus(userRoutes);
    },
    async initDynamicRoute() {
      // 根据用户id来获取用户的路由
      const { userId } = getUserInfo();
      const { data } = await fetchUserRoutes(userId);
      // 根据用户返回的路由表来生成真实路由
      const appRoutes = await createDynamicRoutes(data);
      // 更具返回的生成侧边菜单
      await this.createMenus(data);
      // 插入路由表
      router.addRoute(appRoutes);
    },
    // 将返回的路由表渲染成侧边栏
    transformAuthRoutesToMenus(userRoutes: AppRoute.Route[]): MenuOption[] {
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
      await this.initDynamicRoute();
      this.isInitAuthRoute = true;
    },
  },
});
