<template>
  <n-layout has-sider class="wh-full">
    <n-layout-sider bordered :collapsed="appStore.collapsed" :collapsed-width="64" collapse-mode="width" :width="220">
      <Logo />
      <Menu />
    </n-layout-sider>
    <n-layout class="h-full" :native-scrollbar="false" embedded>
      <n-layout-header bordered class="h-60px flex-y-center justify-between">
        <div class="flex-y-center h-full">
          <CollapaseButton />
          <Breadcrumb />
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
      </n-layout-header>
      <n-layout-header class="h-45px"><TabBar /></n-layout-header>
      <div class="p-16px p-b-52px">
        <n-layout-content class="bg-transparent">
          <router-view v-slot="{ Component }">
            <transition name="fade-slide" appear mode="out-in">
              <component :is="Component" v-if="appStore.loadFlag" />
            </transition>
          </router-view>
        </n-layout-content>
        <BackTop />
      </div>
      <n-layout-footer position="absolute" bordered class="flex-center h-40px">
        {{ appStore.footerText }}
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
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
