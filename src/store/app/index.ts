import type { GlobalThemeOverrides } from 'naive-ui'
import themeConfig from './theme.json'

type TransitionAnimation = '' | 'fade-slide' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out'
interface AppStatus {
  readonly footerText: string
  theme: GlobalThemeOverrides
  collapsed: boolean
  fullScreen: boolean
  darkMode: boolean
  grayMode: boolean
  colorWeak: boolean
  loadFlag: boolean
  showLogo: boolean
  showTabs: boolean
  showBreadcrumb: boolean
  showBreadcrumbIcon: boolean
  fixedHeader: boolean
  invertedSider: boolean
  invertedHeader: boolean
  showWatermark: boolean
  transitionAnimation: TransitionAnimation
}

const docEle = document.documentElement

const { isFullscreen, toggle } = useFullscreen(docEle)

const isDark = useDark({
  storageKey: 'admin-dark-mode',
})

export const useAppStore = defineStore('app-store', {
  state: (): AppStatus => {
    return {
      footerText: 'Copyright ©2023 Nova Admin',
      theme: themeConfig,
      collapsed: false,
      fullScreen: false,
      darkMode: isDark.value,
      grayMode: false,
      colorWeak: false,
      loadFlag: true,
      showLogo: true,
      showTabs: true,
      showBreadcrumb: true,
      showBreadcrumbIcon: true,
      fixedHeader: false,
      invertedSider: false,
      invertedHeader: false,
      showWatermark: false,
      transitionAnimation: 'fade-slide',
    }
  },
  actions: {
    resetAlltheme() {
      this.$reset()
    },
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
    toggleDarkMode(event: MouseEvent, mode?: boolean) {
      if (typeof mode === 'boolean') {
        isDark.value = mode
        this.darkMode = isDark.value
      }
      else {
        // @ts-expect-error experimental API
        const isAppearanceTransition
          = document.startViewTransition
          && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (!isAppearanceTransition) {
          isDark.value = !isDark.value
          return
        }

        const x = event.clientX
        const y = event.clientY
        const endRadius = Math.hypot(
          Math.max(x, innerWidth - x),
          Math.max(y, innerHeight - y),
        )
        // @ts-expect-error: Transition API
        const transition = document.startViewTransition(async () => {
          isDark.value = !isDark.value
          this.darkMode = isDark.value
          await nextTick()
        })
        transition.ready.then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ]
          document.documentElement.animate(
            {
              clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
            },
            {
              duration: 400,
              easing: 'ease-out',
              pseudoElement: isDark.value
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)',
            },
          )
        })
      }
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
    /* 切换显示多页签 */
    toggleShowBreadcrumbIcon() {
      this.showBreadcrumbIcon = !this.showBreadcrumbIcon
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
  persist: {
    enabled: true,
  },
})
