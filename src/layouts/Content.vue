<script setup lang="ts">
import { useAppStore, useRouteStore } from '@/store'

const appStore = useAppStore()
const routeStore = useRouteStore()
</script>

<template>
  <n-el
    class="h-full"
    :class="[
      appStore.layoutMode === 'full-content' ? 'p-0' : 'p-16px',
    ]"
    style="background-color: var(--action-color);"
  >
    <router-view
      v-slot="{ Component, route }"
    >
      <transition :name="appStore.transitionAnimation" mode="out-in">
        <keep-alive :include="routeStore.cacheRoutes">
          <component :is="Component" v-if="appStore.loadFlag" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </n-el>
</template>
