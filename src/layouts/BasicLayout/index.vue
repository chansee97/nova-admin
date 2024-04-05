<script lang="ts" setup>
import {
  BackTop,
  Breadcrumb,
  CollapaseButton,
  FullScreen,
  Logo,
  Menu,
  Notices,
  Search,
  Setting,
  TabBar,
  UserCenter,
} from '../components'
import { useAppStore, useRouteStore } from '@/store'

const routeStore = useRouteStore()
const appStore = useAppStore()
</script>

<template>
  <n-layout
    has-sider
    class="wh-full"
    embedded
  >
    <n-layout-sider
      bordered
      :collapsed="appStore.collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      content-style="display: flex;flex-direction: column;min-height:100%;"
    >
      <Logo v-if="appStore.showLogo" />
      <n-scrollbar class="flex-1">
        <Menu />
      </n-scrollbar>
    </n-layout-sider>
    <n-layout
      class="h-full flex flex-col"
      content-style="display: flex;flex-direction: column;min-height:100%;"
      embedded
      :native-scrollbar="false"
    >
      <n-layout-header bordered position="absolute" class="z-1">
        <div class="h-60px flex-y-center justify-between">
          <div class="flex-y-center h-full">
            <CollapaseButton />
            <Breadcrumb />
          </div>
          <div class="flex-y-center gap-1 h-full p-x-xl">
            <Search />
            <Notices />
            <FullScreen />
            <DarkModeSwitch />
            <LangsSwitch />
            <Setting />
            <UserCenter />
          </div>
        </div>
        <TabBar v-if="appStore.showTabs" class="h-45px" />
      </n-layout-header>
      <div class="flex-1 p-16px flex flex-col">
        <div class="h-60px" />
        <div v-if="appStore.showTabs" class="h-45px" />
        <router-view v-slot="{ Component, route }" class="flex-1">
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
        <div v-if="appStore.showFooter" class="h-40px" />
      </div>
      <n-layout-footer
        v-if="appStore.showFooter"
        bordered
        position="absolute"
        class="h-40px flex-center"
      >
        {{ appStore.footerText }}
      </n-layout-footer>
      <BackTop />
    </n-layout>
  </n-layout>
</template>
