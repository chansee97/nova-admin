<script setup lang="ts">
import { useEcharts } from '@/hooks'
import type { ECOption } from '@/hooks'
import { graphic } from 'echarts'

const lineOptions = ref<ECOption>({
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
    data: ['10:00', '10:10', '10:10', '10:30', '10:40', '10:50'],
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },

  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  series: [{
    name: '2',
    type: 'line',
    z: 3,
    showSymbol: false,
    smoothMonotone: 'x',
    lineStyle: {
      width: 3,
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(59,102,246)', // 0% 处的颜色
        }, {
          offset: 1,
          color: 'rgba(118,237,252)', // 100% 处的颜色
        }],
      },
      shadowBlur: 4,
      shadowColor: 'rgba(69,126,247,.2)',
      shadowOffsetY: 4,
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(227,233,250,.9)', // 0% 处的颜色
        }, {
          offset: 1,
          color: 'rgba(248,251,252,.3)', // 100% 处的颜色
        }],
      },
    },
    smooth: true,
    data: [20, 56, 17, 40, 68, 42],
  }, {
    name: '1',
    type: 'line',
    showSymbol: false,
    smoothMonotone: 'x',

    lineStyle: {
      width: 3,
      color: new graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(255,84,108)',
      }, {
        offset: 1,
        color: 'rgba(252,140,118)',
      }], false),
      shadowBlur: 4,
      shadowColor: 'rgba(253,121,128,.2)',
      shadowOffsetY: 4,
    },
    areaStyle: {
      color: new graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(255,84,108,.15)',
      }, {
        offset: 1,
        color: 'rgba(252,140,118,0)',
      }], false),
    },
    smooth: true,
    data: [20, 71, 8, 50, 57, 32],
  }],
}) as Ref<ECOption>

useEcharts('lineRef', lineOptions)
</script>

<template>
  <div
    ref="lineRef"
    class="h-400px"
  />
</template>

<style scoped>

</style>
