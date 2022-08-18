import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';

interface TabState {
  tabs: RouteLocationNormalized[];
}
export const useTabStore = defineStore('tab-store', {
  state: (): TabState => {
    return {
      tabs: [],
    };
  },
  actions: {
    addTab(route: RouteLocationNormalized) {
      this.tabs.push(route);
    },
  },
});
