import { defineStore } from 'pinia';

export const useAppStore = defineStore('app-store', {
  state: () => {
    return {
      collapsed: false,
      fullScreen: false,
      darkMode: false,
      title: import.meta.env.VITE_APP_TITLE,
    };
  },
  actions: {
    /* 切换侧边栏收缩 */
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    /* 切换全屏 */
    toggleFullScreen() {
      if (!document.fullscreenElement) {
        this.fullScreen = true;
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        this.fullScreen = false;
        document.exitFullscreen();
      }
    },
    /* 切换主题 亮/深色 */
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
});
