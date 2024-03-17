<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { useAppStore, useTabStore } from '@/store'
import { renderIcon } from '@/utils'

const tabStore = useTabStore()
const appStore = useAppStore()

const router = useRouter()
function handleTab(route: RouteLocationNormalized) {
  router.push(route.path)
}
function handleClose(path: string) {
  tabStore.closeTab(path)
}
const options = [
  {
    label: '刷新',
    key: 'reload',
    icon: renderIcon('icon-park-outline:redo'),
  },
  {
    label: '关闭',
    key: 'closeCurrent',
    icon: renderIcon('icon-park-outline:close'),
  },
  {
    label: '关闭其他',
    key: 'closeOther',
    icon: renderIcon('icon-park-outline:delete-four'),
  },
  {
    label: '关闭左侧',
    key: 'closeLeft',
    icon: renderIcon('icon-park-outline:to-left'),
  },
  {
    label: '关闭右侧',
    key: 'closeRight',
    icon: renderIcon('icon-park-outline:to-right'),
  },
  {
    label: '全部关闭',
    key: 'closeAll',
    icon: renderIcon('icon-park-outline:fullwidth'),
  },
]
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
      tabStore.closeTab(currentRoute.value.path)
    },
    closeOther() {
      tabStore.closeOtherTabs(currentRoute.value.path)
    },
    closeLeft() {
      tabStore.closeLeftTabs(currentRoute.value.path)
    },
    closeRight() {
      tabStore.closeRightTabs(currentRoute.value.path)
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
      :tabs-padding="15"
      :value="tabStore.currentTabPath"
      @close="handleClose"
    >
      <n-tab
        v-for="item in tabStore.pinTabs"
        :key="item.path"
        :name="item.path"
        @click="router.push(item.path)"
      >
        {{ item.meta.title }}
      </n-tab>
      <n-tab
        v-for="item in tabStore.tabs"
        :key="item.path"
        closable
        :name="item.path as string"
        @click="handleTab(item)"
        @contextmenu="handleContextMenu($event, item)"
      >
        <div class="flex-x-center gap-2">
          <e-icon :icon="item.meta.icon" /> {{ item.meta.title }}
        </div>
      </n-tab>
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

<style scoped></style>
