<script setup lang="ts">
import { Login, Register, ResetPwd } from './components'

  type IformType = 'login' | 'register' | 'resetPwd'
const formType: Ref<IformType> = ref('login')
const formComponets = {
  login: Login,
  register: Register,
  resetPwd: ResetPwd,
}
</script>

<template>
  <div class="wh-full flex-center login__bg">
    <div class="fixed top-40px right-40px text-lg">
      <DarkModeSwitch />
    </div>
    <n-el
      class="w-1000px h-600px flex-center shadow-2xl p-4xl rd-12px z-1"
      style="background: var(--card-color)"
    >
      <n-grid
        x-gap="10"
        cols="s:1 l:2"
        class="h-full"
        responsive="screen"
      >
        <n-gi>
          <div class="h-full flex-col">
            <n-h2>Nova </n-h2>
            <img
              src="@/assets/svg/login-illus.svg"
              class="h-80%"
            >
          </div>
        </n-gi>
        <n-gi class="flex-center">
          <transition
            name="fade-slide"
            mode="out-in"
          >
            <component
              :is="formComponets[formType]"
              v-model="formType"
              class="w-70%"
            />
          </transition>
        </n-gi>
      </n-grid>
    </n-el>

    <div />
  </div>
</template>

<style scoped lang="less">
  .login__bg {
    background-image: url(@/assets/img/login-bg.webp);
    position: relative;
    &::after,
    &::before {
      position: absolute;
      content: '';
      width: 30vw;
      height: 15vw;
      background-size: contain;
      background-repeat: no-repeat;
    }
    &::before {
      background-image: url(@/assets/svg/login-illus-lt.svg);
      top: 0;
      left: 0;
    }
    &::after {
      background-image: url(@/assets/svg/login-illus-rb.svg);
      background-position: right bottom;
      bottom: 0;
      right: 0;
    }
  }
</style>
