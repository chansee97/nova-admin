<template>
  <n-layout has-sider class="wh-full">
    <n-layout-sider
      bordered
      show-trigger
      :collapsed="collapsed"
      :collapsed-width="64"
      collapse-mode="width"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <Logo :collapsed="collapsed" />
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="24"
        :indent="20"
        :options="menuOptions"
        @update:value="handleClickMenu"
      />
    </n-layout-sider>

    <n-layout class="h-full bg-hex-f3f4f6" :native-scrollbar="false">
      <n-layout-header bordered class="h-60px flex-y-center">
        <div class="hover:bg-hex-F3F4F6 hover:shadow-inner h-full px-2 flex-center cursor-pointer">
          <Icon icon="carbon:list" class="inline-block" width="18" />
        </div>
        <n-breadcrumb>
          <n-breadcrumb-item v-for="(item, index) in routes" :key="index">
            <Icon :icon="item.meta.icon" class="inline-block" width="18" />
            {{ item.meta.title }}
          </n-breadcrumb-item>
          <n-breadcrumb-item v-for="(item, index) in routes" :key="index">
            <Icon :icon="item.meta.icon" class="inline-block" width="18" />
            {{ item.meta.title }}
          </n-breadcrumb-item>
        </n-breadcrumb>
      </n-layout-header>
      <div class="p-16px">
        <n-layout-content>
          <router-view></router-view>
        </n-layout-content>
      </div>
      <n-layout-footer position="absolute" class="text-center op-80 bg-transparent">Ench admin</n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui';
import { h, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import Logo from '../components/logo.vue';
import { computed } from 'vue';

const router = useRouter();
const collapsed = ref(false);

function renderIcon(icon: string) {
  return () => h(Icon, { icon });
}
// const activeKey = ref('');
const handleClickMenu = (key: string, _item: MenuOption) => {
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

const routes = computed(() => {
  return router.currentRoute.value.matched.filter((item) => {
    return item.meta.title;
  });
});
</script>

<style scoped></style>
