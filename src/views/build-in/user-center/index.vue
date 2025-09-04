<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store'
import PersonalInfo from './components/PersonalInfo.vue'
import SecuritySettings from './components/SecuritySettings.vue'
import NotificationSettings from './components/NotificationSettings.vue'
import PreferenceSettings from './components/PreferenceSettings.vue'
import IconUser from '~icons/icon-park-outline/user'
import IconLock from '~icons/icon-park-outline/lock'
import IconRemind from '~icons/icon-park-outline/remind'
import IconSetting from '~icons/icon-park-outline/setting-one'

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)

// 当前选中的菜单项
const activeMenu = ref('profile')

// 页面配置 - 统一管理菜单项、标题和组件
const pageConfig = [
  {
    key: 'profile',
    label: '个人信息',
    title: '个人信息',
    icon: IconUser,
    component: PersonalInfo,
  },
  {
    key: 'security',
    label: '安全设置',
    title: '安全设置',
    icon: IconLock,
    component: SecuritySettings,
  },
  {
    key: 'notification',
    label: '通知设置',
    title: '通知设置',
    icon: IconRemind,
    component: NotificationSettings,
  },
  {
    key: 'preference',
    label: '偏好设置',
    title: '偏好设置',
    icon: IconSetting,
    component: PreferenceSettings,
  },
]

// 菜单选项 - 从配置中提取
const menuOptions = pageConfig.map(({ key, label, icon }) => ({
  key,
  label,
  icon: () => h(icon),
}))

// 当前页面配置 - 根据激活的菜单项获取
const currentPageConfig = computed(() => {
  return pageConfig.find(config => config.key === activeMenu.value)
})

// 获取问候语
function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 6)
    return '夜深了'
  if (hour < 9)
    return '早上好'
  if (hour < 12)
    return '上午好'
  if (hour < 14)
    return '中午好'
  if (hour < 18)
    return '下午好'
  if (hour < 22)
    return '晚上好'
  return '夜深了'
}

// 组件挂载时更新用户信息
onMounted(async () => {
  await authStore.updataUserInfo()
})
</script>

<template>
  <n-card class="max-w-1024px m-auto">
    <n-flex :wrap="false" style="height: 100%;">
      <!-- 左侧区域 -->
      <div class="w-[220px] border-r border-[var(--n-border-color)] flex flex-col">
        <!-- 左上：头像和招呼 -->
        <n-flex
          align="center" justify="center" vertical
          class="p-3 border-b border-[var(--n-border-color)]"
          :size="8"
        >
          <n-avatar
            round
            :size="80"
            :src="userInfo?.avatar || `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${userInfo!.username}`"
          />
          <n-h3 class="m-0">
            {{ getGreeting() }}，{{ userInfo?.nickName || userInfo.username }}
          </n-h3>
          <n-text>
            欢迎使用个人中心
          </n-text>
        </n-flex>

        <!-- 左下：菜单 -->
        <n-menu
          v-model:value="activeMenu"
          class="flex-1"
          :options="menuOptions"
          :icon-size="16"
        />
      </div>

      <!-- 右侧功能区域 -->
      <div class="flex-1 p-2">
        <n-h4 class="flex items-center gap-2">
          <component :is="currentPageConfig!.icon" /> {{ currentPageConfig!.title }}
        </n-h4>
        <n-divider />
        <component :is="currentPageConfig!.component" />
      </div>
    </n-flex>
  </n-card>
</template>
