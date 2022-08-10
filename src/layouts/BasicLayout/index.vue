<template>
  <n-layout has-sider wh-full>
    <n-layout-sider
      bordered
      :collapsed="collapsed"
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
    </n-layout-sider>
    <n-layout h-full bg-hex-f3-f4-f6 :native-scrollbar="false">
      <n-layout-header bordered text-2xl h-60px flex-y-center>layout-page</n-layout-header>
      <div p-16px>
        <n-layout-content>
          <router-view></router-view>
        </n-layout-content>
      </div>
      <n-layout-footer position="absolute" text-center op-80 bg-transparent>Ench admin</n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui';
import { h, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';

const collapsed = ref(false);
function renderIcon(icon: string) {
  return () => h(Icon, { icon });
}
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/test1',
          },
        },
        { default: () => 'test1' },
      ),
    key: 'test1',
    icon: renderIcon('icon-park:ad-product'),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/test2',
          },
        },
        { default: () => 'test2' },
      ),
    key: 'test2',
    icon: renderIcon('icon-park:ad-product'),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/test3',
          },
        },
        { default: () => 'test3' },
      ),
    key: 'test3',
    icon: renderIcon('icon-park:ad-product'),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/login',
          },
        },
        { default: () => '登录页' },
      ),
    key: '登录页',
    icon: renderIcon('icon-park:ad-product'),
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon('icon-park:arithmetic'),
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

<style lang="scss" scoped></style>
