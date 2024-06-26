import type { RouteLocationNormalized } from 'vue-router'
import { router } from '@/router'

interface TabState {
  pinTabs: RouteLocationNormalized[]
  tabs: RouteLocationNormalized[]
  currentTabPath: string
}
export const useTabStore = defineStore('tab-store', {
  state: (): TabState => {
    return {
      pinTabs: [],
      tabs: [],
      currentTabPath: '',
    }
  },
  getters: {
    allTabs: state => [...state.pinTabs, ...state.tabs],
  },
  actions: {
    addTab(route: RouteLocationNormalized) {
      // 根据meta确定是否不添加，可用于错误页,登录页等
      if (route.meta.withoutTab)
        return

      // 如果标签名称已存在则不添加
      if (this.hasExistTab(route.path as string))
        return

      // 根据meta.pinTab传递到不同的分组中
      if (route.meta.pinTab)
        this.pinTabs.push(route)
      else
        this.tabs.push(route)
    },
    async closeTab(path: string) {
      const tabsLength = this.tabs.length
      // 如果动态标签大于一个,才会标签跳转
      if (this.tabs.length > 1) {
        // 获取关闭的标签索引
        const index = this.getTabIndex(path)
        const isLast = index + 1 === tabsLength
        // 如果是关闭的当前页面，路由跳转到原先标签的后一个标签
        if (this.currentTabPath === path && !isLast) {
          // 跳转到后一个标签
          router.push(this.tabs[index + 1].path)
        }
        else if (this.currentTabPath === path && isLast) {
          // 已经是最后一个了，就跳转前一个
          router.push(this.tabs[index - 1].path)
        }
      }
      // 删除标签
      this.tabs = this.tabs.filter((item) => {
        return item.path !== path
      })
      // 删除后如果清空了，就跳转到默认首页
      if (tabsLength - 1 === 0)
        router.push('/')
    },

    closeOtherTabs(path: string) {
      const index = this.getTabIndex(path)
      this.tabs = this.tabs.filter((item, i) => i === index)
    },
    closeLeftTabs(path: string) {
      const index = this.getTabIndex(path)
      this.tabs = this.tabs.filter((item, i) => i >= index)
    },
    closeRightTabs(path: string) {
      const index = this.getTabIndex(path)
      this.tabs = this.tabs.filter((item, i) => i <= index)
    },
    clearAllTabs() {
      this.tabs.length = 0
      this.pinTabs.length = 0
    },
    closeAllTabs() {
      this.tabs.length = 0
      router.push('/')
    },

    hasExistTab(path: string) {
      const _tabs = [...this.tabs, ...this.pinTabs]
      return _tabs.some((item) => {
        return item.path === path
      })
    },
    /* 设置当前激活的标签 */
    setCurrentTab(path: string) {
      this.currentTabPath = path
    },
    getTabIndex(path: string) {
      return this.tabs.findIndex((item) => {
        return item.path === path
      })
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
