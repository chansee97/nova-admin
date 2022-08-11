<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <div class="hover:bg-hex-F3F4F6 hover:shadow-inner h-full px-4 flex-center cursor-pointer" @click="openSetting">
        <e-icon icon="icon-park-outline:setting-two" />
        <n-drawer v-model:show="drawerActive" :width="400">
          <n-drawer-content title="系统设置">这是系统设置，但是暂时还没有内容</n-drawer-content>
        </n-drawer>
      </div>
    </template>
    <span>设置</span>
  </n-tooltip>
</template>

<script setup lang="ts">
// import { useApp } from '@/store';
import { ref } from 'vue';
// const appStore = useApp();

const drawerActive = ref(false);
const openSetting = () => {
  drawerActive.value = !drawerActive.value;
};
</script>

<style scoped></style>
