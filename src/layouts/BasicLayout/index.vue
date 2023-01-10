<template>
  <n-layout
    has-sider
    class="wh-full"
  >
    <n-layout-sider
      bordered
      :collapsed="appStore.collapsed"
      :collapsed-width="64"
      collapse-mode="width"
      :width="220"
      :inverted="appStore.invertedSider"
    >
      <Logo v-if="appStore.showLogo" />
      <Menu />
    </n-layout-sider>
    <n-layout
      class="h-full"
      embedded
    >
      <n-layout-header
        :position="appStore.fixedHeader ? 'absolute' : 'static'"
        :inverted="appStore.invertedHeader"
        class="z-1"
        bordered
      >
        <div class="h-60px flex-y-center justify-between">
          <div class="flex-y-center h-full">
            <CollapaseButton />
            <Breadcrumb v-if="appStore.showBreadcrumb" />
          </div>
          <div class="flex-y-center h-full">
            <Reload />
            <!-- <Search /> -->
            <Notices />
            <Github />
            <FullScreen />
            <DarkMode />
            <Setting />
            <UserCenter />
          </div>
        </div>
      </n-layout-header>
      <n-layout-header
        v-if="appStore.showTabs"
        :position="appStore.fixedHeader ? 'absolute' : 'static'"
        class="z-1"
        :class="{ 'm-t-61px': appStore.fixedHeader }"
      >
        <TabBar class="h-45px" />
      </n-layout-header>
      <n-layout-content
        class="bg-transparent"
        style="min-height: calc(100% - 105px); height: calc(100% - 105px)"
        content-style="padding: 16px;min-height:100%;"
      >
        <div
          class="h-full"
          :class="{
            'p-b-40px': appStore.fixedFooter,
            'p-t-122px': appStore.fixedHeader && appStore.showTabs,
            'p-t-77px': appStore.fixedHeader && !appStore.showTabs,
          }"
        >
          <router-view v-slot="{ Component, route }">
            <transition
              name="fade-slide"
              mode="out-in"
            >
              <keep-alive :include="routeStore.cacheRoutes">
                <component
                  :is="Component"
                  v-if="appStore.loadFlag"
                  :key="route.fullPath"
                />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </n-layout-content>
      <BackTop />
      <n-layout-footer
        :position="appStore.fixedFooter ? 'absolute' : 'static'"
        bordered
        class="flex-center h-40px"
        style="margin-top: auto"
      >
        {{ appStore.footerText }}
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import {
	Breadcrumb,
	CollapaseButton,
	Menu,
	Logo,
	FullScreen,
	DarkMode,
	Setting,
	Github,
	Notices,
	UserCenter,
	Search,
	Reload,
	TabBar,
	BackTop,
} from '../components';
import { useAppStore, useRouteStore } from '@/store';

const routeStore = useRouteStore();
const appStore = useAppStore();
</script>

<style scoped>
.n-layout-sider {
	box-shadow: 2px 0 8px #1d23290d;
}
.n-layout-header {
	box-shadow: 0 1px 2px #00152914;
}
</style>
