<script setup lang="ts">
import { Login, Register, ResetPwd } from './components'

  type IformType = 'login' | 'register' | 'resetPwd'
const formType: Ref<IformType> = ref('login')
const formComponets = {
  login: Login,
  register: Register,
  resetPwd: ResetPwd,
}

const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <n-el class="wh-full flex-center" style="background-color: var(--body-color);">
    <div class="fixed top-40px right-40px text-lg">
      <DarkModeSwitch />
      <LangsSwitch />
    </div>
    <n-el
      class="p-4xl h-full w-full sm:w-450px sm:h-700px"
      style="background: var(--card-color);box-shadow: var(--box-shadow-1);"
    >
      <div class="w-full flex flex-col items-center">
        <SvgIconsLogo class="text-6em" />
        <n-h3>{{ appName }} </n-h3>
        <transition
          name="fade-slide"
          mode="out-in"
        >
          <component
            :is="formComponets[formType]"
            v-model="formType"
            class="w-85%"
          />
        </transition>
      </div>
    </n-el>

    <div />
  </n-el>
</template>
