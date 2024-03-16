<script setup lang="ts">
import { useAppStore } from '@/store'
import { useAppInfo, useAppRouter } from '@/hooks'

const { name } = useAppInfo()
const { toRoot } = useAppRouter()
const appStore = useAppStore()
</script>

<template>
  <div
    class="h-60px text-2xl flex-center overflow-hidden cursor-pointer"
    @click="toRoot"
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
