import { defineStore } from 'pinia';
import { renderIcon, getUserInfo } from '@/utils';
import { MenuOption } from 'naive-ui';
import { createDynamicRoutes } from '@/router/guard/dynamic';
import { router } from '@/router';
import { fetchUserRoutes } from '@/service';

interface RoutesStatus {
  isInitAuthRoute: boolean;
  menus: any;
  userRoutes: AppRoute.Route[];
  activeMenu: string | null;
}
export const useRouteStore = defineStore('route-store', {
  state: (): RoutesStatus => {
    return {
      userRoutes: [],
      isInitAuthRoute: false,
      menus: [],
      activeMenu: null,
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
    /* 根据当前路由的name生成面包屑数据 */
    createBreadcrumbInRoutes(name = '/', userRoutes: AppRoute.Route[]) {
      return userRoutes.filter((item) => {
        if (item.name === name) {
          return true;
        }
        if (item.children) {
          return this.hasNameInBreadcrumbsChildren(name, item.children);
        }
      });
    },
    /* 判断子路由中是否存在为name的路由 */
    hasNameInBreadcrumbsChildren(name: string, userRoutes: AppRoute.Route[]): boolean {
      return userRoutes.some((item) => {
        if (item.name === name) {
          return true;
        }
        if (item.children) {
          return this.hasNameInBreadcrumbsChildren(name, item.children);
        }
      });
    },
    /* 设置当前高亮的菜单key */
    setActiveMenu(key: string) {
      this.activeMenu = key;
    },
    /* 生成侧边菜单的数据 */
    createMenus(userRoutes: AppRoute.Route[]) {
      this.userRoutes = userRoutes;
      this.menus = this.transformAuthRoutesToMenus(userRoutes);
    },
    /* 初始化动态路由 */
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
    //* 将返回的路由表渲染成侧边栏 */
    transformAuthRoutesToMenus(userRoutes: AppRoute.Route[]): MenuOption[] {
      return userRoutes
        .filter((item) => {
          return !item.meta.hide;
        })
        .map((item) => {
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
            const children = this.transformAuthRoutesToMenus(item.children);
            // 只有子元素有且不为空时才添加
            if (children.length !== 0) {
              target.children = children;
            }
          }
          return target;
        });
    },
    async initAuthRoute() {
      this.isInitAuthRoute = false;
      await this.initDynamicRoute();
      this.isInitAuthRoute = true;
    },
  },
});
