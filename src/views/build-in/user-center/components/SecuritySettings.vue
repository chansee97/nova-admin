<script setup lang="ts">
import { ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { updateUserPassword } from '@/api/system/user'

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const loading = ref(false)

// 密码表单
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 安全设置
const loginNotificationEnabled = ref(true)

// 表单验证规则
const passwordRules: FormRules = {
  oldPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value) => {
        return value === passwordForm.value.newPassword
      },
      message: '两次输入的密码不一致',
      trigger: 'blur',
    },
  ],
}

// 更新密码
async function handleUpdatePassword() {
  try {
    await formRef.value?.validate()
    loading.value = true

    await updateUserPassword({
      oldPassword: passwordForm.value.oldPassword,
      newPassword: passwordForm.value.newPassword,
    })

    message.success('密码更新成功')
    resetForm()
  }
  finally {
    loading.value = false
  }
}

// 重置表单
function resetForm() {
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  formRef.value?.restoreValidation()
}
</script>

<template>
  <div class="space-y-4">
    <!-- 密码更新 -->
    <n-card title="密码更新" size="small">
      <n-form
        ref="formRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-placement="left"
        label-width="120px"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="当前密码" path="oldPassword">
          <n-input
            v-model:value="passwordForm.oldPassword"
            type="password"
            placeholder="请输入当前密码"
            show-password-on="click"
          />
        </n-form-item>

        <n-form-item label="新密码" path="newPassword">
          <n-input
            v-model:value="passwordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
            show-password-on="click"
          />
        </n-form-item>

        <n-form-item label="确认新密码" path="confirmPassword">
          <n-input
            v-model:value="passwordForm.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            show-password-on="click"
          />
        </n-form-item>

        <n-form-item label=" ">
          <n-space>
            <n-button
              type="primary"
              :loading="loading"
              @click="handleUpdatePassword"
            >
              更新密码
            </n-button>
            <n-button @click="resetForm">
              重置
            </n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>

    <!-- 账户安全 -->
    <n-card title="账户安全" size="small">
      <n-list>
        <n-list-item>
          <n-thing>
            <template #header>
              登录设备管理
            </template>
            <template #description>
              管理已登录的设备，可以远程注销可疑设备
            </template>
          </n-thing>
          <template #suffix>
            <n-button size="small" secondary>
              查看设备
            </n-button>
          </template>
        </n-list-item>
        <n-list-item>
          <n-thing>
            <template #header>
              登录通知
            </template>
            <template #description>
              新设备登录时发送邮件通知
            </template>
          </n-thing>
          <template #suffix>
            <n-switch v-model:value="loginNotificationEnabled" />
          </template>
        </n-list-item>
      </n-list>
    </n-card>
  </div>
</template>
