<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="openSetting">
        <div>
          <e-icon icon="icon-park-outline:setting-two" />
          <n-drawer v-model:show="drawerActive" :width="300">
            <n-drawer-content title="系统设置">这是系统设置，但是暂时还没有内容</n-drawer-content>
          </n-drawer>
        </div>
      </HeaderButton>
    </template>
    <span>设置</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue';
// import { useAppStore } from '@/store';
import { ref } from 'vue';
// const appStore = useAppStore();

const drawerActive = ref(false);
const openSetting = () => {
  drawerActive.value = !drawerActive.value;
};
</script>

<style scoped></style>