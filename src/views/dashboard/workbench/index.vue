<template>
  <n-grid
    :x-gap="16"
    :y-gap="16"
  >
    <n-gi :span="24">
      <n-card>
        <n-space justify="space-between">
          <div class="flex-y-center">
            <n-avatar
              round
              :size="64"
              :src="userInfo?.avatar"
            />
            <div class="pl-12px">
              <h3 class="text-18px font-semibold">
                您好，{{ userInfo?.realName }},今天又是充满活力的一天！
              </h3>
              <p class="leading-30px text-[#999]">
                今日多云转晴，20℃ - 25℃！
              </p>
            </div>
          </div>
          <n-row class="w-450px">
            <n-col :span="10">
              <n-statistic
                label="统计数据"
                :value="99"
              >
                <template #prefix>
                  <i-icon-park-outline-chart-histogram />
                </template>
                <template #suffix>
                  / 100
                </template>
              </n-statistic>
            </n-col>
            <n-col :span="10">
              <n-statistic
                label="活跃用户"
                value="34,123"
              >
                <template #prefix>
                  <i-icon-park-outline-customer />
                </template>
              </n-statistic>
            </n-col>
            <n-col :span="4">
              <n-statistic
                label="待办"
                :value="18"
              >
                <template #prefix>
                  <i-icon-park-outline-list-checkbox />
                </template>
              </n-statistic>
            </n-col>
          </n-row>
        </n-space>
      </n-card>
    </n-gi>
    <n-gi :span="17">
      <n-space
        vertical
        :size="16"
      >
        <n-card title="项目">
          <template #header-extra>
            <n-button
              type="primary"
              quaternary
            >
              更多
            </n-button>
          </template>
          <n-grid
            :x-gap="8"
            :y-gap="8"
          >
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
                <template #action>
                  #action
                </template>
              </n-card>
            </n-gi>
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
                <template #action>
                  #action
                </template>
              </n-card>
            </n-gi>
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
                <template #action>
                  #action
                </template>
              </n-card>
            </n-gi>
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
                <template #action>
                  #action
                </template>
              </n-card>
            </n-gi>
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
                <template #action>
                  #action
                </template>
              </n-card>
            </n-gi>
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
                <template #action>
                  #action
                </template>
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
    <n-gi :span="7">
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
        <n-card title="快捷入口">
          <n-grid
            :x-gap="8"
            :y-gap="8"
          >
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
              </n-card>
            </n-gi>
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
              </n-card>
            </n-gi>
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
              </n-card>
            </n-gi>
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
              </n-card>
            </n-gi>
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
              </n-card>
            </n-gi>
            <n-gi :span="8">
              <n-card
                title="卡片"
                hoverable
              >
                卡片内容
              </n-card>
            </n-gi>
          </n-grid>
        </n-card>
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

<script setup lang="ts">
import { useAuthStore } from '@/store';

const { userInfo } = useAuthStore();
</script>

<style scoped></style>
