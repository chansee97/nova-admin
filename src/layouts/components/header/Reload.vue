<script setup lang="ts">
import { ref } from 'vue'
import HeaderButton from '../common/HeaderButton.vue'
import { useAppStore } from '@/store'
const appStore = useAppStore()

const loading = ref(false)

const handleReload = () => {
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
      <HeaderButton @click="handleReload">
        <i-icon-park-outline-refresh :class="{ 'animate-spin': loading }" />
      </HeaderButton>
    </template>
    <span>刷新页面</span>
  </n-tooltip>
</template>

<style scoped></style>
