<template>
  <HeaderButton @click="appStore.toggleCollapse()">
    <e-icon v-if="appStore.collapsed" icon="icon-park-outline:menu-unfold" />
    <e-icon v-else icon="icon-park-outline:menu-fold" />
  </HeaderButton>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import HeaderButton from '../common/HeaderButton.vue';

const appStore = useAppStore();
</script>

<style scoped></style>
