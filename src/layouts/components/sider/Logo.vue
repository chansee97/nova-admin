<script setup lang="ts">
import { useAppStore } from '@/store'

const router = useRouter()
const appStore = useAppStore()

const name = import.meta.env.VITE_APP_NAME
</script>

<template>
  <div
    class="h-60px text-2xl flex-center overflow-hidden cursor-pointer"
    @click="router.push('/')"
  >
    <SvgIcon
      name="logo"
      :size="28"
    />
    <span
      v-show="!appStore.collapsed"
      class="mx-3"
    >{{ name }}</span>
  </div>
</template>

<style scoped></style>
