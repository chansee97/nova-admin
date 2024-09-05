<script setup lang="ts">
import type { FormRules } from 'naive-ui'
import { useBoolean } from '@/hooks'

interface Props {
  modalName?: string
  dictCode?: string
  isRoot?: boolean
}

const {
  modalName = '',
  dictCode,
  isRoot = false,
} = defineProps<Props>()

const emit = defineEmits<{
  open: []
  close: []
}>()

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const { bool: submitLoading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const formDefault: Entity.Dict = {
  label: '',
  code: '',
}
const formModel = ref<Entity.Dict>({ ...formDefault })

type ModalType = 'add' | 'view' | 'edit'
const modalType = shallowRef<ModalType>('add')
const modalTitle = computed(() => {
  const titleMap: Record<ModalType, string> = {
    add: '添加',
    view: '查看',
    edit: '编辑',
  }
  return `${titleMap[modalType.value]}${modalName}`
})

async function openModal(type: ModalType = 'add', data?: any) {
  emit('open')
  modalType.value = type
  showModal()
  const handlers = {
    async add() {
      formModel.value = { ...formDefault }

      formModel.value.isRoot = isRoot ? 1 : 0
      if (dictCode) {
        formModel.value.code = dictCode
      }
    },
    async view() {
      if (!data)
        return
      formModel.value = { ...data }
    },
    async edit() {
      if (!data)
        return
      formModel.value = { ...data }
    },
  }
  await handlers[type]()
}

function closeModal() {
  hiddenModal()
  endLoading()
  emit('close')
}

defineExpose({
  openModal,
})

const formRef = ref()
async function submitModal() {
  const handlers = {
    async add() {
      return new Promise((resolve) => {
        setTimeout(() => {
          window.$message.success('模拟新增成功')
          resolve(true)
        }, 2000)
      })
    },
    async edit() {
      return new Promise((resolve) => {
        setTimeout(() => {
          window.$message.success('模拟编辑成功')
          resolve(true)
        }, 2000)
      })
    },
    async view() {
      return true
    },
  }
  await formRef.value?.validate()
  startLoading()
  await handlers[modalType.value]() && closeModal()
}

const rules: FormRules = {
  label: {
    required: true,
    message: '请输入字典名称',
    trigger: ['input', 'blur'],
  },
  code: {
    required: true,
    message: '请输入字典码',
    trigger: ['input', 'blur'],
  },
  value: {
    required: true,
    message: '请输入字典值',
    type: 'number',
    trigger: ['input', 'blur'],
  },
}
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    :mask-closable="false"
    preset="card"
    :title="modalTitle"
    class="w-700px"
    :segmented="{
      content: true,
      action: true,
    }"
  >
    <n-form ref="formRef" :rules="rules" label-placement="left" :model="formModel" :label-width="100" :disabled="modalType === 'view'">
      <n-form-item label="字典名称" path="label">
        <n-input v-model:value="formModel.label" />
      </n-form-item>
      <n-form-item label="字典码" path="code">
        <n-input v-model:value="formModel.code" :disabled="!isRoot" />
      </n-form-item>
      <n-form-item v-if="!isRoot" label="字典值" path="value">
        <n-input-number v-model:value="formModel.value" :min="0" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal">
          取消
        </n-button>
        <n-button type="primary" :loading="submitLoading" @click="submitModal">
          提交
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
