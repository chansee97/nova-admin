<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useMessage } from 'naive-ui'
import { useAuthStore } from '@/store'
import { updateUser } from '@/api/system/user'

const message = useMessage()
const authStore = useAuthStore()
const { userInfo } = authStore

// 加载状态
const loading = ref(false)

// 表单数据
const formData = reactive({
  nickName: '',
  email: '',
  phone: '',
  gender: 'unknown' as 'male' | 'female',
})

// 初始化表单数据
function initFormData() {
  if (userInfo) {
    formData.nickName = userInfo.nickName || ''
    formData.email = userInfo.email || ''
    formData.phone = userInfo.phone || ''
    formData.gender = userInfo.gender
  }
}

// 监听用户信息变化，自动更新表单
watch(() => userInfo, initFormData, { immediate: true })

// 更新个人信息
async function updateUserInfo() {
  if (!userInfo?.id) {
    message.error('用户信息不完整')
    return
  }

  loading.value = true
  try {
    await updateUser(userInfo.id, formData)

    // 刷新个人信息
    await authStore.updataUserInfo()
    message.success('个人信息更新成功')
  }
  catch (error) {
    console.error('更新用户信息失败:', error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <n-form
    :model="formData"
    label-placement="left"
    label-width="80px"
    class="max-w-400px"
  >
    <n-grid :cols="1">
      <n-grid-item>
        <n-form-item label="用户名">
          {{ userInfo.username }}
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="昵称">
          <n-input v-model:value="formData.nickName" placeholder="请输入昵称" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="性别">
          <n-select
            v-model:value="formData.gender"
            :options="[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
            ]"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="邮箱">
          <n-input v-model:value="formData.email" placeholder="请输入邮箱" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="手机号">
          <n-input v-model:value="formData.phone" placeholder="请输入手机号" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="所属部门">
          {{ userInfo?.dept?.deptName || '-' }}
        </n-form-item>
      </n-grid-item>
    </n-grid>

    <n-form-item label="拥有角色">
      <n-space>
        <n-tag
          v-for="(role, index) in userInfo?.roles"
          :key="index"
          type="primary"
          size="medium"
        >
          {{ role?.roleName || role?.name || `角色${index + 1}` }}
        </n-tag>
        <n-tag v-if="!userInfo?.roles || userInfo?.roles.length === 0" type="default" size="medium">
          暂无角色
        </n-tag>
      </n-space>
    </n-form-item>

    <!-- 更新按钮 -->
    <n-form-item label=" ">
      <n-button
        type="primary"
        :loading="loading"
        @click="updateUserInfo"
      >
        更新个人信息
      </n-button>
    </n-form-item>
  </n-form>
</template>
