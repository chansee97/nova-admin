<template>
  <n-grid :x-gap="16" :y-gap="16">
    <n-gi :span="24">
      <n-card>
        <n-space justify="space-between">
          <div class="flex-y-center">
            <n-avatar round :size="64" :src="authStore.userInfo?.avatar" />
            <div class="pl-12px">
              <h3 class="text-18px font-semibold">您好，{{ authStore.userInfo.realName }},今天又是充满活力的一天！</h3>
              <p class="leading-30px text-[#999]">今日多云转晴，20℃ - 25℃！</p>
            </div>
          </div>
          <n-row class="w-450px">
            <n-col :span="10">
              <n-statistic label="统计数据" :value="99">
                <template #prefix>
                  <i-icon-park-outline-chart-histogram />
                </template>
                <template #suffix>/ 100</template>
              </n-statistic>
            </n-col>
            <n-col :span="10">
              <n-statistic label="活跃用户" value="34,123">
                <template #prefix>
                  <i-icon-park-outline-customer />
                </template>
              </n-statistic>
            </n-col>
            <n-col :span="4">
              <n-statistic label="待办" :value="18">
                <template #prefix>
                  <i-icon-park-outline-list-checkbox />
                </template>
              </n-statistic>
            </n-col>
          </n-row>
        </n-space>
      </n-card>
    </n-gi>
    <n-gi :span="15">
      <n-card title="动态">
        <template #header-extra><n-button type="primary" quaternary>更多动态</n-button></template>
        <n-list>
          <template #header>hhh</template>
          <template #footer>fff</template>
          <n-list-item>
            <template #prefix>
              <n-button>Prefix</n-button>
            </template>
            <template #suffix>
              <n-button>Suffix</n-button>
            </template>
            <n-thing title="Thing" title-extra="extra" description="description">
              Biu
              <br />
              Biu
              <br />
              Biu
              <br />
            </n-thing>
          </n-list-item>
          <n-list-item>
            <n-thing title="Thing" title-extra="extra" description="description" />
          </n-list-item>
        </n-list>
      </n-card>
    </n-gi>
    <n-gi :span="9">
      <n-card title="快捷入口">
        <n-grid :x-gap="8" :y-gap="8">
          <n-gi :span="8"><n-card title="卡片" hoverable>卡片内容</n-card></n-gi>
          <n-gi :span="8"><n-card title="卡片" hoverable>卡片内容</n-card></n-gi>
          <n-gi :span="8"><n-card title="卡片" hoverable>卡片内容</n-card></n-gi>
          <n-gi :span="8"><n-card title="卡片" hoverable>卡片内容</n-card></n-gi>
          <n-gi :span="8"><n-card title="卡片" hoverable>卡片内容</n-card></n-gi>
          <n-gi :span="8"><n-card title="卡片" hoverable>卡片内容</n-card></n-gi>
        </n-grid>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store';

const authStore = useAuthStore();
</script>

<style scoped></style>
