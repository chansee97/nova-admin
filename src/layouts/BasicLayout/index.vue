<script lang="ts" setup>
import {
  BackTop,
  Breadcrumb,
  CollapaseButton,
  DarkMode,
  FullScreen,
  Logo,
  Menu,
  Notices,
  Reload,
  Search,
  Setting,
  TabBar,
  UserCenter,
  Watermark,
} from '../components'
import { useAppStore, useRouteStore } from '@/store'

const routeStore = useRouteStore()
const appStore = useAppStore()

// 初始载入，初始化body的css变量
appStore.setPrimaryColor()
</script>

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
      :width="240"
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
      >
        <div class="h-60px flex-y-center justify-between">
          <div class="flex-y-center h-full">
            <CollapaseButton />
            <Breadcrumb />
          </div>
          <div class="flex-y-center h-full">
            <Search />
            <Reload />
            <Notices />
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
            'p-t-122px': appStore.fixedHeader && appStore.showTabs,
            'p-t-77px': appStore.fixedHeader && !appStore.showTabs,
          }"
        >
          <router-view v-slot="{ Component, route }">
            <transition
              :name="appStore.transitionAnimation"
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
      <Watermark :show-watermark="appStore.showWatermark" />
    </n-layout>
  </n-layout>
</template>
