import { defineStore } from 'pinia';
import { renderIcon } from '@/utils/icon';
import type { MenuOption } from 'naive-ui';

interface RuutesStatus {
  menus: any;
}
export const useRouteStore = defineStore('route-store', {
  state: (): RuutesStatus => {
    return {
      menus: [],
    };
  },
  actions: {
    setMenus(data: Auth.UserInfoPermissions[]) {
      this.menus = this.transformAuthRoutesToMenus(data);
    },
    // 将返回的路由表渲染成侧边栏
    transformAuthRoutesToMenus(data: Auth.UserInfoPermissions[]): MenuOption[] {
      return data.map((item) => {
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
  },
});
