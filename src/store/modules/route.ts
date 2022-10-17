import { defineStore } from 'pinia';
import { renderIcon, getUserInfo } from '@/utils';
import { MenuOption } from 'naive-ui';
import { createDynamicRoutes } from '@/router/guard/dynamic';
import { router } from '@/router';
import { fetchUserRoutes } from '@/service';
import { staticRoutes } from '@/router/modules';

interface RoutesStatus {
  isInitAuthRoute: boolean;
  menus: any;
  userRoutes: AppRoute.Route[];
  activeMenu: string | null;
  authRouteMode: ImportMetaEnv['VITE_AUTH_ROUTE_MODE'];
  cacheRoutes: string[];
}
export const useRouteStore = defineStore('route-store', {
  state: (): RoutesStatus => {
    return {
      userRoutes: [],
      isInitAuthRoute: false,
      menus: [],
      activeMenu: null,
      authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
      cacheRoutes: [],
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
    createBreadcrumbFromRoutes(routeName = '/', userRoutes: AppRoute.Route[]) {
      const path: AppRoute.Route[] = [];
      // 筛选所有包含目标的各级路由组合成一维数组
      const getPathfromRoutes = (routeName: string, userRoutes: AppRoute.Route[]) => {
        userRoutes.forEach((item) => {
          if (this.hasPathinAllPath(routeName, item)) {
            path.push(item);
            if (item.children && item.children.length !== 0) {
              getPathfromRoutes(routeName, item.children);
            }
          }
        });
      };
      getPathfromRoutes(routeName, userRoutes);
      return path;
    },
    /* 判断当前路由和子路由中是否存在为routeName的路由 */
    hasPathinAllPath(routeName: string, userRoutes: AppRoute.Route) {
      if (userRoutes.name === routeName) {
        return true;
      }
      if (userRoutes.children && userRoutes.children.length !== 0) {
        const arr: boolean[] = [];
        userRoutes.children.forEach((item) => {
          arr.push(this.hasPathinAllPath(routeName, item));
        });
        return arr.some((item) => {
          return item;
        });
      }
      return false;
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
      // 生成侧边菜单
      await this.createMenus(data);
      // 插入路由表
      router.addRoute(appRoutes);
    },
    /* 初始化静态路由 */
    async initStaticRoute() {
      // 根据静态路由表来生成真实路由
      const appRoutes = await createDynamicRoutes(staticRoutes);
      // 生成侧边菜单
      await this.createMenus(staticRoutes);
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
      if (this.authRouteMode === 'dynamic') {
        await this.initDynamicRoute();
      } else {
        await this.initStaticRoute();
      }
      this.isInitAuthRoute = true;
    },
  },
});
