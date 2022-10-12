<template>
  <n-space :vertical="true" :size="16">
    <n-card>
      <div ref="pieRef" class="h-400px"></div>
    </n-card>
    <n-card>
      <div ref="lineRef" class="h-400px"></div>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { type ECOption, useEcharts } from '@/hook';

const pieOptions = ref<ECOption>({
  title: {
    text: 'ECharts 入门示例2',
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
}) as Ref<ECOption>;
const { domRef: pieRef } = useEcharts(pieOptions);
const { domRef: lineRef } = useEcharts(pieOptions);
</script>

<style scoped></style>
