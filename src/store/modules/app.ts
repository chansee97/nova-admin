import { defineStore } from 'pinia';
import { nextTick } from 'vue';
import { darkTheme, GlobalTheme } from 'naive-ui';

interface AppStatus {
	readonly footerText: string;
	collapsed: boolean;
	fullScreen: boolean;
	darkMode: boolean;
	grayMode: boolean;
	colorWeak: boolean;
	darkTheme: GlobalTheme | null;
	loadFlag: boolean;
	showLogo: boolean;
	showTabs: boolean;
	showBreadcrumb: boolean;
	fixedHeader: boolean;
	fixedFooter: boolean;
	invertedSider: boolean;
	invertedHeader: boolean;
}

const docEle = document.documentElement;

export const useAppStore = defineStore('app-store', {
	state: (): AppStatus => {
		return {
			footerText: 'Copyright ©2023 Ench Admin',
			collapsed: false,
			fullScreen: false,
			darkMode: false,
			grayMode: false,
			colorWeak: false,
			darkTheme: null,
			loadFlag: true,
			showLogo: true,
			showTabs: true,
			showBreadcrumb: true,
			fixedHeader: false,
			fixedFooter: true,
			invertedSider: false,
			invertedHeader: false,
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
		/* 设置主题深色 */
		setDarkMode(mode: boolean) {
			if (mode) {
				this.darkMode = true;
				this.darkTheme = darkTheme;
			} else {
				this.darkMode = false;
				this.darkTheme = null;
			}
		},
		/**
		 * @description: 页面内容重载
		 * @param {number} delay - 延迟毫秒数
		 * @return {*}
		 */
		async reloadPage(delay = 600) {
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
		/* 切换色弱模式 */
		toggleColorWeak() {
			docEle.classList.toggle('color-weak');
			this.colorWeak = docEle.classList.contains('color-weak');
		},
		/* 切换灰色模式 */
		toggleGrayMode() {
			docEle.classList.toggle('gray-mode');
			this.grayMode = docEle.classList.contains('gray-mode');
		},
		/* 切换显示logo */
		toggleShowLogo() {
			this.showLogo = !this.showLogo;
		},
		/* 切换显示多页签 */
		toggleShowTabs() {
			this.showTabs = !this.showTabs;
		},
		/* 切换显示多页签 */
		toggleShowBreadcrumb() {
			this.showBreadcrumb = !this.showBreadcrumb;
		},
		/* 切换固定头部和标签页 */
		toggleFixedHeader() {
			this.fixedHeader = !this.fixedHeader;
		},
		/* 切换固定底部 */
		toggleFixedFooter() {
			this.fixedFooter = !this.fixedFooter;
		},
		/* 切换固定底部 */
		toggleInvertedSider() {
			this.invertedSider = !this.invertedSider;
		},
		/* 切换固定底部 */
		toggleInvertedHeader() {
			this.invertedHeader = !this.invertedHeader;
		},
	},
});
