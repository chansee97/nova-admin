<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createDictData, getDictDataById, updateDictData } from '@/api'
import { createProModalForm } from 'pro-naive-ui'

interface Props {
  modalName?: string
}

const {
  modalName = '',
} = defineProps<Props>()

const emit = defineEmits<{
  success: []
}>()

const { bool: submitLoading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const modalForm = createProModalForm<Partial<Entity.DictData>>({
  omitEmptyString: false,
  initialValues: {
    sort: 0,
    status: 1,
  },
  onSubmit: submitModal,
})

type ModalType = 'add' | 'edit'
const modalType = shallowRef<ModalType>('add')
const modalTitle = computed(() => {
  const titleMap: Record<ModalType, string> = {
    add: '添加',
    edit: '编辑',
  }
  return `${titleMap[modalType.value]}${modalName}`
})

async function openModal(type: ModalType = 'add', data?: Partial<Entity.DictData>) {
  modalType.value = type
  modalForm.open()
  const handlers = {
    async add() {
      if (data?.dictType) {
        modalForm.values.value.dictType = data.dictType
      }
    },
    async edit() {
      if (!data)
        return

      const { data: dictData } = await getDictDataById(data.id!)
      modalForm.values.value = dictData
    },
  }
  await handlers[type]()
}

async function submitModal(filedValues: Partial<Entity.DictData>) {
  const handlers = {
    async add() {
      try {
        await createDictData(filedValues)
        window.$message.success('字典数据创建成功')
        return true
      }
      catch (error) {
        console.error('创建字典数据失败', error)
        return false
      }
    },
    async edit() {
      try {
        await updateDictData(modalForm.values.value.id!, filedValues)
        window.$message.success('字典数据更新成功')
        return true
      }
      catch (error) {
        console.error('更新字典数据失败', error)
        return false
      }
    },
  }
  startLoading()
  const success = await handlers[modalType.value]()
  endLoading()

  if (success) {
    emit('success')
    modalForm.close()
  }
}

defineExpose({
  openModal,
})
</script>

<template>
  <pro-modal-form
    :title="modalTitle"
    :form="modalForm"
    :loading="submitLoading"
    width="700px"
  >
    <div class="grid grid-cols-2 gap-4">
      <pro-input
        required
        title="字典名称"
        path="name"
        placeholder="请输入字典名称"
      />
      <pro-input
        required
        title="字典键值"
        path="value"
        placeholder="请输入字典键值"
      />
      <pro-input
        title="字典类型"
        path="dictType"
        placeholder="字典类型"
        :readonly="true"
      />
      <pro-digit
        title="排序"
        path="sort"
        :field-props="{ min: 0, max: 999 }"
      />
      <pro-switch
        title="状态"
        path="status"
        :field-props="{ checkedValue: 0, uncheckedValue: 1 }"
      />
      <pro-textarea
        class="col-span-2"
        title="备注"
        path="remark"
        placeholder="请输入备注信息"
      />
    </div>
  </pro-modal-form>
</template>
