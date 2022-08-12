import { defineStore } from 'pinia';
import { nextTick } from 'vue';
import { darkTheme, GlobalTheme } from 'naive-ui';

interface AppStatus {
  title: string;
  footerText: string;
  collapsed: boolean;
  fullScreen: boolean;
  darkMode: boolean;
  darkTheme: GlobalTheme | null;
  loadFlag: boolean;
}

export const useAppStore = defineStore('app-store', {
  state: (): AppStatus => {
    return {
      title: import.meta.env.VITE_APP_TITLE,
      footerText: '哲学的基本问题是思维和存在的关系问题',
      collapsed: false,
      fullScreen: false,
      darkMode: false,
      darkTheme: null,
      loadFlag: true,
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
      if (this.darkMode) {
        this.darkTheme = darkTheme;
      } else {
        this.darkTheme = null;
      }
    },
    /**
     * @description: 页面内容重载
     * @param {number} delay - 延迟毫秒数
     * @return {*}
     */
    async reloadPage(delay = 100) {
      this.loadFlag = false;
      await nextTick();
      if (delay) {
        setTimeout(() => {
          this.loadFlag = true;
        }, delay);
      } else {
        this.loadFlag = true;
      }
    },
  },
});
