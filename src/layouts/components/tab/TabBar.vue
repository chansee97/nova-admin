<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { useAppStore, useTabStore } from '@/store'
import IconClose from '~icons/icon-park-outline/close'
import IconDelete from '~icons/icon-park-outline/delete-four'
import IconFullwith from '~icons/icon-park-outline/fullwidth'
import IconRedo from '~icons/icon-park-outline/redo'
import IconLeft from '~icons/icon-park-outline/to-left'
import IconRight from '~icons/icon-park-outline/to-right'
import ContentFullScreen from './ContentFullScreen.vue'
import DropTabs from './DropTabs.vue'
import Reload from './Reload.vue'

const tabStore = useTabStore()
const appStore = useAppStore()

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
</script>

<template>
  <div class="wh-full flex items-end">
    <n-tabs
      type="card"
      size="small"
      :tabs-padding="10"
      :value="tabStore.currentTabPath"
      @close="tabStore.closeTab"
    >
      <n-tab
        v-for="item in tabStore.pinTabs"
        :key="item.fullPath"
        :name="item.fullPath"
        @click="router.push(item.fullPath)"
      >
        <div class="flex-x-center gap-2">
          <nova-icon :icon="item.meta.icon" /> {{ $t(`route.${String(item.name)}`, item.meta.title) }}
        </div>
      </n-tab>
      <n-tab
        v-for="item in tabStore.tabs"
        :key="item.fullPath"
        closable
        :name="item.fullPath"
        @click="handleTab(item)"
        @contextmenu="handleContextMenu($event, item)"
      >
        <div class="flex-x-center gap-2">
          <nova-icon :icon="item.meta.icon" /> {{ $t(`route.${String(item.name)}`, item.meta.title) }}
        </div>
      </n-tab>
      <template #suffix>
        <Reload />
        <ContentFullScreen />
        <DropTabs />
      </template>
    </n-tabs>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="x"
      :y="y"
      :options="options"
      :show="showDropdown"
      :on-clickoutside="onClickoutside"
      @select="handleSelect"
    />
  </div>
</template>
