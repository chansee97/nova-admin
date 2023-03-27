<script setup lang="ts">
import { computed, ref } from 'vue'
import HeaderButton from '../common/HeaderButton.vue'
import NoticeList from '../common/NoticeList.vue'

const MassageData = ref<Message.Tab[]>([
  {
    key: 0,
    name: '通知',
    badgeProps: { type: 'warning' },
    list: [
      {
        id: 0,
        title: 'EnchAdmin 已经完成40%了！',
        icon: 'icon-park-outline:tips-one',
        tagTitle: '未开始',
        tagType: 'info',
        description: '项目稳定推进中，很快就能看到正式版了',
        date: '2022-2-2 12:22',
      },
      {
        id: 1,
        title: 'EnchAdmin 已经添加通知功能！',
        icon: 'icon-park-outline:comment-one',
        tagTitle: '未开始',
        tagType: 'success',
        date: '2022-2-2 12:22',
      },
      {
        id: 2,
        title: 'EnchAdmin 已经添加路由功能！',
        icon: 'icon-park-outline:message-emoji',
        tagTitle: '未开始',
        tagType: 'warning',
        description: '项目稳定推进中...',
        date: '2022-2-5 18:32',
      },
      {
        id: 3,
        title:
          'EnchAdmin 已经添加菜单导航功能！EnchAdmin 已经添加菜单导航功能！EnchAdmin 已经添加菜单导航功能！EnchAdmin 已经添加菜单导航功能！',
        icon: 'icon-park-outline:tips-one',
        tagTitle: '未开始',
        tagType: 'error',
        description:
          '项目稳定推进中...项目稳定推进中...项目稳定推进中...项目稳定推进中...项目稳定推进中...项目稳定推进中...项目稳定推进中...',
        date: '2022-2-5 18:32',
      },
      {
        id: 4,
        title: 'EnchAdmin开始启动了！',
        icon: 'icon-park-outline:tips-one',
        tagTitle: '未开始',
        description: '项目稳定推进中...',
        date: '2022-2-5 18:32',
      },
    ],
  },
  {
    key: 1,
    name: '消息',
    badgeProps: { type: 'info' },
    list: [
      {
        id: 0,
        title: '相见恨晚??',
        icon: 'icon-park-outline:comment',
        description: '项目稳定推进中，很快就能看到正式版了',
        date: '2022-2-2 12:22',
      },
      {
        id: 1,
        title: '动态路由已完成！',
        icon: 'icon-park-outline:comment',
        description: '项目稳定推进中，很快就能看到正式版了',
        date: '2022-2-25 12:22',
      },
    ],
  },
  {
    key: 2,
    name: '待办',
    badgeProps: { type: 'error' },
    list: [
      {
        id: 0,
        title: '接下来需要完善一些',
        icon: 'icon-park-outline:beach-umbrella',
        tagTitle: '未开始',
        description: '项目稳定推进中，很快就能看到正式版了',
        date: '2022-2-2 12:22',
      },
    ],
  },
])
const currentTab = ref(0)
function handleRead(index: number) {
  MassageData.value[currentTab.value].list[index].isRead = true
}
const massageCount = computed(() => {
  return MassageData.value.reduce((pre, cur) => {
    return pre + cur.list.filter(item => !item.isRead).length
  }, 0)
})
</script>

<template>
  <n-popover placement="bottom" trigger="click" arrow-point-to-center class="!p-0">
    <template #trigger>
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <HeaderButton>
            <n-badge :value="massageCount" :max="99" style="color: unset">
              <i-icon-park-outline-remind />
            </n-badge>
          </HeaderButton>
        </template>
        <span>消息通知</span>
      </n-tooltip>
    </template>
    <n-tabs v-model:value="currentTab" type="line" animated justify-content="space-evenly" class="w-390px">
      <n-tab-pane v-for="item in MassageData" :key="item.key" :name="item.key">
        <template #tab>
          <n-space class="w-130px" justify="center">
            {{ item.name }}
            <n-badge v-bind="item.badgeProps" :value="item.list.filter((item) => !item.isRead).length" :max="99" />
          </n-space>
        </template>
        <NoticeList :list="item.list" @read="handleRead" />
      </n-tab-pane>
    </n-tabs>
  </n-popover>
</template>

<style scoped></style>
