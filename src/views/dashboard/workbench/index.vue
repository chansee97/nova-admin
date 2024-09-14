<script setup lang="ts">
import { useAuthStore } from '@/store'
import Chart from './components/chart.vue'

const { userInfo } = useAuthStore()
</script>

<template>
  <n-grid
    :x-gap="16"
    :y-gap="16"
  >
    <n-gi :span="16">
      <n-space
        vertical
        :size="16"
      >
        <n-card style="--n-padding-left: 0;">
          <Chart />
        </n-card>
        <n-card>
          <n-grid
            :x-gap="8"
            :y-gap="8"
          >
            <n-gi :span="6">
              <n-card>
                <n-thing>
                  <template #avatar>
                    <n-el>
                      <n-icon-wrapper :size="46" color="var(--success-color)" :border-radius="999">
                        <nova-icon :size="26" icon="icon-park-outline:user" />
                      </n-icon-wrapper>
                    </n-el>
                  </template>
                  <template #header>
                    <n-statistic label="活跃用户">
                      <n-number-animation show-separator :from="0" :to="12039" />
                    </n-statistic>
                  </template>
                </n-thing>
              </n-card>
            </n-gi>
            <n-gi :span="6">
              <n-card>
                <n-thing>
                  <template #avatar>
                    <n-el>
                      <n-icon-wrapper :size="46" color="var(--success-color)" :border-radius="999">
                        <nova-icon :size="26" icon="icon-park-outline:every-user" />
                      </n-icon-wrapper>
                    </n-el>
                  </template>
                  <template #header>
                    <n-statistic label="用户">
                      <n-number-animation show-separator :from="0" :to="44039" />
                    </n-statistic>
                  </template>
                </n-thing>
              </n-card>
            </n-gi>
            <n-gi :span="6">
              <n-card>
                <n-thing>
                  <template #avatar>
                    <n-el>
                      <n-icon-wrapper :size="46" color="var(--success-color)" :border-radius="999">
                        <nova-icon :size="26" icon="icon-park-outline:preview-open" />
                      </n-icon-wrapper>
                    </n-el>
                  </template>
                  <template #header>
                    <n-statistic label="浏览量">
                      <n-number-animation show-separator :from="0" :to="551039" />
                    </n-statistic>
                  </template>
                </n-thing>
              </n-card>
            </n-gi>
            <n-gi :span="6">
              <n-card>
                <n-thing>
                  <template #avatar>
                    <n-el>
                      <n-icon-wrapper :size="46" color="var(--success-color)" :border-radius="999">
                        <nova-icon :size="26" icon="icon-park-outline:star" />
                      </n-icon-wrapper>
                    </n-el>
                  </template>
                  <template #header>
                    <n-statistic label="收藏数">
                      <n-number-animation show-separator :from="0" :to="7739" />
                    </n-statistic>
                  </template>
                </n-thing>
              </n-card>
            </n-gi>
          </n-grid>
        </n-card>
        <n-card title="动态">
          <template #header-extra>
            <n-button
              type="primary"
              quaternary
            >
              更多
            </n-button>
          </template>
          <n-list hoverable>
            <n-list-item>
              <template #prefix>
                <n-avatar
                  round
                  :size="48"
                  :src="userInfo?.avatar"
                />
              </template>
              <n-thing
                title="客怎车"
                title-extra="09/29/2022"
                description="是“我的客厅怎么会有车”的缩写，指那些在车道间肆意穿梭，把马路当客厅的人，多有嘲讽意味，主要用于车祸视频中。"
              />
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-avatar
                  round
                  :size="48"
                  :src="userInfo?.avatar"
                />
              </template>
              <n-thing
                title="街健五大神技"
                title-extra="09/29/2022"
                description="街头健身五大神技，包括1.单手引体向上。2.慢速双力臂。3.人旗。4.前水平。5.俄式挺身。"
              />
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-avatar
                  round
                  :size="48"
                  :src="userInfo?.avatar"
                />
              </template>
              <n-thing
                title="天下岂有七十年太子乎"
                title-extra="09/29/2022"
                description="★含义：用来调侃由于英国女王超长的在位时间，导致其长子查理斯王子成为史上等待王位时间最久的王储 "
              />
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-avatar
                  round
                  :size="48"
                  :src="userInfo?.avatar"
                />
              </template>
              <n-thing
                title="你干嘛～哈哈～哎哟～"
                title-extra="09/29/2022"
                description="出自著名偶像练习生、练习时长两年半、背带异常梳中分的蔡徐坤在2018年的一档综艺节目偶像练习生中出现的一幕"
              />
            </n-list-item>
          </n-list>
        </n-card>
      </n-space>
    </n-gi>
    <n-gi :span="8">
      <n-space
        vertical
        :size="16"
      >
        <n-card title="公告">
          <template #header-extra>
            <n-button
              type="primary"
              quaternary
            >
              更多
            </n-button>
          </template>
          <n-list>
            <n-list-item>
              <template #prefix>
                <n-tag
                  :bordered="false"
                  type="info"
                  size="small"
                >
                  通知
                </n-tag>
              </template>
              <n-button text>
                漂洋过海上大专
              </n-button>
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-tag
                  :bordered="false"
                  type="success"
                  size="small"
                >
                  消息
                </n-tag>
              </template>
              <n-button text>
                你在玩很新的东西
              </n-button>
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-tag
                  :bordered="false"
                  type="warning"
                  size="small"
                >
                  活动
                </n-tag>
              </template>
              <n-button text>
                上岸第一剑，先斩意中人
              </n-button>
            </n-list-item>
          </n-list>
        </n-card>
        <n-grid
          :x-gap="8"
          :y-gap="8"
        >
          <n-gi :span="12">
            <n-card>
              <n-flex vertical align="center">
                <n-text depth="3">
                  订单数
                </n-text>
                <n-icon-wrapper :size="46" :border-radius="999">
                  <nova-icon :size="26" icon="icon-park-outline:all-application" />
                </n-icon-wrapper>
                <n-text strong class="text-2xl">
                  1,234,123
                </n-text>
              </n-flex>
            </n-card>
          </n-gi>
          <n-gi :span="12">
            <n-card>
              <n-flex vertical align="center">
                <n-text depth="3">
                  待办
                </n-text>
                <n-el>
                  <n-icon-wrapper :size="46" color="var(--warning-color)" :border-radius="999">
                    <nova-icon :size="26" icon="icon-park-outline:list-bottom" />
                  </n-icon-wrapper>
                </n-el>
                <n-text strong class="text-2xl">
                  78
                </n-text>
              </n-flex>
            </n-card>
          </n-gi>
        </n-grid>
        <n-card title="任务进度">
          <n-timeline>
            <n-timeline-item content="啊" />
            <n-timeline-item
              type="success"
              title="成功"
              content="哪里成功"
              time="2018-04-03 20:46"
            />
            <n-timeline-item
              type="error"
              content="哪里错误"
              time="2018-04-03 20:46"
            />
            <n-timeline-item
              type="warning"
              title="警告"
              content="哪里警告"
              time="2018-04-03 20:46"
            />
            <n-timeline-item
              type="info"
              title="信息"
              content="是的"
              time="2018-04-03 20:46"
              line-type="dashed"
            />
            <n-timeline-item content="啊" />
          </n-timeline>
        </n-card>
      </n-space>
    </n-gi>
  </n-grid>
</template>

<style scoped></style>
