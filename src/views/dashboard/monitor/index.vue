<script setup lang="ts">
import Chart from './components/chart.vue'
import Chart2 from './components/chart2.vue'
import Chart3 from './components/chart3.vue'

const tableData = [
  {
    id: 0,
    name: '商品名称1',
    start: '2022-02-02',
    end: '2022-02-02',
    prograss: '100',
    status: '已完成',
  },
  {
    id: 0,
    name: '商品名称2',
    start: '2022-02-02',
    end: '2022-02-02',
    prograss: '50',
    status: '交易中',
  },
  {
    id: 0,
    name: '商品名称3',
    start: '2022-02-02',
    end: '2022-02-02',
    prograss: '100',
    status: '已完成',
  },
]
</script>

<template>
  <div>
    <n-grid
      :x-gap="16"
      :y-gap="16"
    >
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic label="访问量">
              <n-number-animation
                :from="0"
                :to="12039"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#de4307"
              size="42"
            >
              <icon-park-outline-chart-histogram />
            </n-icon>
          </n-space>
          <template #footer>
            <n-space justify="space-between">
              <span>累计访问数</span>
              <span><n-number-animation
                :from="0"
                :to="322039"
                show-separator
              /></span>
            </n-space>
          </template>
        </n-card>
      </n-gi>
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic label="下载量">
              <n-number-animation
                :from="0"
                :to="12039"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#ffb549"
              size="42"
            >
              <icon-park-outline-chart-graph />
            </n-icon>
          </n-space>
          <template #footer>
            <n-space justify="space-between">
              <span>累计下载量</span>
              <span><n-number-animation
                :from="0"
                :to="322039"
                show-separator
              /></span>
            </n-space>
          </template>
        </n-card>
      </n-gi>
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic label="浏览量">
              <n-number-animation
                :from="0"
                :to="12039"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#1687a7"
              size="42"
            >
              <icon-park-outline-average />
            </n-icon>
          </n-space>
          <template #footer>
            <n-space justify="space-between">
              <span>累计浏览量</span>
              <span><n-number-animation
                :from="0"
                :to="322039"
                show-separator
              /></span>
            </n-space>
          </template>
        </n-card>
      </n-gi>
      <n-gi :span="6">
        <n-card>
          <n-space
            justify="space-between"
            align="center"
          >
            <n-statistic label="注册量">
              <n-number-animation
                :from="0"
                :to="12039"
                show-separator
              />
            </n-statistic>
            <n-icon
              color="#42218E"
              size="42"
            >
              <icon-park-outline-chart-pie />
            </n-icon>
          </n-space>
          <template #footer>
            <n-space justify="space-between">
              <span>累计注册量</span>
              <span><n-number-animation
                :from="0"
                :to="322039"
                show-separator
              /></span>
            </n-space>
          </template>
        </n-card>
      </n-gi>
      <n-gi :span="24">
        <n-card content-style="padding: 0;">
          <n-tabs
            type="line"
            size="large"
            :tabs-padding="20"
            pane-style="padding: 20px;"
          >
            <n-tab-pane name="流量趋势">
              <Chart />
            </n-tab-pane>
            <n-tab-pane name="访问量趋势">
              <Chart2 />
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-gi>
      <n-gi :span="8">
        <n-card
          title="访问来源"
          :segmented="{
            content: true,
          }"
        >
          <Chart3 />
        </n-card>
      </n-gi>
      <n-gi :span="16">
        <n-card
          title="成交记录"
          :segmented="{
            content: true,
          }"
        >
          <template #header-extra>
            <n-button
              type="primary"
              quaternary
            >
              更多
            </n-button>
          </template>
          <n-table
            :bordered="false"
            :single-line="false"
          >
            <thead>
              <tr>
                <th>交易名称</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>进度</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in tableData"
                :key="item.id"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.start }}</td>
                <td>{{ item.end }}</td>
                <td>{{ item.prograss }}%</td>
                <td>
                  <n-tag
                    :bordered="false"
                    type="info"
                  >
                    {{ item.status }}
                  </n-tag>
                </td>
              </tr>
            </tbody>
          </n-table>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped></style>
