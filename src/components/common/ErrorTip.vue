<script setup lang="ts">
defineProps<{
  /** 异常类型 403 404 500 */
  type: '403' | '404' | '500'
}>()
const router = useRouter()
</script>

<template>
  <div class="flex-col-center h-full">
    <img
      v-if="type === '403'"
      src="@/assets/svg/error-403.svg"
      alt=""
      class="w-1/3"
    >
    <img
      v-if="type === '404'"
      src="@/assets/svg/error-404.svg"
      alt=""
      class="w-1/3"
    >
    <img
      v-if="type === '500'"
      src="@/assets/svg/error-500.svg"
      alt=""
      class="w-1/3"
    >
    <n-button
      type="primary"
      @click="router.push('/')"
    >
      {{ $t('app.backHome') }}
    </n-button>
  </div>
</template>
