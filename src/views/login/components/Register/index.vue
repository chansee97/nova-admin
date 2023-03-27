<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])
function toLogin() {
  emit('update:modelValue', 'login')
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
  rePwd: {
    required: true,
    trigger: 'blur',
    message: '请再次确认密码',
  },
}
const formValue = ref({
  account: 'admin',
  pwd: '000000',
  rePwd: '000000',
})

const isRead = ref(false)

function handleRegister() {}
</script>

<template>
  <div>
    <n-h1 depth="3">
      <SvgIcon
        name="logo"
        :size="42"
        class="mr-1ch"
      />注册
    </n-h1>
    <n-form
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
      <n-form-item path="rePwd">
        <n-input
          v-model:value="formValue.rePwd"
          type="password"
          placeholder="请再次输入密码"
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
      <n-form-item>
        <n-space
          vertical
          :size="20"
          class="w-full"
        >
          <n-checkbox v-model:checked="isRead">
            我已阅读并同意 <n-button
              type="primary"
              text
            >
              用户协议
            </n-button> 及
            <n-button
              type="primary"
              text
            >
              xx社区规范
            </n-button>
          </n-checkbox>
          <n-button
            block
            type="primary"
            @click="handleRegister"
          >
            立即注册
          </n-button>
          <n-button
            tertiary
            block
            type="primary"
            @click="toLogin"
          >
            已有账号？去登录
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </div>
</template>

<style scoped></style>
