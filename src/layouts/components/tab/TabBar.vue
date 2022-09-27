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
      >
        {{ item.meta.title }}
      </n-tab>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { useTabStore } from '@/store';
import { useAppRouter } from '~/src/hook';
import { RouteLocationNormalized } from 'vue-router';

const tabStore = useTabStore();
const { routerPush, toRoot } = useAppRouter();

const handleTab = (route: RouteLocationNormalized) => {
  routerPush(route.path);
};
const handleClose = (name: string) => {
  tabStore.closeTab(name);
};
</script>

<style scoped></style>
