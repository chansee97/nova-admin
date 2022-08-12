<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <HeaderButton>
      <n-avatar round size="large" src="https://z3.ax1x.com/2021/10/29/5jnWgf.jpg" />
      {{ authStore.name }}
    </HeaderButton>
  </n-dropdown>
</template>

<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue';
import { renderIcon } from '@/utils/icon';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();

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
