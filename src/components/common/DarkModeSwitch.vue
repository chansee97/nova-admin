<template>
  <div
    class="cursor-pointer"
    @click="appStore.toggleDarkMode()"
  >
    <i-icon-park-outline-moon v-if="appStore.darkMode" />
    <i-icon-park-outline-sun v-else />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
const appStore = useAppStore();
</script>

<style scoped></style>
