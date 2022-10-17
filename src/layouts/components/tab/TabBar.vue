<template>
  <div class="wh-full flex items-end">
    <n-tabs type="card" size="small" :tabs-padding="15" :value="tabStore.currentTab" @close="handleClose">
      <n-tab v-for="item in tabStore.inherentTab" :key="item.path" :name="item.name" @click="toRoot">
        {{ item.title }}
      </n-tab>
      <n-tab
        v-for="item in tabStore.tabs"
        :key="item.path"
        closable
        :name="item.name as string"
        @click="handleTab(item)"
        @contextmenu="handleContextMenu($event, item)"
      >
        {{ item.meta.title }}
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

<script setup lang="ts">
import { useTabStore, useAppStore } from '@/store';
import { useAppRouter } from '@/hooks';
import { RouteLocationNormalized } from 'vue-router';
import { ref, nextTick } from 'vue';
import { renderIcon } from '@/utils';

const tabStore = useTabStore();
const appStore = useAppStore();

const { routerPush, toRoot } = useAppRouter();

function handleTab(route: RouteLocationNormalized) {
  routerPush(route.path);
}
function handleClose(name: string) {
  tabStore.closeTab(name);
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
];
const showDropdown = ref(false);
const x = ref(0);
const y = ref(0);
const currentRoute = ref();

function handleSelect(key: string) {
  showDropdown.value = false;
  type HandleFn = {
    [key: string]: any;
  };
  const handleFn: HandleFn = {
    reload() {
      appStore.reloadPage();
    },
    closeCurrent() {
      tabStore.closeTab(currentRoute.value.name);
    },
    closeOther() {
      tabStore.closeOtherTabs(currentRoute.value.name);
    },
    closeLeft() {
      tabStore.closeLeftTabs(currentRoute.value.name);
    },
    closeRight() {
      tabStore.closeRightTabs(currentRoute.value.name);
    },
    closeAll() {
      tabStore.closeAllTabs();
    },
  };
  handleFn[key]();
}
function handleContextMenu(e: MouseEvent, route: RouteLocationNormalized) {
  e.preventDefault();
  currentRoute.value = route;
  showDropdown.value = false;
  nextTick().then(() => {
    showDropdown.value = true;
    x.value = e.clientX;
    y.value = e.clientY;
  });
}
function onClickoutside() {
  showDropdown.value = false;
}
</script>

<style scoped></style>
