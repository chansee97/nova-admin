<script setup lang="ts">
import { type ECOption, useEcharts } from '@/hooks'
import { graphic } from 'echarts'

// 饼状图
const pieOptions = ref<ECOption>({
  title: {
    text: '饼图',
  },
  color: [
    '#37a2da',
    '#32c5e9',
    '#9fe6b8',
    '#ffdb5c',
    '#ff9f7f',
    '#fb7293',
    '#e7bcf3',
    '#8378ea',
  ],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: {
        show: true,
        type: ['line'],
      },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  calculable: true,
  series: [
    {
      type: 'pie',
      name: '增值电信业务统计表',
      radius: [40, 150],
      roseType: 'area',
      data: [
        { value: 10, name: 'rose1' },
        { value: 5, name: 'rose2' },
        { value: 15, name: 'rose3' },
        { value: 25, name: 'rose4' },
        { value: 20, name: 'rose5' },
        { value: 35, name: 'rose6' },
        { value: 30, name: 'rose7' },
        { value: 40, name: 'rose8' },
      ],
    },
  ],
})
const { update } = useEcharts('pieRef', pieOptions)

const randomValue = () => Math.round(Math.random() * 100)
function updatePieChart() {
  pieOptions.value.series = [
    {
      data: [
        { value: randomValue(), name: 'rose1' },
        { value: randomValue(), name: 'rose2' },
        { value: randomValue(), name: 'rose3' },
        { value: randomValue(), name: 'rose4' },
        { value: randomValue(), name: 'rose5' },
        { value: randomValue(), name: 'rose6' },
        { value: randomValue(), name: 'rose7' },
        { value: randomValue(), name: 'rose8' },
      ],
    },
  ]

  update(pieOptions.value)
}

// 折线图
const lineOptions = ref<ECOption>({
  title: {
    text: '折线图',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      color: '#37a2da',
      name: 'Email',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#37a2da',
            },
            {
              offset: 1,
              color: '#fff',
            },
          ],
        },
      },
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      color: '#9fe6b8',
      name: 'Union Ads',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#9fe6b8',
            },
            {
              offset: 1,
              color: '#fff',
            },
          ],
        },
      },
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      color: '#fedb5c',
      name: 'Video Ads',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#fedb5c',
            },
            {
              offset: 1,
              color: '#fff',
            },
          ],
        },
      },
      emphasis: {
        focus: 'series',
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      color: '#fb7293',
      name: 'Direct',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#fb7293',
            },
            {
              offset: 1,
              color: '#fff',
            },
          ],
        },
      },
      emphasis: {
        focus: 'series',
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      color: '#e7bcf3',
      name: 'Search Engine',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#e7bcf3',
            },
            {
              offset: 1,
              color: '#fff',
            },
          ],
        },
      },
      emphasis: {
        focus: 'series',
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
})
useEcharts('lineRef', lineOptions)

// 柱状图
const barOptions = ref<ECOption>({
  title: {
    text: '柱状图',
  },
  tooltip: {},
  grid: {
    top: '8%',
    left: '1%',
    right: '1%',
    bottom: '8%',
    containLabel: true,
  },
  legend: {
    itemGap: 50,
    data: ['注册总量', '最新注册量'],
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      axisLine: {
        // 坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: '#f9f9f9',
        },
      },
      axisLabel: {
        // 坐标轴刻度标签的相关设置
        color: '#d1e6eb',
        margin: 15,
      },
      axisTick: {
        show: false,
      },
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      // max: 140,
      splitNumber: 7,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#0a3256',
        },
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        margin: 20,
        color: '#d1e6eb',
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '注册总量',
      type: 'line',
      showAllSymbol: true,
      symbol: 'emptyCircle',
      symbolSize: 6,
      itemStyle: {
        color: '#28ffb3', // 线条颜色
        borderColor: '#f0f',
      },
      label: {
        show: true,
        position: 'top',
        color: '#f9f9f9',
        borderColor: '#fff',
      },
      tooltip: {
        show: false,
      },
      areaStyle: {
        // 区域填充样式
        // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
        color: new graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(0,154,120,1)',
            },
            {
              offset: 1,
              color: 'rgba(0,0,0, 0)',
            },
          ],
          false,
        ),
        shadowColor: 'rgba(53,142,215, 0.9)', // 阴影颜色
        shadowBlur: 20, // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
      },
      data: [393, 438, 485, 631, 689, 824, 987],
    },
    {
      name: '最新注册量',
      type: 'bar',
      barWidth: 20,
      tooltip: {
        show: false,
      },
      label: {
        show: true,
        position: 'top',
        color: '#fff',
      },
      itemStyle: {
        color(params) {
          const colorList = [
            '#0ec1ff',
            '#10cdff',
            '#12daff',
            '#15ebff',
            '#17f8ff',
            '#1cfffb',
            '#1dfff1',
          ]
          return colorList[params.dataIndex]
        },
      },
      data: [200, 382, 102, 267, 186, 315, 316],
    },
  ],
})
useEcharts('barRef', barOptions)

// 雷达图
const radarOptions = ref<ECOption>({
  title: {
    text: 'Multiple Radar',
  },
  tooltip: {},
  legend: {
    left: 'center',
  },
  radar: [
    {
      indicator: [
        { name: '萧塘', max: 100 },
        { name: '环城东路', max: 100 },
        { name: '望园路', max: 100 },
        { name: '奉贤新城', max: 100 },
        { name: '奉浦大道', max: 100 },
        { name: '金海湖', max: 100 },
      ],
    },
  ],
  series: [
    {
      type: 'radar',
      data: [
        {
          name: '进站',
          value: [43, 90, 80, 53, 78, 89, 77, 50],
          areaStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(46,203,255, 0.14)', // 0% 处的颜色
                },
                {
                  offset: 0.15,
                  color: 'rgba(46,203,255, 0.14)', // 100% 处的颜色
                },
                {
                  offset: 0.75,
                  color: '#057FB3', // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: '#078DC6', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        {
          name: '出站',
          value: [50, 44, 56, 69, 43, 77, 90, 20],
          areaStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(255, 127,0, 0.14)', // 0% 处的颜色
                },
                {
                  offset: 0.15,
                  color: 'rgba(255, 127,0, 0.14)', // 100% 处的颜色
                },
                {
                  offset: 0.75,
                  color: 'rgba(2255, 127,0, 0.4)', // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(255, 127,0, 0.5)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    },
  ],
})
useEcharts('radarRef', radarOptions)
</script>

<template>
  <n-space
    :vertical="true"
    :size="16"
  >
    <n-card>
      <n-button @click="updatePieChart">
        手动更新图表
      </n-button>
      <div
        ref="pieRef"
        class="h-400px"
      />
    </n-card>
    <n-card>
      <div
        ref="lineRef"
        class="h-400px"
      />
    </n-card>
    <n-card>
      <div
        ref="barRef"
        class="h-400px"
      />
    </n-card>
    <n-card>
      <div
        ref="radarRef"
        class="h-400px"
      />
    </n-card>
  </n-space>
</template>

<style scoped></style>
