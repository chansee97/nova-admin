<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()

let previousLayoutMode = appStore.layoutMode

function enterFullContent() {
  previousLayoutMode = appStore.layoutMode
  appStore.layoutMode = 'full-content'
}

function exitFullContent() {
  // 如果是全屏或者数据不存在，则恢复为默认的vertical
  if (previousLayoutMode === 'full-content' || !previousLayoutMode) {
    previousLayoutMode = 'vertical'
  }
  appStore.layoutMode = previousLayoutMode
}
</script>

<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <CommonWrapper @click="enterFullContent">
        <icon-park-outline-full-screen-one />
      </CommonWrapper>
    </template>
    {{ $t('app.togglContentFullScreen') }}
  </n-tooltip>

  <Teleport to="body">
    <div
      v-if="appStore.layoutMode === 'full-content'"
      class="fixed top-4 right-0 z-[9999]"
    >
      <n-tooltip placement="left" trigger="hover">
        <template #trigger>
          <n-el
            class="bg-[var(--primary-color)] c-[var(--base-color)] rounded-l-lg shadow-lg p-2 cursor-pointer"
            @click="exitFullContent"
          >
            <icon-park-outline-off-screen-one />
          </n-el>
        </template>
        {{ $t('app.togglContentFullScreen') }}
      </n-tooltip>
    </div>
  </Teleport>
</template>
