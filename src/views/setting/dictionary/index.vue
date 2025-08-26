<script setup lang="tsx">
import { useBoolean } from '@/hooks'
import { deleteDictData, deleteDictType, getDictDataByType, getDictTypeList } from '@/service'
import { createDictDataColumns, createDictTypeColumns } from './columns'
import DictModal from './components/DictModal.vue'

const { bool: dictLoading, setTrue: startDictLoading, setFalse: endDictLoading } = useBoolean(false)
const { bool: contentLoading, setTrue: startContentLoading, setFalse: endContentLoading } = useBoolean(false)

const dictRef = ref<InstanceType<typeof DictModal>>()
const dictContentRef = ref<InstanceType<typeof DictModal>>()

onMounted(() => {
  getDictList()
})

const dictData = ref<Entity.DictType[]>([])
const dictContentData = ref<Entity.DictData[]>([])

async function getDictList() {
  startDictLoading()
  try {
    const { data } = await getDictTypeList()
    dictData.value = data.list
  }
  catch (error) {
    console.error('获取字典类型列表失败', error)
  }
  finally {
    endDictLoading()
  }
}

const lastDictCode = ref('')
async function getDictContent(code: string) {
  startContentLoading()
  try {
    const { data } = await getDictDataByType(code)
    dictContentData.value = data
    lastDictCode.value = code
  }
  catch (error) {
    console.error('获取字典数据失败', error)
  }
  finally {
    endContentLoading()
  }
}

// 字典类型columns配置
const dictColumns = createDictTypeColumns({
  onView: getDictContent,
  onEdit: row => dictRef.value!.openModal('edit', row),
  onDelete: id => deleteDict(id, true),
})

// 字典数据columns配置
const contentColumns = createDictDataColumns({
  onEdit: row => dictContentRef.value!.openModal('edit', row),
  onDelete: id => deleteDict(id, false),
})

async function deleteDict(id: number, isType: boolean = false) {
  try {
    if (isType) {
      await deleteDictType(id)
      window.$message.success('删除字典类型成功')
      getDictList() // 重新加载字典类型列表
    }
    else {
      await deleteDictData(id)
      window.$message.success('删除字典数据成功')
      if (lastDictCode.value) {
        getDictContent(lastDictCode.value) // 重新加载字典数据
      }
    }
  }
  catch (error) {
    console.error(`删除${isType ? '字典类型' : '字典数据'}失败`, error)
  }
}
</script>

<template>
  <NFlex>
    <div class="basis-2/5">
      <n-card>
        <template #header>
          <NButton type="primary" @click="dictRef!.openModal('add')">
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
        <n-data-table
          :columns="dictColumns" :data="dictData" :loading="dictLoading" :pagination="false"
          :bordered="false"
        />
      </n-card>
    </div>
    <div class="flex-1">
      <n-card>
        <template #header>
          <NButton type="primary" :disabled="!lastDictCode" @click="dictContentRef!.openModal('add')">
            <template #icon>
              <icon-park-outline-add-one />
            </template>
            新建
          </NButton>
        </template>
        <template #header-extra>
          <NFlex>
            <NButton type="primary" :disabled="!lastDictCode" secondary @click="getDictContent(lastDictCode)">
              <template #icon>
                <icon-park-outline-refresh />
              </template>
              刷新
            </NButton>
          </NFlex>
        </template>
        <n-data-table
          :columns="contentColumns" :data="dictContentData" :loading="contentLoading" :pagination="false"
          :bordered="false"
        />
      </n-card>
    </div>

    <DictModal ref="dictRef" modal-name="字典项" is-root @success="getDictList" />
    <DictModal ref="dictContentRef" modal-name="字典值" :dict-code="lastDictCode" @success="() => getDictContent(lastDictCode)" />
  </NFlex>
</template>

<style scoped></style>
