<script setup lang="ts">
import { useAuthStore } from '@/store'

const authStore = useAuthStore()
const { userInfo } = authStore

// 性别显示映射
const genderMap = {
  male: '男',
  female: '女',
  unknown: '未知',
}

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
</script>

<template>
  <n-space vertical>
    <!-- 基本信息卡片 -->
    <n-card :title="`${getGreeting()}，${userInfo?.nickName || userInfo?.username || '用户'}，欢迎使用个人中心`">
      <n-flex gap="16px" align="center">
        <n-avatar
          round
          :size="128"
          :src="userInfo?.avatar || `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${userInfo!.username}`"
          class="m-x-6"
        />

        <n-descriptions
          label-placement="left"
          class="flex-1"
          :column="2"
        >
          <n-descriptions-item label="用户名">
            {{ userInfo?.username || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="昵称">
            {{ userInfo?.nickName || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="性别">
            <n-tag size="small">
              {{ genderMap[userInfo?.gender || 'unknown'] }}
            </n-tag>
          </n-descriptions-item>
          <n-descriptions-item label="邮箱">
            {{ userInfo?.email || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="手机号">
            {{ userInfo?.phone || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="部门ID">
            {{ userInfo?.deptId || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="拥有角色" :span="2">
            <n-space>
              <n-tag
                v-for="(role, index) in userInfo?.roles"
                :key="index"
                type="primary"
                size="small"
              >
                {{ role?.roleName || role?.name || `角色${index + 1}` }}
              </n-tag>
              <n-tag v-if="!userInfo?.roles || userInfo?.roles.length === 0" type="default" size="small">
                暂无角色
              </n-tag>
            </n-space>
          </n-descriptions-item>
        </n-descriptions>
      </n-flex>
    </n-card>
  </n-space>
</template>
