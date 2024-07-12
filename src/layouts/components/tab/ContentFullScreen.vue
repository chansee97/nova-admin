<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <CommonWrapper @click="appStore.contentFullScreen = !appStore.contentFullScreen">
        <icon-park-outline-off-screen-one v-if="appStore.contentFullScreen" />
        <icon-park-outline-full-screen-one v-else />
      </CommonWrapper>
    </template>
    <span>{{ $t('app.togglContentFullScreen') }}</span>
  </n-tooltip>
</template>
