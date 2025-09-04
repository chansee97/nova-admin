<script setup lang="ts">
// 偏好设置
const preferences = ref({
  aiAssistant: false,
  predictiveLoading: false,
})
</script>

<template>
  <div class="space-y-4">
    <n-alert type="warning" style="margin-bottom: 16px;">
      示例组件，实际功能未实现
    </n-alert>
    <!-- 实验性功能 -->
    <n-card title="实验性功能" size="small">
      <n-list>
        <n-list-item>
          <n-thing>
            <template #header>
              AI 助手
            </template>
            <template #description>
              启用智能助手功能，提供操作建议
            </template>
          </n-thing>
          <template #suffix>
            <n-switch v-model:value="preferences.aiAssistant" />
          </template>
        </n-list-item>
        <n-list-item>
          <n-thing>
            <template #header>
              预测性加载
            </template>
            <template #description>
              根据使用习惯预加载可能需要的内容
            </template>
          </n-thing>
          <template #suffix>
            <n-switch v-model:value="preferences.predictiveLoading" />
          </template>
        </n-list-item>
      </n-list>
    </n-card>
  </div>
</template>
