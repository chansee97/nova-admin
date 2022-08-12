import { defineStore } from 'pinia';
import { darkTheme, GlobalTheme } from 'naive-ui';

interface AppStatus {
  collapsed: boolean;
  fullScreen: boolean;
  darkMode: boolean;
  darkTheme: GlobalTheme | null;
  title: string;
  footerText: string;
}

export const useAppStore = defineStore('app-store', {
  state: (): AppStatus => {
    return {
      collapsed: false,
      fullScreen: false,
      darkMode: false,
      darkTheme: null,
      title: import.meta.env.VITE_APP_TITLE,
      footerText: '哲学的基本问题是思维和存在的关系问题',
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
  },
});
