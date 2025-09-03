<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store'
import PersonalInfo from './components/PersonalInfo.vue'

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)

// 当前选中的标签页
const activeTab = ref('profile')

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
  <n-space vertical>
    <!-- 欢迎标题 -->
    <n-card>
      <n-flex align="center" justify="space-between">
        <div>
          <n-h2>
            {{ getGreeting() }}，{{ userInfo?.nickName || userInfo.username }}
          </n-h2>
          <n-p class="text-sm opacity-90 m-0">
            欢迎使用个人中心
          </n-p>
        </div>
        <n-avatar
          round
          :size="64"
          :src="userInfo?.avatar || `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${userInfo!.username}`"
        />
      </n-flex>
    </n-card>

    <!-- 主要内容区域 -->
    <n-card>
      <n-tabs
        v-model:value="activeTab"
        type="line"
        placement="left"
        tab-style="min-height: 30px;"
        pane-style="padding-left: 1rem;"
      >
        <n-tab-pane name="profile">
          <template #tab>
            <icon-park-outline-user class="mr-2" />
            个人信息
          </template>
          <n-h5>
            个人信息
          </n-h5>
          <n-divider />
          <PersonalInfo />
        </n-tab-pane>

        <n-tab-pane name="security">
          <template #tab>
            <icon-park-outline-lock class="mr-2" />
            安全设置
          </template>
          <n-h5>
            安全设置
          </n-h5>
          <n-divider />
          <n-empty description="功能开发中..." />
        </n-tab-pane>

        <n-tab-pane name="notification">
          <template #tab>
            <icon-park-outline-remind class="mr-2" />
            通知设置
          </template>
          <n-h5>
            通知设置
          </n-h5>
          <n-divider />
          <n-empty description="功能开发中..." />
        </n-tab-pane>

        <n-tab-pane name="preference">
          <template #tab>
            <icon-park-outline-setting-one class="mr-2" />
            偏好设置
          </template>
          <n-h5>
            偏好设置
          </n-h5>
          <n-divider />
          <n-empty description="功能开发中..." />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
</template>
