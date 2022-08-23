<template>
  <n-space vertical size="large">
    <n-card>
      <n-grid :x-gap="12" :y-gap="8" :cols="23">
        <n-gi :span="5">
          <n-grid :cols="5">
            <n-grid-item :span="1" class="flex-center">条件1</n-grid-item>
            <n-grid-item :span="4"><n-input v-model:value="model.condition_1" placeholder="Input" /></n-grid-item>
          </n-grid>
        </n-gi>
        <n-gi :span="5">
          <n-grid :cols="5">
            <n-grid-item :span="1" class="flex-center">条件2</n-grid-item>
            <n-grid-item :span="4"><n-input v-model:value="model.condition_2" placeholder="Input" /></n-grid-item>
          </n-grid>
        </n-gi>
        <n-gi :span="5">
          <n-grid :cols="5">
            <n-grid-item :span="1" class="flex-center">条件3</n-grid-item>
            <n-grid-item :span="4"><n-input v-model:value="model.condition_3" placeholder="Input" /></n-grid-item>
          </n-grid>
        </n-gi>
        <n-gi :span="5">
          <n-grid :cols="5">
            <n-grid-item :span="1" class="flex-center">条件4</n-grid-item>
            <n-grid-item :span="4"><n-input v-model:value="model.condition_4" placeholder="Input" /></n-grid-item>
          </n-grid>
        </n-gi>
        <n-gi :span="3">
          <n-space justify="space-between">
            <n-button type="primary">
              <template #icon><i-icon-park-outline-search /></template>
              搜索
            </n-button>
            <n-button strong secondary>
              <template #icon><i-icon-park-outline-redo /></template>
              重置
            </n-button>
          </n-space>
        </n-gi>
      </n-grid>
    </n-card>
    <n-card>
      <div class="flex gap-4">
        <n-button type="primary">
          <template #icon><i-icon-park-outline-add-one /></template>
          新建
        </n-button>
        <n-button strong secondary>
          <template #icon><i-icon-park-outline-afferent /></template>
          批量导入
        </n-button>
        <n-button strong secondary class="ml-a">
          <template #icon><i-icon-park-outline-download /></template>
          下载
        </n-button>
      </div>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const model = ref({
  condition_1: '',
  condition_2: '',
  condition_3: '',
  condition_4: '',
});
</script>

<style scoped></style>
