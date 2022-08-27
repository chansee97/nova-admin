<template>
  <HeaderButton @click="appStore.toggleCollapse()">
    <i-icon-park-outline-menu-unfold v-if="appStore.collapsed" />
    <i-icon-park-outline-menu-fold v-else />
  </HeaderButton>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import HeaderButton from '../common/HeaderButton.vue';

const appStore = useAppStore();
</script>

<style scoped></style>
