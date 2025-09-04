<script setup lang="ts">
// 通知设置
const settings = ref({
  systemUpdateEmail: true,
  securityAlertEmail: true,
})
</script>

<template>
  <div class="space-y-4">
    <n-alert type="warning" style="margin-bottom: 16px;">
      示例组件，实际功能未实现
    </n-alert>
    <!-- 邮件通知 -->
    <n-card title="邮件通知" size="small">
      <n-list>
        <n-list-item>
          <n-thing>
            <template #header>
              系统更新通知
            </template>
            <template #description>
              系统有重要更新时发送邮件通知
            </template>
          </n-thing>
          <template #suffix>
            <n-switch v-model:value="settings.systemUpdateEmail" />
          </template>
        </n-list-item>
        <n-list-item>
          <n-thing>
            <template #header>
              安全警报
            </template>
            <template #description>
              检测到安全威胁时立即发送邮件
            </template>
          </n-thing>
          <template #suffix>
            <n-switch v-model:value="settings.securityAlertEmail" />
          </template>
        </n-list-item>
      </n-list>
    </n-card>
  </div>
</template>
