import type { GlobalThemeOverrides } from 'naive-ui'
import chroma from 'chroma-js'
import { set } from 'radash'
import { useCssVar } from '@vueuse/core'
import themeConfig from './theme.json'

type TransitionAnimation = '' | 'fade-slide' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out'
interface AppStatus {
  footerText: string
  theme: GlobalThemeOverrides
  primaryColor: string
  collapsed: boolean
  fullScreen: boolean
  darkMode: boolean
  grayMode: boolean
  colorWeak: boolean
  loadFlag: boolean
  showLogo: boolean
  showTabs: boolean
  showFooter: boolean
  showProgress: boolean
  showBreadcrumb: boolean
  showBreadcrumbIcon: boolean
  showWatermark: boolean
  transitionAnimation: TransitionAnimation
}

const docEle = ref(document.documentElement)

const { isFullscreen, toggle } = useFullscreen(docEle)

const initPrimaryColor = themeConfig.common.primaryColor
const primaryColor = useCssVar('--primary-color', docEle, { initialValue: initPrimaryColor })

const isDark = useDark({
  storageKey: 'admin-dark-mode',
})

export const useAppStore = defineStore('app-store', {
  state: (): AppStatus => {
    return {
      footerText: 'Copyright © 2024 chansee97',
      theme: themeConfig,
      primaryColor: initPrimaryColor,
      collapsed: false,
      fullScreen: false,
      darkMode: isDark.value,
      grayMode: false,
      colorWeak: false,
      loadFlag: true,
      showLogo: true,
      showTabs: true,
      showFooter: true,
      showProgress: true,
      showBreadcrumb: true,
      showBreadcrumbIcon: true,
      showWatermark: false,
      transitionAnimation: 'fade-slide',
    }
  },
  actions: {
    // 重置所有设置
    resetAlltheme() {
      this.theme = themeConfig
      this.primaryColor = '#18a058'
      this.collapsed = false
      this.fullScreen = false
      this.darkMode = isDark.value
      this.grayMode = false
      this.colorWeak = false
      this.loadFlag = true
      this.showLogo = true
      this.showTabs = true
      this.showLogo = true
      this.showFooter = true
      this.showBreadcrumb = true
      this.showBreadcrumbIcon = true
      this.showWatermark = false
      this.transitionAnimation = 'fade-slide'

      // 重置所有配色
      this.setPrimaryColor(this.primaryColor)
    },
    /* 设置主题色 */
    setPrimaryColor(rowColor?: string) {
      const color = rowColor || this.primaryColor
      primaryColor.value = color
      const brightenColor = chroma(color).brighten(1).hex()
      const darkenColor = chroma(color).darken(1).hex()
      set(this.theme, 'common.primaryColor', color)
      set(this.theme, 'common.primaryColorHover', brightenColor)
      set(this.theme, 'common.primaryColorPressed', darkenColor)
      set(this.theme, 'common.primaryColorSuppl', brightenColor)
    },
    /* 切换侧边栏收缩 */
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    /* 切换全屏 */
    async toggleFullScreen() {
      await toggle()
      this.fullScreen = isFullscreen.value
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
      docEle.value.classList.toggle('color-weak')
      this.colorWeak = docEle.value.classList.contains('color-weak')
    },
    /* 切换灰色模式 */
    toggleGrayMode() {
      docEle.value.classList.toggle('gray-mode')
      this.grayMode = docEle.value.classList.contains('gray-mode')
    },
  },
  persist: {
    enabled: true,
  },
})
