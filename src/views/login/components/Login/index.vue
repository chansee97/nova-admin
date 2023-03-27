<script setup lang="ts">
import { ref } from 'vue'
import type { FormInst } from 'naive-ui'
import { local } from '@/utils'
import { useAuthStore } from '@/store'

const emit = defineEmits(['update:modelValue'])

const authStore = useAuthStore()

function toOtherForm(type: any) {
  emit('update:modelValue', type)
}
const rules = {
  account: {
    required: true,
    trigger: 'blur',
    message: '请输入账户',
  },
  pwd: {
    required: true,
    trigger: 'blur',
    message: '请输入密码',
  },
  code: {
    required: true,
    trigger: 'blur',
    min: 4,
    message: '最短长度为 4',
  },
}
const formValue = ref({
  account: 'super',
  pwd: '123456',
  code: '1234',
})
const isRemember = ref(false)

const formRef = ref<FormInst | null>(null)
function handleLogin() {
  formRef.value?.validate((errors) => {
    if (errors)
      return

    const { account, pwd } = formValue.value

    if (isRemember.value)
      local.set('login_account', { account, pwd })
    else local.remove('login_account')

    authStore.login(account, pwd)
  })
}
function checkUserAccount() {
  const loginAccount = local.get('login_account')
  if (!loginAccount)
    return

  formValue.value = loginAccount
  isRemember.value = true
}
checkUserAccount()
</script>

<template>
  <div>
    <n-h1 depth="3">
      <SvgIcon
        name="logo"
        :size="42"
        class="mr-1ch"
      />登录
    </n-h1>
    <n-form
      ref="formRef"
      :rules="rules"
      :model="formValue"
      :show-label="false"
      size="large"
    >
      <n-form-item path="account">
        <n-input
          v-model:value="formValue.account"
          clearable
          placeholder="输入账号"
        />
      </n-form-item>
      <n-form-item path="pwd">
        <n-input
          v-model:value="formValue.pwd"
          type="password"
          placeholder="输入密码"
          clearable
          show-password-on="click"
        >
          <template #password-invisible-icon>
            <i-icon-park-outline-preview-close-one />
          </template>
          <template #password-visible-icon>
            <i-icon-park-outline-preview-open />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="code">
        <n-space align="center">
          <n-input
            v-model:value="formValue.code"
            clearable
            placeholder="输入验证码"
            :maxlength="4"
          />
          <div>验证码</div>
        </n-space>
      </n-form-item>
      <n-space
        vertical
        :size="20"
      >
        <div class="flex-y-center justify-between">
          <n-checkbox v-model:checked="isRemember">
            记住我
          </n-checkbox>
          <n-button
            type="primary"
            text
            @click="toOtherForm('resetPwd')"
          >
            忘记密码？
          </n-button>
        </div>
        <n-button
          block
          type="primary"
          size="large"
          :loading="authStore.loginLoading"
          @click="handleLogin"
        >
          登录
        </n-button>
        <n-button
          type="primary"
          text
          @click="toOtherForm('register')"
        >
          立即注册
        </n-button>
      </n-space>
    </n-form>
    <n-divider><span op-80>其他登录</span></n-divider>
    <n-space justify="center">
      <n-button circle>
        <template #icon>
          <n-icon><i-icon-park-outline-wechat /></n-icon>
        </template>
      </n-button>
      <n-button circle>
        <template #icon>
          <n-icon><i-icon-park-outline-tencent-qq /></n-icon>
        </template>
      </n-button>
      <n-button circle>
        <template #icon>
          <n-icon><i-icon-park-outline-github-one /></n-icon>
        </template>
      </n-button>
    </n-space>
  </div>
</template>

<style scoped></style>
