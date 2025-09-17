<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getServerStatus } from '@/api/monitor/server'
import type { ServerStatus } from '@/api/monitor/server'

const loading = ref(false)
const data = ref<ServerStatus | null>(null)

function loadColor(load?: ServerStatus['os']['load']): NaiveUI.ThemeColor {
  switch (load) {
    case 'low':
      return 'success'
    case 'medium':
      return 'warning'
    case 'high':
      return 'error'
    case 'overload':
      return 'error'
    default:
      return 'default'
  }
}

async function fetchData() {
  loading.value = true
  try {
    const res = await getServerStatus()
    // 后端统一响应，数据在 res.data
    data.value = res.data
  }
  finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <n-space vertical>
    <n-card>
      <n-flex align="center">
        <n-h3 prefix="bar" class="m-0">
          服务器状态
        </n-h3>
        <n-text depth="3">
          查看当前服务器与进程运行情况
        </n-text>
        <n-button type="primary" ghost class="ml-auto" @click="fetchData">
          <template #icon>
            <icon-park-outline-refresh />
          </template>
          刷新
        </n-button>
      </n-flex>
    </n-card>

    <!-- 基本信息 -->
    <n-card title="基础信息" size="small">
      <n-descriptions :columns="3" label-placement="left" bordered>
        <n-descriptions-item label="主机名">
          {{ data?.hostname || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="平台">
          {{ data?.os.platform || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="架构">
          {{ data?.os.arch || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="系统版本">
          {{ data?.os.release || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="内核类型">
          {{ data?.os.type || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="内核版本">
          {{ data?.os.kernelVersion || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="系统负载">
          <n-tag :type="loadColor(data?.os.load)">
            {{ data?.os.load ?? '-' }}
          </n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="系统运行时长">
          {{ data?.os.uptime || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="主要 IPv4">
          {{ data?.network.primaryIPv4 || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="网卡数量">
          {{ data?.network.interfaceCount || '-' }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <!-- CPU 信息 -->
    <n-card title="CPU" size="small">
      <n-descriptions :columns="3" label-placement="left" bordered>
        <n-descriptions-item label="型号" :span="3">
          {{ data?.cpu.model || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="核心数">
          {{ data?.cpu.cores || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="主频">
          {{ data?.cpu.speed || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="逻辑核心">
          {{ data?.cpu.logicalCores ?? '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="用户使用率">
          {{ data?.cpu.userUsage }}%
        </n-descriptions-item>
        <n-descriptions-item label="系统使用率">
          {{ data?.cpu.systemUsage }}%
        </n-descriptions-item>
        <n-descriptions-item label="空闲率">
          {{ data?.cpu.idle }}%
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <!-- 内存信息 -->
    <n-card title="内存" size="small">
      <n-descriptions :columns="3" label-placement="left" bordered>
        <n-descriptions-item label="总内存">
          {{ data?.memory.total || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="已用内存">
          {{ data?.memory.used || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="空闲内存">
          {{ data?.memory.free || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="内存占用" :span="3">
          <n-progress
            :percentage="data?.memory.usedPercent || 0"
            indicator-placement="inside"
            processing
          />
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <!-- 网络信息 -->
    <n-card v-if="data?.network" title="网络" size="small">
      <div class="grid grid-cols-1 gap-2">
        <div v-for="(iface, idx) in data?.network.interfaces || []" :key="idx" class="p-2 rounded border border-[var(--divider-color)]">
          <div class="font-medium mb-1">
            {{ iface.name }} <n-text depth="3">
              ({{ iface.internal ? '内网/回环' : '外网' }})
            </n-text>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <span>MAC: {{ iface.mac || '-' }}</span>
            <span>IPv4: {{ iface.ipv4?.length ? iface.ipv4.join(', ') : '-' }}</span>
            <span>IPv6: {{ iface.ipv6?.length ? iface.ipv6.join(', ') : '-' }}</span>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 进程信息 -->
    <n-card title="进程" size="small">
      <n-descriptions :columns="3" label-placement="left" bordered>
        <n-descriptions-item label="PID">
          {{ data?.process.pid || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="Node 版本">
          {{ data?.process.nodeVersion || '-' }}
        </n-descriptions-item>
        <n-descriptions-item label="运行时长">
          {{ data?.process.uptime || '-' }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-space>
</template>

<style scoped>
</style>
