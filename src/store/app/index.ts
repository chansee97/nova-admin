import type { GlobalThemeOverrides } from 'naive-ui'
import chroma from 'chroma-js'
import themeConfig from './theme.json'

type TransitionAnimation = '' | 'fade-slide' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out'
interface AppStatus {
  theme: GlobalThemeOverrides
  primaryColor: string
  infoColor: string
  successColor: string
  warningColor: string
  errorColor: string
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
      theme: themeConfig,
      primaryColor: '#18a058',
      infoColor: '#2080f0',
      successColor: '#18a058',
      warningColor: '#f0a020',
      errorColor: '#d03050',
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
    // 重置所有设置
    resetAlltheme() {
      this.theme = themeConfig
      this.primaryColor = '#18a058'
      this.infoColor = '#2080f0'
      this.successColor = '#18a058'
      this.warningColor = '#f0a020'
      this.errorColor = '#d03050'
      this.collapsed = false
      this.fullScreen = false
      this.darkMode = isDark.value
      this.grayMode = false
      this.colorWeak = false
      this.loadFlag = true
      this.showLogo = true
      this.showTabs = true
      this.showBreadcrumb = true
      this.showBreadcrumbIcon = true
      this.fixedHeader = false
      this.invertedSider = false
      this.invertedHeader = false
      this.showWatermark = false
      this.transitionAnimation = 'fade-slide'

      // 重置所有配色
      this.setPrimaryColor(this.primaryColor)
      this.setInfoColor(this.infoColor)
      this.setSuccessColor(this.successColor)
      this.setWarningColor(this.warningColor)
      this.setErrorColor(this.errorColor)
    },

    /* 设置主题色 */
    setPrimaryColor(color: string) {
      const brightenColor = chroma(color).brighten(1).hex()
      const darkenColor = chroma(color).darken(1).hex()
      Object.assign(this.theme.common, {
        primaryColor: color,
        primaryColorHover: brightenColor,
        primaryColorPressed: darkenColor,
        primaryColorSuppl: brightenColor,
      })
    },

    /* 设置信息色 */
    setInfoColor(color: string) {
      const brightenColor = chroma(color).brighten(1).hex()
      const darkenColor = chroma(color).darken(1).hex()
      Object.assign(this.theme.common, {
        infoColor: color,
        infoColorHover: brightenColor,
        infoColorPressed: darkenColor,
        infoColorSuppl: brightenColor,
      })
    },

    /* 设置成功色 */
    setSuccessColor(color: string) {
      const brightenColor = chroma(color).brighten(1).hex()
      const darkenColor = chroma(color).darken(1).hex()
      Object.assign(this.theme.common, {
        successColor: color,
        successColorHover: brightenColor,
        successColorPressed: darkenColor,
        successColorSuppl: brightenColor,
      })
    },

    /* 设置警告色 */
    setWarningColor(color: string) {
      const brightenColor = chroma(color).brighten(1).hex()
      const darkenColor = chroma(color).darken(1).hex()
      Object.assign(this.theme.common, {
        warningColor: color,
        warningColorHover: brightenColor,
        warningColorPressed: darkenColor,
        warningColorSuppl: brightenColor,
      })
    },
    /* 设置错误色 */
    setErrorColor(color: string) {
      const brightenColor = chroma(color).brighten(1).hex()
      const darkenColor = chroma(color).darken(1).hex()
      Object.assign(this.theme.common, {
        errorColor: color,
        errorColorHover: brightenColor,
        errorColorPressed: darkenColor,
        errorColorSuppl: brightenColor,
      })
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
