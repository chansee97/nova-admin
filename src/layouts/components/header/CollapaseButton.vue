<template>
  <div
    class="hover:bg-hex-F3F4F6 hover:shadow-inner h-full px-4 flex-center cursor-pointer"
    @click="appStore.toggleCollapse()"
  >
    <e-icon v-show="appStore.collapsed" icon="icon-park-outline:menu-unfold" />
    <e-icon v-show="!appStore.collapsed" icon="icon-park-outline:menu-fold" />
  </div>
</template>

<script setup lang="ts">
import { useApp } from '@/store';
const appStore = useApp();
</script>

<style scoped></style>
