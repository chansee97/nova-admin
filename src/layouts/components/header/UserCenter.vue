<script setup lang="ts">
import { renderIcon } from '@/utils/icon'
import { useAuthStore } from '@/store'

const { userInfo, resetAuthStore } = useAuthStore()
const router = useRouter()

const options = [
  {
    label: '个人中心',
    key: 'userCenter',
    icon: renderIcon('carbon:user-avatar-filled-alt'),
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: 'Github',
    key: 'guthub',
    icon: renderIcon('icon-park-outline:github'),
  },
  {
    label: 'gitee',
    key: 'gitee',
    icon: renderIcon('simple-icons:gitee'),
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
]
function handleSelect(key: string | number) {
  if (key === 'loginOut') {
    window.$dialog?.info({
      title: '退出登录',
      content: '确认退出当前账号？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        resetAuthStore()
      },
    })
  }
  if (key === 'userCenter')
    router.push('/userCenter')

  if (key === 'guthub')
    window.open('https://github.com/chansee97/nova-admin')

  if (key === 'gitee')
    window.open('https://gitee.com/chansee97/nova-admin')
}
</script>

<template>
  <n-dropdown
    trigger="click"
    :options="options"
    @select="handleSelect"
  >
    <CommonWrapper>
      <n-avatar
        round
        size="large"
        :src="userInfo?.avatar"
      />
      <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{ userInfo?.nickname }}</span>
    </CommonWrapper>
  </n-dropdown>
</template>

<style scoped></style>
