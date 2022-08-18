<template>
  <div class="wh-full px-3 flex items-end">
    <n-tabs type="card" size="small">
      <n-tab name="幸福">工作台</n-tab>
      <n-tab v-for="item in tabStore.tabs" :key="item.path" closable :name="item.meta.title" @click="handleTab(item)">
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
const { routerPush } = useAppRouter();

const handleTab = (route: RouteLocationNormalized) => {
  routerPush(route.path);
};
</script>

<style scoped></style>
