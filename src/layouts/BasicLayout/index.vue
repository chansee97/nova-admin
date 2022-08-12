<template>
  <n-layout has-sider class="wh-full">
    <n-layout-sider bordered :collapsed="appStore.collapsed" :collapsed-width="64" collapse-mode="width">
      <Logo />
      <Menu />
    </n-layout-sider>
    <n-layout class="h-full bg-hex-f3f4f6" :native-scrollbar="false">
      <n-layout-header bordered class="h-60px flex-y-center justify-between">
        <div class="flex-y-center h-full">
          <CollapaseButton />
          <Breadcrumb />
        </div>
        <div class="flex-y-center h-full">
          <Reload />
          <Search />
          <Notices />
          <Github />
          <FullScreen />
          <DarkMode />
          <Setting />
          <UserCenter />
        </div>
      </n-layout-header>
      <div class="p-16px">
        <n-layout-content>
          <router-view v-slot="{ Component }">
            <transition name="fade-slide" appear mode="out-in">
              <component :is="Component" v-if="appStore.loadFlag" />
            </transition>
          </router-view>
        </n-layout-content>
      </div>
      <n-layout-footer position="absolute" bordered class="flex-center bg-white h-40px">
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
} from '../components';

const appStore = useAppStore();
</script>

<style scoped></style>
