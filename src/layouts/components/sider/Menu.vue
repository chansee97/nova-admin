<template>
  <n-menu
    :collapsed="appStore.collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="24"
    :indent="20"
    :options="menuOptions"
    @update:value="handleClickMenu"
  />
</template>

<script setup lang="ts">
import { useApp } from '@/store';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { h } from 'vue';
import type { MenuOption } from 'naive-ui';

const appStore = useApp();
const router = useRouter();

function renderIcon(icon: string) {
  return () => h(Icon, { icon });
}

const handleClickMenu = (key: string) => {
  router.push(key);
};
const menuOptions: MenuOption[] = [
  {
    label: 'test1',
    key: '/test1',
    icon: renderIcon('icon-park-outline:alarm'),
  },
  {
    label: 'test2',
    key: '/test2',
    icon: renderIcon('icon-park-outline:tool'),
  },
  {
    label: 'test3',
    key: '/test3',
    icon: renderIcon('icon-park-outline:pic'),
  },
  {
    label: '登录页',
    key: '/login',
    icon: renderIcon('icon-park-outline:save'),
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon('icon-park-outline:command'),
    children: [
      {
        label: '饮品',
        key: 'beverage',
        // icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
];
</script>

<style scoped></style>
