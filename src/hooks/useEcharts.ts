import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts'

// 系列类型的定义后缀都为 SeriesOption
import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
} from 'echarts/charts'

// 组件类型的定义后缀都为 ComponentOption
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import {
  DatasetComponent, // 数据集组件
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent, // 内置数据转换器组件 (filter, sort)
} from 'echarts/components'

import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { useElementSize } from '@vueuse/core'
import { useAppStore } from '@/store'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | PieSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DatasetComponentOption
  | ToolboxComponentOption
  | RadarSeriesOption
>

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PieChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  ToolboxComponent,
  RadarChart,
])

/**
 * Echarts hooks函数
 * @param options - 图表配置
 * @description 按需引入图表组件，没注册的组件需要先引入
 */
export function useEcharts(options: Ref<ECOption>) {
  const appStore = useAppStore()

  const domRef = ref<HTMLElement>()

  let chart: echarts.ECharts | null = null

  const initialSize = { width: 0, height: 0 }
  const { width, height } = useElementSize(domRef, initialSize)

  function canRender() {
    return initialSize.width > 0 && initialSize.height > 0
  }

  function isRendered() {
    return Boolean(domRef.value && chart)
  }
  async function render() {
    const chartTheme = appStore.darkMode ? 'dark' : 'light'
    await nextTick()
    if (domRef.value) {
      chart = echarts.init(domRef.value, chartTheme)
      update(options.value)
    }
  }

  function update(updateOptions: ECOption) {
    if (isRendered())
      chart!.setOption({ ...updateOptions, backgroundColor: 'transparent' })
  }

  function resize() {
    chart?.resize()
  }

  function destroy() {
    chart?.dispose()
    chart = null
  }
  const sizeWatch = watch([width, height], ([newWidth, newHeight]) => {
    initialSize.width = newWidth
    initialSize.height = newHeight
    if (newWidth === 0 && newHeight === 0) {
      // 节点被删除 将chart置为空
      chart = null
    }
    if (!canRender())
      return
    if (isRendered())
      resize()
    else render()
  })

  const OptionWatch = watch(options, (newValue) => {
    update(newValue)
  })

  onUnmounted(() => {
    sizeWatch()
    OptionWatch()
    destroy()
  })

  return {
    domRef,
  }
}
