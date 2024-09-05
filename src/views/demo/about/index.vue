<script setup lang="ts">
import lib from '@/../package.json'
</script>

<template>
  <n-space vertical>
    <n-card title="关于">
      Nova-admin是一款基于Vue3+vite+TypeScript+NaiveUI的后台管理模板，力求使用简约的代码实现完备功能，降低学习门槛和维护成本，让大家能早点下班做自己的事情
    </n-card>
    <n-card title="信息">
      <n-descriptions
        label-placement="left"
        bordered
        :column="2"
      >
        <n-descriptions-item label="Github">
          <n-button
            text
            tag="a"
            href="https://github.com/chansee97/nova-admin"
            target="_blank"
            type="primary"
          >
            Github
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="Github">
          <n-button
            text
            tag="a"
            href="https://gitee.com/chansee97/nova-admin"
            target="_blank"
            type="primary"
          >
            Gitee
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="预览地址">
          <n-button
            text
            tag="a"
            href="https://admin-nova.vercel.app/"
            target="_blank"
            type="primary"
          >
            预览地址
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="版本">
          <n-tag :bordered="false">
            {{ lib.version }}
          </n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card title="生产环境依赖">
      <n-descriptions
        label-placement="left"
        bordered
        :column="4"
      >
        <n-descriptions-item
          v-for="(item, key, index) in lib.dependencies"
          :key="index"
          :label="key"
        >
          {{ item }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card title="开发环境依赖">
      <n-descriptions
        label-placement="left"
        bordered
        :column="4"
      >
        <n-descriptions-item
          v-for="(item, key, index) in lib.devDependencies"
          :key="index"
          :label="key"
        >
          {{ item }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-space>
</template>

<style scoped></style>
