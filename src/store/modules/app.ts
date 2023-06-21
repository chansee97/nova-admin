interface AppStatus {
  readonly footerText: string
  collapsed: boolean
  fullScreen: boolean
  darkMode: boolean
  grayMode: boolean
  colorWeak: boolean
  loadFlag: boolean
  showLogo: boolean
  showTabs: boolean
  showBreadcrumb: boolean
  fixedHeader: boolean
  invertedSider: boolean
  invertedHeader: boolean
  showWatermark: boolean
}

const docEle = document.documentElement

const { isFullscreen, toggle } = useFullscreen(docEle)

const isDark = useDark({
  storageKey: 'admin-dark-mode',
})

export const useAppStore = defineStore('app-store', {
  state: (): AppStatus => {
    return {
      footerText: 'Copyright ©2023 Ench Admin',
      collapsed: false,
      fullScreen: false,
      darkMode: isDark.value,
      grayMode: false,
      colorWeak: false,
      loadFlag: true,
      showLogo: true,
      showTabs: true,
      showBreadcrumb: true,
      fixedHeader: false,
      invertedSider: false,
      invertedHeader: false,
      showWatermark: false,
    }
  },
  actions: {
    /* 切换侧边栏收缩 */
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    /* 切换全屏 */
    async toggleFullScreen() {
      this.fullScreen = isFullscreen.value
      await toggle()
    },
    /* 切换主题 亮/深色 */
    toggleDarkMode(mode?: boolean) {
      if (typeof mode === 'boolean')
        isDark.value = mode

      else
        isDark.value = !isDark.value

      this.darkMode = isDark.value
    },
    /**
     * @description: 页面内容重载
     * @param {number} delay - 延迟毫秒数
     * @return {*}
     */
    async reloadPage(delay = 600) {
      this.loadFlag = false
      await nextTick()
      if (delay) {
        setTimeout(() => {
          this.loadFlag = true
        }, delay)
      }
      else {
        this.loadFlag = true
      }
    },
    /* 切换色弱模式 */
    toggleColorWeak() {
      docEle.classList.toggle('color-weak')
      this.colorWeak = docEle.classList.contains('color-weak')
    },
    /* 切换灰色模式 */
    toggleGrayMode() {
      docEle.classList.toggle('gray-mode')
      this.grayMode = docEle.classList.contains('gray-mode')
    },
    /* 切换显示logo */
    toggleShowLogo() {
      this.showLogo = !this.showLogo
    },
    /* 切换显示多页签 */
    toggleShowTabs() {
      this.showTabs = !this.showTabs
    },
    /* 切换显示多页签 */
    toggleShowBreadcrumb() {
      this.showBreadcrumb = !this.showBreadcrumb
    },
    /* 切换固定头部和标签页 */
    toggleFixedHeader() {
      this.fixedHeader = !this.fixedHeader
    },
    /* 切换固定底部 */
    toggleInvertedSider() {
      this.invertedSider = !this.invertedSider
    },
    /* 切换固定底部 */
    toggleInvertedHeader() {
      this.invertedHeader = !this.invertedHeader
    },
    /* 切换固定底部 */
    toggleShowWatermark() {
      this.showWatermark = !this.showWatermark
    },
  },
})
