<template>
  <div flex-center wh-full bg-hex-F3F4F6>
    <n-carousel autoplay trigger="hover" dot-type="line" effect="fade" class="w-3/4">
      <img v-for="(item, index) in swiperList" :key="index" class="h-screen object-cover" :src="item" />
    </n-carousel>
    <div flex-1 flex-center>
      <div w-full h-xl px-6xl>
        <n-h1 c-blue>
          <!-- <e-icon icon="icon-park-outline:plastic-surgery" :size="28" /> -->
          <i-icon-park-outline-plastic-surgery />
          Ench Admin
        </n-h1>
        <n-p depth="3">高效、简约、可能对你有点帮助</n-p>
        <n-form ref="formRef" :rules="rules" :model="formValue" :show-label="false" size="large">
          <n-form-item path="account">
            <n-input v-model:value="formValue.account" placeholder="输入账号" round>
              <template #prefix>
                <e-icon icon="icon-park-outline:woman" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="pwd">
            <n-input
              v-model:value="formValue.pwd"
              type="password"
              placeholder="输入密码"
              show-password-on="click"
              round
            >
              <template #prefix>
                <e-icon icon="icon-park-outline:lock" />
              </template>
              <template #password-invisible-icon>
                <e-icon icon="icon-park-outline:preview-close-one" />
              </template>
              <template #password-visible-icon>
                <e-icon icon="icon-park-outline:preview-open" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="code">
            <n-space align="center">
              <n-input v-model:value="formValue.code" placeholder="输入验证码" round>
                <template #prefix>
                  <e-icon icon="icon-park-outline:message" />
                </template>
              </n-input>
              <span>这边可以放点什么</span>
            </n-space>
          </n-form-item>
          <n-space vertical :size="24">
            <div class="flex-y-center justify-between">
              <n-checkbox>记住我</n-checkbox>
              <n-button :text="true">忘记密码？</n-button>
            </div>
            <n-button w-full type="primary" round size="large" :loading="authStore.loginLoading" @click="handleLogin">
              <template #icon>
                <n-icon>
                  <i-icon-park-outline-six-points />
                </n-icon>
              </template>
              登录
            </n-button>
          </n-space>
        </n-form>
        <n-divider><span op-50>其他登录</span></n-divider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormInst } from 'naive-ui';
import { useAuthStore } from '@/store';
import { ref } from 'vue';

const authStore = useAuthStore();
const swiperList = ref([
  'https://images.unsplash.com/photo-1546414809-22c82b5e2ad4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1659533982925-09cb4f3f7876?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80',
  'https://images.unsplash.com/photo-1630771077377-674b39a13f58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1543782248-03e2c5a93e18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
]);

const formValue = ref({
  account: 'admin',
  pwd: '123456',
  code: '1234',
});
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

const handleLogin = () => {
  formRef.value?.validate((errors) => {
    if (errors) return console.error(errors);

    const { account, pwd } = formValue.value;
    authStore.login(account, pwd);
  });
};
</script>

<style scoped></style>
