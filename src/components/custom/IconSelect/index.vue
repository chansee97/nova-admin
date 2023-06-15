<script setup lang="ts">
import { icons } from './icons'

const currentIcon = ref('')
const searchValue = ref('')
const showPopover = ref(false)

const iconList = computed(() => icons.filter(item => item.includes(searchValue.value)))

function handleSelectIcon(icon: string) {
  currentIcon.value = icon
  showPopover.value = false
}
</script>

<template>
  <n-popover v-model:show="showPopover" placement="bottom" trigger="click">
    <template #trigger>
      <n-input v-model:value="currentIcon" readonly placeholder="选择目标图标">
        <template #suffix>
          <e-icon :icon="currentIcon || 'icon-park-outline:all-application'" />
        </template>
      </n-input>
    </template>
    <template #header>
      <n-input v-model:value="searchValue" type="text" placeholder="搜索图标" />
    </template>
    <div class="w-400px">
      <div v-if="iconList.length > 0" class="grid grid-cols-9 h-auto overflow-auto gap-1">
        <div
          v-for="(item, index) in iconList"
          :key="index"
          class="border border-gray-200 m-2px p-5px flex-center"
          @click="handleSelectIcon(item)"
        >
          <e-icon :icon="item" :size="24" />
        </div>
      </div>
      <n-empty v-else class="w-full" description="没有符合条件的图标" />
    </div>
  </n-popover>
</template>

<style scoped></style>
