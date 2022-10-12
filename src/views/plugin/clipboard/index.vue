<template>
  <n-card>
    <n-input-group>
      <n-input v-model:value="text" placeholder="请输入要复制的内容" />
      <n-button type="primary" @click="handleCopy">复制</n-button>
    </n-input-group>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref('Hello Clipboard');

function handleCopy() {
  if (!navigator.clipboard) {
    window.$message?.error('当前浏览器不支持复制！');
  }
  if (!text.value) {
    window.$message?.error('请输入要复制的内容');
    return;
  }
  navigator.clipboard.writeText(text.value).then(
    (res) => {
      window.$message?.success(`复制成功：${text.value}`);
    },
    (err) => {
      window.$message?.error('复制失败');
    },
  );
}
</script>

<style scoped></style>
