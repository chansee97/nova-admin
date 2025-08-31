<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createRole, getRoleById, updateRole } from '@/api'
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

const modalForm = createProModalForm<Partial<Entity.Role>>({
  omitEmptyString: false,
  initialValues: {
    status: 0,
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

async function openModal(type: ModalType = 'add', data?: Partial<Entity.Role>) {
  modalType.value = type

  modalForm.open()
  const handlers = {
    async add() {
      // 使用默认值
    },
    async edit() {
      if (!data)
        return

      const { data: role } = await getRoleById(data.id!)
      modalForm.values.value = role
    },
  }
  await handlers[type]()
}

async function submitModal(filedValues: Partial<Entity.Role>) {
  const handlers = {
    async add() {
      try {
        await createRole(filedValues)
        window.$message.success('角色创建成功')
        return true
      }
      catch (error) {
        console.error('创建角色失败', error)
        return false
      }
    },
    async edit() {
      try {
        await updateRole(modalForm.values.value.id!, filedValues)
        window.$message.success('角色更新成功')
        return true
      }
      catch (error) {
        console.error('更新角色失败', error)
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
        title="角色名称"
        path="roleName"
      />
      <pro-input
        required
        title="权限标识"
        path="roleKey"
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
      />
    </div>
  </pro-modal-form>
</template>
