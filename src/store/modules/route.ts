import { defineStore } from 'pinia';
import { renderIcon } from '@/utils/icon';

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
    transformAuthRoutesToMenus(data: Auth.UserInfoPermissions[]) {
      return data.map((item) => {
        item.icon = renderIcon(item.icon);
        if (item.children) {
          this.transformAuthRoutesToMenus(item.children);
        }
        return item;
      });
    },
  },
});
