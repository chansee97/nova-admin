<script setup lang="tsx">
import type { DataTableColumns, FormInst } from 'naive-ui'
import CopyText from '@/components/custom/CopyText.vue'
import { Gender } from '@/constants'
import { useBoolean } from '@/hooks'
import { fetchUserPage } from '@/service'
import { NButton, NPopconfirm, NSpace, NSwitch, NTag } from 'naive-ui'
import TableModal from './components/TableModal.vue'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const initialModel = {
  condition_1: '',
  condition_2: '',
}
const model = ref({ ...initialModel })
function handleResetSearch() {
  model.value = { ...initialModel }
}

const formRef = ref<FormInst | null>()
const modalRef = ref()

function delteteUser(id: number) {
  window.$message.success(`删除用户id:${id}`)
}

const columns: DataTableColumns<Entity.User> = [
  {
    title: '姓名',
    align: 'center',
    key: 'userName',
  },
  {
    title: '性别',
    align: 'center',
    key: 'gender',
    render: (row) => {
      const tagType = {
        0: 'primary',
        1: 'success',
      } as const
      if (row.gender) {
        return (
          <NTag type={tagType[row.gender]}>
            {Gender[row.gender]}
          </NTag>
        )
      }
    },
  },
  {
    title: '邮箱',
    align: 'center',
    key: 'email',
  },
  {
    title: '联系方式',
    align: 'center',
    key: 'tel',
    render: (row) => {
      return (
        <CopyText value={row.tel} />
      )
    },
  },
  {
    title: '状态',
    align: 'center',
    key: 'status',
    render: (row) => {
      return (
        <NSwitch
          value={row.status}
          checked-value={1}
          unchecked-value={0}
          onUpdateValue={(value: 0 | 1) =>
            handleUpdateDisabled(value, row.id!)}
        >
          {{ checked: () => '启用', unchecked: () => '禁用' }}
        </NSwitch>
      )
    },
  },
  {
    title: '操作',
    align: 'center',
    key: 'actions',
    render: (row) => {
      return (
        <NSpace justify="center">
          <NButton
            size="small"
            onClick={() => modalRef.value.openModal('edit', row)}
          >
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => delteteUser(row.id!)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size="small" type="error">删除</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      )
    },
  },
]

const count = ref(0)
const listData = ref<Entity.User[]>([])
function handleUpdateDisabled(value: 0 | 1, id: number) {
  const index = listData.value.findIndex(item => item.id === id)
  if (index > -1)
    listData.value[index].status = value
}

async function getUserList() {
  startLoading()
  await fetchUserPage().then((res: any) => {
    listData.value = res.data.list
    count.value = res.data.count
    endLoading()
  })
}

onMounted(() => {
  getUserList()
})

function changePage(page: number, size: number) {
  window.$message.success(`分页器:${page},${size}`)
}

const treeData = ref([
  {
    id: '1',
    label: '安徽总公司',
    children: [
      {
        id: '2',
        label: '合肥分公司',
        children: [
          {
            id: '4',
            label: '财务部门',
          },
          {
            id: '5',
            label: '采购部门',
          },
        ],
      },
      {
        id: '3',
        label: '芜湖分公司',
      },
    ],
  },
])
</script>

<template>
  <n-flex>
    <n-card class="w-70">
      <n-tree
        block-line
        :data="treeData"
        key-field="id"
      />
    </n-card>

    <NSpace vertical class="flex-1">
      <n-card>
        <n-form ref="formRef" :model="model" label-placement="left" inline :show-feedback="false">
          <n-flex>
            <n-form-item label="姓名" path="condition_1">
              <n-input v-model:value="model.condition_1" placeholder="请输入" />
            </n-form-item>
            <n-form-item label="性别" path="condition_2">
              <n-input v-model:value="model.condition_2" placeholder="请输入" />
            </n-form-item>
            <n-flex class="ml-auto">
              <NButton type="primary" @click="getUserList">
                <template #icon>
                  <icon-park-outline-search />
                </template>
                搜索
              </NButton>
              <NButton strong secondary @click="handleResetSearch">
                <template #icon>
                  <icon-park-outline-redo />
                </template>
                重置
              </NButton>
            </n-flex>
          </n-flex>
        </n-form>
      </n-card>

      <n-card class="flex-1">
        <template #header>
          <NButton type="primary" @click="modalRef.openModal('add')">
            <template #icon>
              <icon-park-outline-add-one />
            </template>
            新建用户
          </NButton>
        </template>
        <NSpace vertical>
          <n-data-table :columns="columns" :data="listData" :loading="loading" />
          <Pagination :count="count" @change="changePage" />
        </NSpace>

        <TableModal ref="modalRef" modal-name="用户" />
      </n-card>
    </NSpace>
  </n-flex>
</template>
