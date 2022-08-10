<template>
  <div flex-center wh-full bg-hex-F3F4F6>
    <n-carousel autoplay trigger="hover" dot-type="line" effect="fade" :interval="3000" w-lg sm:hidden xl:block>
      <img v-for="(item, index) in swiperList" :key="index" h-screen object-cover :src="item" />
    </n-carousel>
    <div flex-1 flex-center>
      <div b-rd-2 bg-white w-md h-xl shadow-lg p-5xl>
        <n-h1>
          <!-- <Icon icon="icon-park:ad-product" :inline="true" /> -->
          <!-- <icon-icon-park-ad-product /> -->
          <!-- <span class="iconify" data-icon="icon-park:ad-product" data-inline="false" style="color: #888888"></span> -->
          <n-icon size="40" :depth="2" :component="IconParkAdProduct" />
          Ench Admin
        </n-h1>
        <n-p depth="3">高效、简约、有点好玩</n-p>
        <n-form ref="formRef" :rules="rules" :model="formValue" :show-label="false" size="large">
          <n-form-item path="account">
            <n-input v-model:value="formValue.account" placeholder="输入账号" round />
          </n-form-item>
          <n-form-item path="pwd">
            <n-input v-model:value="formValue.pwd" type="password" placeholder="输入密码" round />
          </n-form-item>
          <n-form-item path="code">
            <n-input v-model:value="formValue.code" placeholder="输入验证码" round />
          </n-form-item>
          <n-space vertical :size="24">
            <div class="flex-y-center justify-between">
              <n-checkbox>记住我</n-checkbox>
              <n-button :text="true">忘记密码？</n-button>
            </div>
            <n-button w-full type="primary" round size="large" @click="validateAll">登录</n-button>
          </n-space>
        </n-form>

        <n-divider><span op-50>其他登录</span></n-divider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormInst } from 'naive-ui';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
// import { Icon } from '@iconify/vue';
import IconParkAdProduct from '~icons/icon-park/ad-product';
const router = useRouter();
const swiperList = ref([
  'https://images.unsplash.com/photo-1659991689791-db84493f8544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
  'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1657299156568-c94580e20fb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1659983391845-47ea9d99e7bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
]);

const formValue = ref({
  account: '',
  pwd: '',
  code: '',
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

const validateAll = () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      return console.error(errors);
    }
    router.push('/');
  });
};
</script>

<style scoped></style>
