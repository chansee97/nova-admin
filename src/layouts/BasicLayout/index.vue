<template>
  <n-layout has-sider wh-full>
    <n-layout-sider
      bordered
      show-trigger
      :collapsed="collapsed"
      :collapsed-width="64"
      collapse-mode="width"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div h-60px text-4xl flex-center>Logo</div>
      <n-menu
        :value="activeKey"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="24"
        :indent="20"
        :options="menuOptions"
        @update:value="handleClickMenu"
      />
    </n-layout-sider>

    <n-layout h-full bg-hex-f3f4f6 :native-scrollbar="false">
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
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const router = useRouter();
const collapsed = ref(false);

function renderIcon(icon: string) {
  return () => h(Icon, { icon });
}
const activeKey = ref('');
const handleClickMenu = (key: string, item: MenuOption) => {
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
    icon: renderIcon('icon-park-outline:alarm'),
  },
  {
    label: 'test3',
    key: '/test3',
    icon: renderIcon('icon-park-outline:alarm'),
  },
  {
    label: '登录页',
    key: '/login',
    icon: renderIcon('icon-park-outline:alarm'),
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon('icon-park-outline:alarm'),
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
