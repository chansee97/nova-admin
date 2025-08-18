<script setup lang="ts">
import { useAuthStore } from '@/store'

const authStore = useAuthStore()

const { userInfo } = authStore
const formRef = ref()
const formValue = ref({
  user: {
    name: '',
    age: '',
  },
  phone: '',
})
const rules = {
  user: {
    name: {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    },
    age: {
      required: true,
      message: '请输入年龄',
      trigger: ['input', 'blur'],
    },
  },
  phone: {
    required: true,
    message: '请输入电话号码',
    trigger: ['input'],
  },
}

function handleValidateClick() {
  formRef.value?.validate((errors: any) => {
    if (!errors)
      window.$message.success('验证通过')
    else window.$message.error('验证不通过')
  })
}
</script>

<template>
  <n-space vertical>
    <n-card title="个人信息">
      <n-space size="large">
        <n-avatar round :size="128" :src="userInfo?.avatar" />

        <n-descriptions label-placement="left" :column="2" :title="`傍晚好，${userInfo?.nickname}，这里是简单的个人中心模板`">
          <n-descriptions-item label="id">
            {{ userInfo?.id }}
          </n-descriptions-item>
          <n-descriptions-item label="用户名">
            {{ userInfo?.userName }}
          </n-descriptions-item>
          <n-descriptions-item label="真实名称">
            {{ userInfo?.nickname }}
          </n-descriptions-item>
          <n-descriptions-item label="角色">
            {{ userInfo?.role }}
          </n-descriptions-item>
        </n-descriptions>
      </n-space>
    </n-card>
    <n-card title="信息修改">
      <n-space justify="center">
        <n-form ref="formRef" class="w-500px" :label-width="80" :model="formValue" :rules="rules">
          <n-form-item label="姓名" path="user.name">
            <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
          </n-form-item>
          <n-form-item label="年龄" path="user.age">
            <n-input v-model:value="formValue.user.age" placeholder="输入年龄" />
          </n-form-item>
          <n-form-item label="电话号码" path="phone">
            <n-input v-model:value="formValue.phone" placeholder="电话号码" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" attr-type="button" block @click="handleValidateClick">
              验证
            </n-button>
          </n-form-item>
        </n-form>
      </n-space>
    </n-card>
  </n-space>
</template>

<style scoped></style>
