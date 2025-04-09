<script setup lang="ts">
import { useEcharts } from '@/hooks'
import type { ECOption } from '@/hooks'
import { graphic } from 'echarts'

const chartData = [
  { name: '1', value: 300 },
  { name: '2', value: 400 },
  { name: '3', value: 452 },
  { name: '4', value: 770 },
  { name: '5', value: 650 },
  { name: '6', value: 256 },
  { name: '7', value: 350 },
  { name: '8', value: 422 },
  { name: '9', value: 235 },
  { name: '10', value: 658 },
  { name: '11', value: 600 },
  { name: '12', value: 400 },
  { name: '13', value: 523 },
  { name: '14', value: 482 },
  { name: '15', value: 423 },
]

const xData = chartData.map(v => v.name)
const sData = chartData.map(v => v.value)

const option = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '0%',
    top: '0%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xData,
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(151,151,151,0.5)',
        type: 'dashed',
      },
    },
    axisLabel: {
      margin: 10,
      color: '#666',
      fontSize: 14,
    },

  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: 'rgba(151,151,151,0.5)',
        type: 'dashed',
      },
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(151,151,151,0.5)',
        type: 'dashed',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  series: [{
    type: 'bar',
    barWidth: '20px',
    data: sData,
    itemStyle: {
      color: new graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#00BD89', // 0% 处的颜色
      }, {
        offset: 1,
        color: '#C9F9E1', // 100% 处的颜色
      }], false),
    },
  }],
}) as Ref<ECOption>

useEcharts('lineRef', option)
</script>

<template>
  <div
    ref="lineRef"
    class="h-400px"
  />
</template>

<style scoped>

</style>
