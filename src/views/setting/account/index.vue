<script setup lang="tsx">
import type { FormInst } from 'naive-ui'
import { useBoolean } from '@/hooks'
import { deleteUser, getUserList, updateUser } from '@/service'
import { createUserColumns } from './columns'
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

async function delteteUser(id: number) {
  try {
    await deleteUser(id)
    window.$message.success('用户删除成功')
    getUserPageList() // 重新加载列表
  }
  catch {
  }
}

// 用户管理columns配置
const columns = createUserColumns({
  onEdit: row => modalRef.value?.openModal('edit', row),
  onDelete: delteteUser,
  onStatusChange: handleUpdateDisabled,
})

const count = ref(0)
const listData = ref<Entity.User[]>([])
async function handleUpdateDisabled(value: 0 | 1, id: number) {
  try {
    // 使用updateUser接口更新用户状态
    await updateUser(id, { userStatus: value })
    const index = listData.value.findIndex(item => item.userId === id)
    if (index > -1) {
      listData.value[index].userStatus = value
    }
    window.$message.success('用户状态更新成功')
  }
  catch {
  }
}

async function getUserPageList() {
  startLoading()
  try {
    const res = await getUserList({
      pageNum: 1,
      pageSize: 20,
      username: model.value.condition_1,
      gender: model.value.condition_2 as any,
    })
    listData.value = res.data.list
    count.value = res.data.total
  }
  finally {
    endLoading()
  }
}

onMounted(() => {
  getUserPageList()
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
              <NButton type="primary" @click="getUserPageList">
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

        <TableModal ref="modalRef" modal-name="用户" @success="getUserPageList" />
      </n-card>
    </NSpace>
  </n-flex>
</template>
