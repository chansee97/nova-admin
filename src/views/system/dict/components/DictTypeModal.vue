<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createDictType, getDictTypeById, updateDictType } from '@/api'
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

const modalForm = createProModalForm<Partial<Entity.DictType>>({
  omitEmptyString: false,
  initialValues: {
    name: '',
    type: '',
    remark: '',
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

async function openModal(type: ModalType = 'add', data?: Partial<Entity.DictType>) {
  modalType.value = type
  modalForm.open()
  const handlers = {
    async add() {
      // 使用默认值
    },
    async edit() {
      if (!data)
        return

      const { data: dictType } = await getDictTypeById(data.id!)
      modalForm.values.value = dictType
    },
  }
  await handlers[type]()
}

async function submitModal(filedValues: Partial<Entity.DictType>) {
  const handlers = {
    async add() {
      try {
        await createDictType(filedValues)
        window.$message.success('字典类型创建成功')
        return true
      }
      catch (error) {
        console.error('创建字典类型失败', error)
        return false
      }
    },
    async edit() {
      try {
        await updateDictType(modalForm.values.value.id!, filedValues)
        window.$message.success('字典类型更新成功')
        return true
      }
      catch (error) {
        console.error('更新字典类型失败', error)
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
    width="600px"
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
        title="字典类型"
        path="type"
        placeholder="请输入字典类型"
        :readonly="modalType === 'edit'"
      />
      <pro-textarea
        class="col-span-2"
        title="备注"
        path="remark"
        placeholder="请输入备注信息"
      />
      <pro-switch
        title="状态"
        path="status"
        :field-props="{ checkedValue: 1, uncheckedValue: 0 }"
      />
    </div>
  </pro-modal-form>
</template>
