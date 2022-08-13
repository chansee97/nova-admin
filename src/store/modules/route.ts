import { defineStore } from 'pinia';

export const useRouteStore = defineStore('route-store', {
  state: () => {
    return {
      menus: [],
    };
  },
  actions: {
    setMenus(data: any) {
      // TODO不应为any
      this.menus = data;
    },
  },
});
