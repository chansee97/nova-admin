import { defineStore } from 'pinia';

export const useApp = defineStore('app-store', {
  state: () => {
    return {
      collapsed: false,
      title: import.meta.env.VITE_APP_TITLE,
    };
  },
  actions: {
    switchCollapse() {
      this.collapsed = !this.collapsed;
    },
  },
});
