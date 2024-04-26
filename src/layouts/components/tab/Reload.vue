<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()

const loading = ref(false)

function handleReload() {
  loading.value = true
  appStore.reloadPage()
  setTimeout(() => {
    loading.value = false
  }, 800)
}
</script>

<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <CommonWrapper @click="handleReload">
        <icon-park-outline-refresh :class="{ 'animate-spin': loading }" />
      </CommonWrapper>
    </template>
    <span>{{ $t('common.reload') }}</span>
  </n-tooltip>
</template>

<style scoped></style>
