<script setup lang="ts">
import type { LayoutMode } from '@/store/app'

const value = defineModel<LayoutMode>('value', { required: true })
</script>

<template>
  <div class="flex-center gap-4">
    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-el
          :class="{
            'outline outline-2': value === 'leftMenu',
          }"
          class="grid grid-cols-[20%_1fr] outline-[var(--primary-color)] hover:(outline outline-2) cursor-pointer"
          @click="value = 'leftMenu'"
        >
          <div class="bg-[var(--primary-color)]" />
          <div class="bg-[var(--divider-color)]" />
        </n-el>
      </template>
      <span> {{ $t('app.leftMenu') }} </span>
    </n-tooltip>

    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-el
          :class="{
            'outline outline-2': value === 'topMenu',
          }"
          class="grid grid-rows-[30%_1fr] outline-[var(--primary-color)] hover:(outline outline-2) cursor-pointer"
          @click="value = 'topMenu'"
        >
          <div class="bg-[var(--primary-color)]" />
          <div class="bg-[var(--divider-color)]" />
        </n-el>
      </template>
      <span> {{ $t('app.topMenu') }} </span>
    </n-tooltip>

    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-el
          :class="{
            'outline outline-2': value === 'mixMenu',
          }"
          class="grid grid-cols-[20%_1fr] grid-rows-[20%_1fr] outline-[var(--primary-color)] hover:(outline outline-2) cursor-pointer"
          @click="value = 'mixMenu'"
        >
          <div class="bg-[var(--primary-color)] row-span-2" />
          <div class="bg-[var(--primary-color)]" />
          <div class="bg-[var(--divider-color)]" />
        </n-el>
      </template>
      <span> {{ $t('app.mixMenu') }} </span>
    </n-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.grid{
  height: 60px;
  width: 86px;
  gap:0.4em;
  padding: 0.4em;
  box-shadow: var(--box-shadow-1);
  border-radius: var(--border-radius);
}
.grid > div{
  border-radius: var(--border-radius);
}
</style>
