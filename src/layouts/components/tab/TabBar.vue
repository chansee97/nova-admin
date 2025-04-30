<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { useAppStore, useTabStore } from '@/store'
import { useTabScroll } from '@/hooks/useTabScroll'
import { useDraggable } from 'vue-draggable-plus'
import IconClose from '~icons/icon-park-outline/close'
import IconDelete from '~icons/icon-park-outline/delete-four'
import IconFullwith from '~icons/icon-park-outline/fullwidth'
import IconRedo from '~icons/icon-park-outline/redo'
import IconLeft from '~icons/icon-park-outline/to-left'
import IconRight from '~icons/icon-park-outline/to-right'
import ContentFullScreen from './ContentFullScreen.vue'
import DropTabs from './DropTabs.vue'
import Reload from './Reload.vue'
import TabBarItem from './TabBarItem.vue'

const tabStore = useTabStore()
const { tabs } = storeToRefs(useTabStore())
const appStore = useAppStore()

const { scrollbar, onWheel } = useTabScroll(computed(() => tabStore.currentTabPath))

const router = useRouter()
function handleTab(route: RouteLocationNormalized) {
  router.push(route.fullPath)
}
const { t } = useI18n()
const options = computed(() => {
  return [
    {
      label: t('common.reload'),
      key: 'reload',
      icon: () => h(IconRedo),
    },
    {
      label: t('common.close'),
      key: 'closeCurrent',
      icon: () => h(IconClose),
    },
    {
      label: t('app.closeOther'),
      key: 'closeOther',
      icon: () => h(IconDelete),
    },
    {
      label: t('app.closeLeft'),
      key: 'closeLeft',
      icon: () => h(IconLeft),
    },
    {
      label: t('app.closeRight'),
      key: 'closeRight',
      icon: () => h(IconRight),
    },
    {
      label: t('app.closeAll'),
      key: 'closeAll',
      icon: () => h(IconFullwith),
    },
  ]
})
const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)
const currentRoute = ref()

function handleSelect(key: string) {
  showDropdown.value = false
  interface HandleFn {
    [key: string]: any
  }
  const handleFn: HandleFn = {
    reload() {
      appStore.reloadPage()
    },
    closeCurrent() {
      tabStore.closeTab(currentRoute.value.fullPath)
    },
    closeOther() {
      tabStore.closeOtherTabs(currentRoute.value.fullPath)
    },
    closeLeft() {
      tabStore.closeLeftTabs(currentRoute.value.fullPath)
    },
    closeRight() {
      tabStore.closeRightTabs(currentRoute.value.fullPath)
    },
    closeAll() {
      tabStore.closeAllTabs()
    },
  }
  handleFn[key]()
}
function handleContextMenu(e: MouseEvent, route: RouteLocationNormalized) {
  e.preventDefault()
  currentRoute.value = route
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}
function onClickoutside() {
  showDropdown.value = false
}

const el = ref()

useDraggable(el, tabs, {
  animation: 150,
  ghostClass: 'ghost',
})
</script>

<template>
  <n-scrollbar ref="scrollbar" class="relative flex h-full tab-bar-scroller-wrapper" content-class="pr-34 tab-bar-scroller-content" :x-scrollable="true" @wheel="onWheel">
    <div class="p-l-2 flex wh-full relative">
      <div class="flex items-end">
        <TabBarItem
          v-for="item in tabStore.pinTabs" :key="item.fullPath" :value="tabStore.currentTabPath" :route="item"
          @click="handleTab(item)"
        />
      </div>
      <div ref="el" class="flex items-end flex-1">
        <TabBarItem
          v-for="item in tabStore.tabs"
          :key="item.fullPath"
          :value="tabStore.currentTabPath"
          :route="item"
          closable
          :data-tab-path="item.fullPath"
          @close="tabStore.closeTab"
          @click="handleTab(item)"
          @contextmenu="handleContextMenu($event, item)"
        />
        <n-dropdown
          placement="bottom-start" trigger="manual" :x="x" :y="y" :options="options" :show="showDropdown"
          :on-clickoutside="onClickoutside" @select="handleSelect"
        />
      </div>
    </div>
    <n-el class="absolute right-0 top-0 flex items-center gap-1 bg-[var(--card-color)] h-full">
      <Reload />
      <ContentFullScreen />
      <DropTabs />
    </n-el>
  </n-scrollbar>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c4f6d5;
}
</style>
