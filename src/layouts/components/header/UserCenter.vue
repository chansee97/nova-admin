<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <div class="hover:bg-hex-F3F4F6 hover:shadow-inner h-full px-4 flex-center cursor-pointer">Admin chen</div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { h } from 'vue';

function renderIcon(icon: string) {
  return () => h(Icon, { icon });
}

const options = [
  {
    label: '个人中心',
    key: 'personal center',
    icon: renderIcon('icon-park-outline:grinning-face'),
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '退出登录',
    key: 'login out',
    icon: renderIcon('icon-park-outline:logout'),
  },
];
const handleSelect = (key: string | number) => {
  console.log('%c [key]-32', 'font-size:13px; background:pink; color:#bf2c9f;', key);
  // message.info(String(key));
};
</script>

<style scoped></style>
