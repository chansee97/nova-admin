<template>
  <div class="wh-full flex-center bg-[#EBECF0]">
    <n-el
      class="w-1400px h-70% flex-center shadow-2xl b-rd-22px p-10px"
      style="background: var(--card-color)"
    >
      <n-grid
        x-gap="10"
        cols="s:1 l:2"
        class="h-full"
        responsive="screen"
      >
        <n-gi>
          <div class="h-full flex-center">
            <img
              src="@/assets/svg/login-bg.svg"
              class="h-full b-rd-12px"
            >
          </div>
        </n-gi>
        <n-gi>
          <div class="h-full flex-col-center justify-between">
            <div class="w-full flex">
              <n-switch
                size="medium"
                :value="appStore.darkMode"
                @update:value="appStore.toggleDarkMode()"
              >
                <template #checked-icon>
                  🌙
                </template> <template #unchecked-icon>
                  🔆
                </template>
              </n-switch>
            </div>

            <div class="w-1/2">
              <n-h1 class="text-center">
                <SvgIcon
                  name="logo"
                  :size="36"
                />
                Ench Admin
              </n-h1>
              <n-p depth="3">
                高效、简约、可能对你有点帮助
              </n-p>
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
                  >
                    <template #prefix>
                      <i-icon-park-outline-woman />
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item path="pwd">
                  <n-input
                    v-model:value="formValue.pwd"
                    type="password"
                    placeholder="输入密码"
                    clearable
                    show-password-on="click"
                  >
                    <template #prefix>
                      <i-icon-park-outline-lock />
                    </template>
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
                    >
                      <template #prefix>
                        <i-icon-park-outline-message />
                      </template>
                    </n-input>
                    <span>验证码什么的</span>
                  </n-space>
                </n-form-item>
                <n-space
                  vertical
                  :size="24"
                >
                  <div class="flex-y-center justify-between">
                    <n-checkbox v-model:checked="isRemember">
                      记住我
                    </n-checkbox>
                    <n-button :text="true">
                      忘记密码？
                    </n-button>
                  </div>
                  <n-button
                    w-full
                    type="primary"
                    size="large"
                    :loading="authStore.loginLoading"
                    @click="handleLogin"
                  >
                    <template #icon>
                      <n-icon>
                        <i-icon-park-outline-six-points />
                      </n-icon>
                    </template>
                    登录
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

            <div />
          </div>
        </n-gi>
      </n-grid>
    </n-el>
  </div>
</template>

<script setup lang="ts">
import { FormInst } from 'naive-ui';
import { useAuthStore, useAppStore } from '@/store';
import { ref, onMounted } from 'vue';
import { local } from '@/utils';

const authStore = useAuthStore();
const appStore = useAppStore();

const formValue = ref({
	account: '',
	pwd: '',
	code: '',
});

const isRemember = ref(false);
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
};
const formRef = ref<FormInst | null>(null);

function handleLogin() {
	formRef.value?.validate((errors) => {
		if (errors) return;

		const { account, pwd } = formValue.value;

		if (isRemember.value) {
			local.set('login_account', { account, pwd });
		} else {
			local.remove('login_account');
		}

		authStore.login(account, pwd);
	});
}

function checkUserAccount() {
	const loginAccount = local.get('login_account');
	if (!loginAccount) return;

	formValue.value = loginAccount;
	isRemember.value = true;
}

onMounted(() => {
	checkUserAccount();
});
</script>

<style scoped></style>
