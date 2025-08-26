<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { useAuthStore } from '@/store'
import { fetchCaptchaImage } from '@/api'
import { local } from '@/utils'
import { useBoolean } from '@/hooks'

const emit = defineEmits(['update:modelValue'])
const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)
const authStore = useAuthStore()

function toOtherForm(type: any) {
  emit('update:modelValue', type)
}

const { t } = useI18n()

// 验证码相关状态
const captchaData = ref({
  captchaId: '',
  captchaImage: '',
  enabled: false,
})

const rules = computed(() => {
  const baseRules = {
    account: {
      required: true,
      trigger: 'blur',
      message: t('login.accountRuleTip'),
    },
    pwd: {
      required: true,
      trigger: 'blur',
      message: t('login.passwordRuleTip'),
    },
  }

  // 如果启用验证码，添加验证码验证规则
  if (captchaData.value.enabled) {
    (baseRules as any).captcha = {
      required: true,
      trigger: 'blur',
      message: '请输入验证码',
    }
  }

  return baseRules
})
const formValue = ref({
  account: 'admin',
  pwd: '12345',
  captcha: '',
})
const isRemember = ref(false)

// 获取验证码
async function getCaptcha() {
  try {
    const { data } = await fetchCaptchaImage()
    captchaData.value = {
      captchaId: data.captchaId,
      captchaImage: data.captchaImage,
      enabled: data.enabled,
    }
  }
  catch (error) {
    console.error('获取验证码失败:', error)
  }
}

// 刷新验证码
function refreshCaptcha() {
  formValue.value.captcha = ''
  getCaptcha()
}

const formRef = ref<FormInst | null>(null)
function handleLogin() {
  formRef.value?.validate(async (errors) => {
    if (errors)
      return

    startLoading()
    const { account, pwd, captcha } = formValue.value

    if (isRemember.value) {
      local.set('loginAccount', { account, pwd })
    }
    else {
      local.remove('loginAccount')
    }

    // 传递验证码相关参数
    try {
      await authStore.login(account, pwd, captchaData.value.captchaId, captcha)
    }
    catch {
      refreshCaptcha()
    }
    endLoading()
  })
}
onMounted(() => {
  checkUserAccount()
  getCaptcha()
})
function checkUserAccount() {
  const loginAccount = local.get('loginAccount')
  if (!loginAccount)
    return

  formValue.value = loginAccount
  isRemember.value = true
}
</script>

<template>
  <div>
    <n-h2 depth="3" class="text-center">
      {{ $t('login.signInTitle') }}
    </n-h2>
    <n-form ref="formRef" :rules="rules" :model="formValue" :show-label="false" size="large">
      <n-form-item path="account">
        <n-input v-model:value="formValue.account" clearable :placeholder="$t('login.accountPlaceholder')" />
      </n-form-item>
      <n-form-item path="pwd">
        <n-input v-model:value="formValue.pwd" type="password" :placeholder="$t('login.passwordPlaceholder')" clearable show-password-on="click">
          <template #password-invisible-icon>
            <icon-park-outline-preview-close-one />
          </template>
          <template #password-visible-icon>
            <icon-park-outline-preview-open />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item v-if="captchaData.enabled" path="captcha">
        <div class="flex w-full gap-2">
          <n-input
            v-model:value="formValue.captcha"
            placeholder="请输入验证码"
            clearable
            class="flex-1"
          />
          <div
            class="flex items-center justify-center w-24 h-10 border border-gray-300 rounded cursor-pointer hover:border-primary-500 transition-colors"
            @click="refreshCaptcha"
          >
            <div
              class="w-full h-full flex items-center justify-center"
              v-html="captchaData.captchaImage"
            />
          </div>
        </div>
      </n-form-item>
      <n-space vertical :size="20">
        <div class="flex-y-center justify-between">
          <n-checkbox v-model:checked="isRemember">
            {{ $t('login.rememberMe') }}
          </n-checkbox>
          <n-button type="primary" text @click="toOtherForm('resetPwd')">
            {{ $t('login.forgotPassword') }}
          </n-button>
        </div>
        <n-button block type="primary" size="large" :loading="loading" :disabled="loading" @click="handleLogin">
          {{ $t('login.signIn') }}
        </n-button>
        <n-flex>
          <n-text>{{ $t('login.noAccountText') }}</n-text>
          <n-button type="primary" text @click="toOtherForm('register')">
            {{ $t('login.signUp') }}
          </n-button>
        </n-flex>
      </n-space>
    </n-form>
  </div>
</template>

<style scoped></style>
