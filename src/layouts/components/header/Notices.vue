<script setup lang="ts">
import { group } from 'radash'
import NoticeList from '../common/NoticeList.vue'

const MassageData = ref<Entity.Message[]>([
  {
    id: 0,
    type: 0,
    title: 'Admin 已经完成40%了！',
    icon: 'icon-park-outline:tips-one',
    tagTitle: '未开始',
    tagType: 'info',
    description: '项目稳定推进中，很快就能看到正式版了',
    date: '2022-2-2 12:22',
  },
  {
    id: 1,
    type: 0,
    title: 'Admin 已经添加通知功能！',
    icon: 'icon-park-outline:comment-one',
    tagTitle: '未开始',
    tagType: 'success',
    date: '2022-2-2 12:22',
  },
  {
    id: 2,
    type: 0,
    title: 'Admin 已经添加路由功能！',
    icon: 'icon-park-outline:message-emoji',
    tagTitle: '未开始',
    tagType: 'warning',
    description: '项目稳定推进中...',
    date: '2022-2-5 18:32',
  },
  {
    id: 3,
    type: 0,
    title:
          'Admin 已经添加菜单导航功能！Admin 已经添加菜单导航功能！Admin 已经添加菜单导航功能！Admin 已经添加菜单导航功能！',
    icon: 'icon-park-outline:tips-one',
    tagTitle: '未开始',
    tagType: 'error',
    description:
          '项目稳定推进中...项目稳定推进中...项目稳定推进中...项目稳定推进中...项目稳定推进中...项目稳定推进中...项目稳定推进中...',
    date: '2022-2-5 18:32',
  },
  {
    id: 4,
    type: 0,
    title: 'Admin开始启动了！',
    icon: 'icon-park-outline:tips-one',
    tagTitle: '未开始',
    description: '项目稳定推进中...',
    date: '2022-2-5 18:32',
  },
  {
    id: 5,
    type: 1,
    title: '相见恨晚??',
    icon: 'icon-park-outline:comment',
    description: '项目稳定推进中，很快就能看到正式版了',
    date: '2022-2-2 12:22',
  },
  {
    id: 6,
    type: 1,
    title: '动态路由已完成！',
    icon: 'icon-park-outline:comment',
    description: '项目稳定推进中，很快就能看到正式版了',
    date: '2022-2-25 12:22',
  },
  {
    id: 7,
    type: 2,
    title: '接下来需要完善一些',
    icon: 'icon-park-outline:beach-umbrella',
    tagTitle: '未开始',
    description: '项目稳定推进中，很快就能看到正式版了',
    date: '2022-2-2 12:22',
  },
])
const currentTab = ref(0)
function handleRead(id: number) {
  const data = MassageData.value.find(i => i.id === id)
  if (data)
    data.isRead = true
  window.$message.success(`id: ${id}`)
}
const massageCount = computed(() => {
  return MassageData.value.filter(i => !i.isRead).length
})
const groupMessage = computed(() => {
  return group(MassageData.value, i => i.type)
})
</script>

<template>
  <n-popover placement="bottom" trigger="click" arrow-point-to-center class="!p-0">
    <template #trigger>
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <CommonWrapper>
            <n-badge :value="massageCount" :max="99" style="color: unset">
              <icon-park-outline-remind />
            </n-badge>
          </CommonWrapper>
        </template>
        <span>{{ $t('app.notificationsTips') }}</span>
      </n-tooltip>
    </template>
    <n-tabs v-model:value="currentTab" type="line" animated justify-content="space-evenly" class="w-390px">
      <n-tab-pane :name="0">
        <template #tab>
          <n-space class="w-130px" justify="center">
            {{ $t('app.notifications') }}
            <n-badge type="info" :value="groupMessage[0]?.filter(i => !i.isRead).length" :max="99" />
          </n-space>
        </template>
        <NoticeList :list="groupMessage[0]" @read="handleRead" />
      </n-tab-pane>
      <n-tab-pane :name="1">
        <template #tab>
          <n-space class="w-130px" justify="center">
            {{ $t('app.messages') }}
            <n-badge type="warning" :value="groupMessage[1]?.filter(i => !i.isRead).length" :max="99" />
          </n-space>
        </template>
        <NoticeList :list="groupMessage[1]" @read="handleRead" />
      </n-tab-pane>
      <n-tab-pane :name="2">
        <template #tab>
          <n-space class="w-130px" justify="center">
            {{ $t('app.todos') }}
            <n-badge type="error" :value="groupMessage[2]?.filter(i => !i.isRead).length" :max="99" />
          </n-space>
        </template>
        <NoticeList :list="groupMessage[2]" @read="handleRead" />
      </n-tab-pane>
    </n-tabs>
  </n-popover>
</template>

<style scoped></style>
