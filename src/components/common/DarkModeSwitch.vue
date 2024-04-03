<script setup lang="ts">
import { NFlex, NText } from 'naive-ui'
import { useAppStore } from '@/store'
import { renderIcon } from '@/utils'

const appStore = useAppStore()
const options = [
  {
    label: 'Light',
    value: 'light',
    icon: 'icon-park-outline:sun-one',
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: 'icon-park-outline:moon',
  },
  {
    label: 'System',
    value: 'auto',
    icon: 'icon-park-outline:laptop-computer',
  },
]

function renderLabel(option: any) {
  return h(NFlex, { align: 'center' }, {
    default: () => [
      renderIcon(option.icon)(),
      h(NText, { depth: 3 }, { default: () => option.value }),
    ],
  })
}
</script>

<template>
  <n-popselect :value="appStore.storeColorMode" :render-label="renderLabel" :options="options" trigger="click" @update:value="appStore.setColorMode">
    <CommonWrapper>
      <icon-park-outline-moon v-if="appStore.storeColorMode === 'dark'" />
      <icon-park-outline-sun-one v-if="appStore.storeColorMode === 'light'" />
      <icon-park-outline-laptop-computer v-if="appStore.storeColorMode === 'auto'" />
    </CommonWrapper>
  </n-popselect>
</template>

<style scoped></style>
