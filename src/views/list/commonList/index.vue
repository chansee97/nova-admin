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
          <n-space justify="end">
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
      <n-space vertical size="large">
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
        <n-data-table :bordered="false" :columns="columns" :data="listData" :pagination="pagination" />
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="tsx">
import { onMounted, ref, h } from 'vue';
import { fetchUserList } from '~/src/service/api/mock';
import type { DataTableColumns, PaginationProps } from 'naive-ui';
import { NButton, NPopconfirm, NSpace, NSwitch, NTag } from 'naive-ui';

const model = ref({
  condition_1: '',
  condition_2: '',
  condition_3: '',
  condition_4: '',
});

const columns: DataTableColumns = [
  {
    title: '姓名',
    align: 'center',
    key: 'name',
  },
  {
    title: '年龄',
    align: 'center',
    key: 'age',
  },
  {
    title: '性别',
    align: 'center',
    key: 'gender',
  },
  {
    title: '邮箱',
    align: 'center',
    key: 'email',
  },
  {
    title: '地址',
    align: 'center',
    key: 'address',
  },
  {
    title: '角色',
    align: 'center',
    key: 'role',
  },
  {
    title: '状态',
    align: 'center',
    key: 'disabled',
    render: (row) => {
      return (
        <NSwitch value={row.disabled} onUpdateValue={(disabled) => handleUpdateDisabled(disabled, row.id)}>
          {{ checked: () => '启用', unchecked: () => '禁用' }}
        </NSwitch>
      );
    },
  },
  {
    title: '操作',
    align: 'center',
    key: 'actions',
    render: (row) => {
      // const rowData = row as unknown as UserManagement.UserTable;
      return (
        <NSpace justify={'center'}>
          <NButton size={'small'} onClick={() => sendMail(row.id)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => sendMail(row.id)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size={'small'}>删除</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      );
    },
  },
];
const sendMail = (id) => {
  console.log('%c 🚀 ~ [row]-122', 'font-size:13px; background:pink; color:#bf2c9f;', id);
};
const handleUpdateDisabled = (disabled, id) => {
  const index = listData.value.findIndex((item) => item.id === id);
  if (index > -1) {
    listData.value[index].disabled = disabled;
  }
};
const listData = ref();
const pagination = {};

onMounted(() => {
  fetchUserList().then((res) => {
    listData.value = res.data;
  });
});
</script>

<style scoped></style>
