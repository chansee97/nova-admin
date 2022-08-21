import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';
import { useAppRouter } from '@/hook';

interface TabState {
  inherentTab: {
    name: string;
    title: string;
    path: string;
  }[];
  tabs: RouteLocationNormalized[];
  tabWhiteList: string[];
  currentTab: string;
}
export const useTabStore = defineStore('tab-store', {
  state: (): TabState => {
    return {
      inherentTab: [
        {
          name: 'dashboard_workbench',
          title: '工作台',
          path: '/',
        },
      ],
      tabs: [],
      tabWhiteList: ['not-found', 'no-permission', 'service-error', 'login'],
      currentTab: 'dashboard_workbench',
    };
  },
  getters: {
    inherentTabName(): string[] {
      return this.inherentTab.map((item) => {
        return item.name;
      });
    },
  },
  actions: {
    addTab(route: RouteLocationNormalized) {
      // 如果已经在固有标签里则不添加
      if (this.inherentTabName.includes(route.name as string)) {
        return;
      }
      // 如果标签名称已存在则不添加
      if (this.hasExistTab(route.name as string)) {
        return;
      }
      // 如果在白名单内则不添加,错误页等
      if (this.tabWhiteList.includes(route.name as string)) {
        return;
      }
      this.tabs.push(route);
    },
    closeTab(name: string) {
      const { routerPush, toRoot } = useAppRouter(false);
      const tabsLength = this.tabs.length;
      // 如果动态标签大于一个,才会标签跳转
      if (this.tabs.length > 1) {
        // 获取关闭的标签索引
        const index = this.getTabIndex(name);
        const isLast = index + 1 === tabsLength;
        // 如果是关闭的当前页面，路由跳转到原先标签的后一个标签
        if (this.currentTab === name && !isLast) {
          // 跳转到后一个标签
          routerPush(this.tabs[index + 1].path);
        } else if (this.currentTab === name && isLast) {
          // 已经是最后一个了，就跳转前一个
          routerPush(this.tabs[index - 1].path);
        }
      }
      // 删除标签
      this.tabs = this.tabs.filter((item) => {
        return item.name !== name;
      });
      // 删除后如果清空了，就跳转到默认首页
      if (tabsLength - 1 === 0) {
        toRoot();
      }
    },
    hasExistTab(name: string) {
      return this.tabs.some((item) => {
        return item.name === name;
      });
    },
    /* 设置当前激活的标签 */
    setCurrentTab(name: string) {
      this.currentTab = name;
    },
    getTabIndex(name: string) {
      return this.tabs.findIndex((item) => {
        return item.name === name;
      });
    },
  },
  persist: {
    enabled: true,
  },
});
