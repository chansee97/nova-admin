<script setup lang="ts">
import { useAppStore } from '@/store'
import IconAuto from '~icons/icon-park-outline/laptop-computer'
import IconMoon from '~icons/icon-park-outline/moon'
import IconSun from '~icons/icon-park-outline/sun-one'
import { NFlex } from 'naive-ui'

const { t } = useI18n()

const appStore = useAppStore()

const options = computed(() => {
  return [
    {
      label: t('app.light'),
      value: 'light',
      icon: IconSun,
    },
    {
      label: t('app.dark'),
      value: 'dark',
      icon: IconMoon,
    },
    {
      label: t('app.system'),
      value: 'auto',
      icon: IconAuto,
    },
  ]
})

function renderLabel(option: any) {
  return h(NFlex, { align: 'center' }, {
    default: () => [
      h(option.icon),
      option.label,
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
