<template>
  <n-card>
    <n-input-group>
      <n-input v-model:value="input" />
      <n-button type="primary" @click="createCode">生成</n-button>
    </n-input-group>
    <QR-code :text="text"></QR-code>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const input = ref('');
const text = ref('');

function createCode() {
  text.value = input.value;
}
</script>

<style scoped></style>
