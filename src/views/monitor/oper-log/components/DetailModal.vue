<script setup lang="ts">
import { useBoolean } from '@/hooks'

const { bool: visible, setTrue: showModal, setFalse: hideModal } = useBoolean(false)

const operationLog = ref<Entity.OperLog | null>(null)

// 打开弹窗
function openModal(row: Entity.OperLog) {
  operationLog.value = row
  showModal()
}

// 关闭弹窗
function closeModal() {
  hideModal()
  operationLog.value = null
}

defineExpose({
  openModal,
})
</script>

<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    title="操作日志详细"
    class="w-4/5 max-w-4xl"
    :mask-closable="false"
  >
    <div v-if="operationLog" class="space-y-4">
      <!-- 基本信息 -->
      <n-card title="基本信息" size="small">
        <n-descriptions :column="3" label-placement="left" size="small">
          <n-descriptions-item label="日志编号">
            {{ operationLog.id }}
          </n-descriptions-item>
          <n-descriptions-item label="系统模块">
            {{ operationLog.title }}
          </n-descriptions-item>
          <n-descriptions-item label="部门名称">
            {{ operationLog.deptName || '-' }}
          </n-descriptions-item>
          <n-descriptions-item label="操作状态">
            <n-tag size="small">
              {{ operationLog.status === 0 ? '正常' : '异常' }}
            </n-tag>
          </n-descriptions-item>
          <n-descriptions-item label="消耗时间">
            {{ `${operationLog.costTime}ms` }}
          </n-descriptions-item>
          <n-descriptions-item label="操作时间">
            {{ operationLog.operTime }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>

      <!-- 请求信息 -->
      <n-card title="请求信息" size="small">
        <n-descriptions :column="2" label-placement="left" size="small">
          <n-descriptions-item label="调用方法" :span="2">
            <n-text code>
              {{ operationLog.method }}
            </n-text>
          </n-descriptions-item>
          <n-descriptions-item label="请求地址">
            <n-text code>
              {{ operationLog.operUrl }}
            </n-text>
          </n-descriptions-item>
          <n-descriptions-item label="请求方式">
            <n-tag size="small">
              {{ operationLog.requestMethod }}
            </n-tag>
          </n-descriptions-item>
          <n-descriptions-item label="主机地址">
            {{ operationLog.operIp }}
          </n-descriptions-item>
          <n-descriptions-item label="操作地点">
            {{ operationLog.operLocation }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>

      <!-- 请求参数 -->
      <pro-card title="请求参数" size="small" :show="false">
        <n-scrollbar style="max-height: 200px">
          <pre>{{ JSON.parse(operationLog.operParam) }}</pre>
        </n-scrollbar>
      </pro-card>

      <!-- 返回结果 -->
      <pro-card title="返回结果" size="small">
        <n-scrollbar style="max-height: 200px">
          <pre>{{ operationLog.jsonResult }}</pre>
        </n-scrollbar>
      </pro-card>

      <!-- 异常信息 -->
      <n-card v-if="operationLog.status === 1" title="异常信息" size="small">
        <n-scrollbar style="max-height: 200px">
          <n-text type="error">
            {{ operationLog.errorMsg || '无异常信息' }}
          </n-text>
        </n-scrollbar>
      </n-card>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <n-button @click="closeModal">
          关闭
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
