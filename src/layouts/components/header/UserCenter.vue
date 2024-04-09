<script setup lang="ts">
import { renderIcon } from '@/utils/icon'
import { useAuthStore } from '@/store'

const { t } = useI18n()

const { userInfo, resetAuthStore } = useAuthStore()
const router = useRouter()

const options = computed(() => {
  return [
    {
      label: t('app.userCenter'),
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
      label: 'Gitee',
      key: 'gitee',
      icon: renderIcon('simple-icons:gitee'),
    },
    {
      type: 'divider',
      key: 'd1',
    },
    {
      label: t('app.loginOut'),
      key: 'loginOut',
      icon: renderIcon('icon-park-outline:logout'),
    },
  ]
})
function handleSelect(key: string | number) {
  if (key === 'loginOut') {
    window.$dialog?.info({
      title: t('app.loginOutTitle'),
      content: t('app.loginOutContent'),
      positiveText: t('common.confirm'),
      negativeText: t('common.cancel'),
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
    <n-avatar
      round

      :src="userInfo?.avatar"
    >
      <template #fallback>
        <div class="wh-full flex-center">
          <icon-park-outline-user />
        </div>
      </template>
    </n-avatar>
  </n-dropdown>
</template>

<style scoped></style>
