<script setup lang="ts">
const text = ref('nova-admin')
</script>

<template>
  <n-card title="二维码">
    <n-alert :show-icon="false" type="info">
      使用naiveUI - QR Code 实现
    </n-alert>
    <n-qr-code :value="text" />
    <n-input v-model:value="text" :maxlength="60" type="text" />
  </n-card>
</template>

<style scoped></style>
