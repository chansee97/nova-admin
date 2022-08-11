<template>
  <n-layout has-sider class="wh-full">
    <n-layout-sider bordered :collapsed="appStore.collapsed" :collapsed-width="64" collapse-mode="width">
      <Logo />
      <Menu />
    </n-layout-sider>
    <n-layout class="h-full bg-hex-f3f4f6" :native-scrollbar="false">
      <n-layout-header bordered class="h-60px flex-y-center">
        <CollapaseButton />
        <Breadcrumb />
      </n-layout-header>
      <div class="p-16px">
        <n-layout-content>
          <router-view></router-view>
        </n-layout-content>
      </div>
      <n-layout-footer position="absolute" class="text-center op-80 bg-transparent">Ench admin</n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { useApp } from '@/store';
import { Breadcrumb, CollapaseButton, Menu, Logo } from '../components';

const appStore = useApp();
</script>

<style scoped></style>
