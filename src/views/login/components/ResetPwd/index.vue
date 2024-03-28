<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
function toLogin() {
  emit('update:modelValue', 'login')
}
const rules = {
  account: {
    required: true,
    trigger: 'blur',
    message: '请输入账号/手机号码',
  },
}
const formValue = ref({
  account: '',
})

function handleRegister() {}
</script>

<template>
  <div>
    <n-h2 depth="3" class="text-center">
      重置密码
    </n-h2>
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
          placeholder="账号/手机号码"
        />
      </n-form-item>
      <n-form-item>
        <n-space
          vertical
          :size="20"
          class="w-full"
        >
          <n-button
            block
            type="primary"
            @click="handleRegister"
          >
            重置密码
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
