<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NFlex, NPopconfirm } from 'naive-ui'
import TableModal from './components/TableModal.vue'
import { fetchDictContent, fetchDictList } from '@/service'
import { useBoolean } from '@/hooks'

const { bool: dictLoading, setTrue: startDictLoading, setFalse: endDictLoading } = useBoolean(false)
const { bool: contentLoading, setTrue: startContentLoading, setFalse: endContentLoading } = useBoolean(false)

const modalRef = ref<InstanceType<typeof TableModal>>()

onMounted(() => {
  getDictList()
})

const dictData = ref<Entity.Dict[]>([])
const dictContentData = ref<Entity.Dict[]>([])

async function getDictList() {
  startDictLoading()
  const { data, isSuccess } = await fetchDictList()
  if (isSuccess) {
    dictData.value = data
  }
  endDictLoading()
}

let lastDictId: number
async function getDictContent(id: number) {
  startContentLoading()
  const { data, isSuccess } = await fetchDictContent(id)
  if (isSuccess) {
    lastDictId = id
    dictContentData.value = data
  }
  endContentLoading()
}

const dictColumns: DataTableColumns<Entity.Dict> = [
  {
    title: '字典名称',
    key: 'dictLabel',
  },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    render: (row) => {
      return (
        <NFlex justify="center">
          <NButton
            size="small"
            onClick={() => getDictContent(row.id!)}
          >
            查看字典
          </NButton>
          <NButton
            size="small"
            onClick={() => modalRef.value!.openModal('edit', row)}
          >
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => deleteDict(row.id!)}>
            {{
              default: () => (
                <span>
                  确认删除字典
                  <b>{row.dictLabel}</b>
                  {' '}
                  ？
                </span>
              ),
              trigger: () => <NButton size="small" type="error">删除</NButton>,
            }}
          </NPopconfirm>
        </NFlex>
      )
    },
  },
]

const contentColumns: DataTableColumns<Entity.Dict> = [
  {
    title: '字典名称',
    key: 'dictLabel',
  },
  {
    title: '字典值',
    key: 'dictValue',
  },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    width: '15em',
    render: (row) => {
      return (
        <NFlex justify="center">
          <NButton
            size="small"
            onClick={() => modalRef.value!.openModal('edit', row)}
          >
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => deleteDict(row.id!)}>
            {{
              default: () => (
                <span>
                  确认删除字典值
                  <b>{row.dictLabel}</b>
                  {' '}
                  ？
                </span>
              ),
              trigger: () => <NButton size="small" type="error">删除</NButton>,
            }}
          </NPopconfirm>
        </NFlex>
      )
    },
  },
]

function deleteDict(id: number) {
  window.$message.error(`删除字典${id}`)
}
</script>

<template>
  <NFlex>
    <div class="basis-1/3">
      <n-card>
        <template #header>
          <NButton type="primary">
            <template #icon>
              <icon-park-outline-add-one />
            </template>
            新建
          </NButton>
        </template>
        <template #header-extra>
          <NFlex>
            <NButton type="primary" secondary @click="getDictList">
              <template #icon>
                <icon-park-outline-refresh />
              </template>
              刷新
            </NButton>
          </NFlex>
        </template>
        <n-data-table :columns="dictColumns" :data="dictData" :loading="dictLoading" :pagination="false" :bordered="false" />
      </n-card>
    </div>
    <div class="flex-1">
      <n-card>
        <template #header>
          <NButton type="primary">
            <template #icon>
              <icon-park-outline-add-one />
            </template>
            新建
          </NButton>
        </template>
        <template #header-extra>
          <NFlex>
            <NButton type="primary" secondary @click="getDictContent(lastDictId)">
              <template #icon>
                <icon-park-outline-refresh />
              </template>
              刷新
            </NButton>
          </NFlex>
        </template>
        <n-data-table :columns="contentColumns" :data="dictContentData" :loading="contentLoading" :pagination="false" :bordered="false" />
      </n-card>
    </div>

    <TableModal ref="modalRef" modal-name="字典" />
  </NFlex>
</template>

<style scoped></style>
