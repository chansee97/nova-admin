<template>
  <n-dropdown trigger="click" :options="options" @select="handleSelect">
    <HeaderButton>
      <n-avatar round size="large" :src="authStore.userInfo?.avatar" />
      {{ authStore.userInfo?.realName }}
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
    key: '/presonalCenter',
    icon: renderIcon('icon-park-outline:grinning-face'),
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '退出登录',
    key: 'loginOut',
    icon: renderIcon('icon-park-outline:logout'),
  },
];
const handleSelect = (key: string | number) => {
  if (key === 'loginOut') {
    authStore.resetAuthStore();
  }
};
</script>

<style scoped></style>
