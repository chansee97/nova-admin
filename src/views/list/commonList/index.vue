<template>
  <n-space vertical size="large">
    <n-card>
      <n-grid :x-gap="24" :cols="23">
        <n-gi :span="5">
          <n-grid :cols="5">
            <n-grid-item :span="1" class="flex-center justify-start">姓名</n-grid-item>
            <n-grid-item :span="4"><n-input v-model:value="model.condition_1" placeholder="Input" /></n-grid-item>
          </n-grid>
        </n-gi>
        <n-gi :span="5">
          <n-grid :cols="5">
            <n-grid-item :span="1" class="flex-center">年龄</n-grid-item>
            <n-grid-item :span="4"><n-input v-model:value="model.condition_2" placeholder="Input" /></n-grid-item>
          </n-grid>
        </n-gi>
        <n-gi :span="5">
          <n-grid :cols="5">
            <n-grid-item :span="1" class="flex-center">性别</n-grid-item>
            <n-grid-item :span="4"><n-input v-model:value="model.condition_3" placeholder="Input" /></n-grid-item>
          </n-grid>
        </n-gi>
        <n-gi :span="5">
          <n-grid :cols="5">
            <n-grid-item :span="1" class="flex-center">地址</n-grid-item>
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
        <n-data-table :columns="columns" :data="listData" :loading="loading" />
        <Pagination :count="100" @change="changePage" />
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="tsx">
import { onMounted, ref, h } from 'vue';
import { fetchUserList } from '~/src/service/api/mock';
import type { DataTableColumns } from 'naive-ui';
import { NButton, NPopconfirm, NSpace, NSwitch, NTag } from 'naive-ui';
import { useLoading } from '@/hook';

const { loading, startLoading, endLoading } = useLoading(false);
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
      const rowData = row as unknown as UserList;
      return (
        <NSwitch value={rowData.disabled} onUpdateValue={(disabled) => handleUpdateDisabled(disabled, rowData.id)}>
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
      const rowData = row as unknown as UserList;
      return (
        <NSpace justify={'center'}>
          <NButton size={'small'} onClick={() => sendMail(rowData.id)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => sendMail(rowData.id)}>
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
const sendMail = (id: number) => {
  window.$message.success(`用户id:${id}`);
};
function handleUpdateDisabled(disabled: boolean, id: number) {
  const index = listData.value.findIndex((item) => item.id === id);
  if (index > -1) {
    listData.value[index].disabled = disabled;
  }
}
interface UserList {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  address: string;
  role: string;
  disabled: boolean;
}
const listData = ref<UserList[]>([]);

onMounted(() => {
  getUserList();
});
async function getUserList() {
  startLoading();
  await fetchUserList().then((res) => {
    listData.value = res.data;
    endLoading();
  });
}
function changePage(page: number, size: number) {
  window.$message.success(`分页器:${page},${size}`);
}
</script>

<style scoped></style>
