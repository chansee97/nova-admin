import * as echarts from 'echarts/core';
import { nextTick, ref, onUnmounted, onMounted } from 'vue';
import type { Ref } from 'vue';

import { BarChart, LineChart } from 'echarts/charts';
// 系列类型的定义后缀都为 SeriesOption
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent, // 数据集组件
  TransformComponent, // 内置数据转换器组件 (filter, sort)
} from 'echarts/components';
// 组件类型的定义后缀都为 ComponentOption
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export function useEcharts(options: Ref<ECOption>) {
  const domRef = ref<HTMLElement>();

  let chart: echarts.ECharts | null = null;

  async function render() {
    if (domRef.value) {
      chart = echarts.init(domRef.value);
      update(options.value);
    }
  }
  function isRendered() {
    return Boolean(domRef.value && chart);
  }
  function destroy() {
    chart?.dispose();
    chart = null;
  }

  function update(updateOptions: ECOption) {
    if (isRendered()) {
      chart!.setOption({ ...updateOptions, backgroundColor: 'transparent' });
    }
  }

  onMounted(async () => {
    await nextTick();
    render();
  });
  onUnmounted(() => {
    destroy();
  });

  return {
    domRef,
  };
}
