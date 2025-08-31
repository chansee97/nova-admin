<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createDept, getDeptById, getDeptOptions, updateDept } from '@/api'
import { createProModalForm } from 'pro-naive-ui'
import { Regex } from '@/constants'

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

// 部门选项
const deptOptions = ref<Entity.Dept[]>([])

const modalForm = createProModalForm<Partial<Entity.Dept>>({
  omitEmptyString: false,
  initialValues: {
    sort: 0,
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

// 加载部门选项
async function loadDeptOptions() {
  try {
    const { data } = await getDeptOptions()
    deptOptions.value = data
  }
  catch {
    console.error('加载部门选项失败')
  }
}

async function openModal(type: ModalType = 'add', data?: Partial<Entity.Dept>) {
  modalType.value = type
  modalForm.open()
  loadDeptOptions()

  const handlers = {
    async add() {
      if (data?.id) {
        modalForm.values.value.parentId = data.id
      }
    },
    async edit() {
      if (!data?.id)
        return

      try {
        const { data: dept } = await getDeptById(data.id)
        modalForm.values.value = dept
      }
      catch {
        window.$message.error('获取部门信息失败')
      }
    },
  }
  await handlers[type]()
}

async function submitModal(fieldValues: Partial<Entity.Dept>) {
  const handlers = {
    async add() {
      try {
        await createDept(fieldValues)
        window.$message.success('部门创建成功')
        return true
      }
      catch (error) {
        console.error('创建部门失败', error)
        return false
      }
    },
    async edit() {
      try {
        await updateDept(modalForm.values.value.id!, fieldValues)
        window.$message.success('部门更新成功')
        return true
      }
      catch (error) {
        console.error('更新部门失败', error)
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
    <div class="grid grid-cols-2">
      <pro-input
        required
        title="部门名称"
        path="deptName"
      />
      <pro-tree-select
        title="上级部门"
        path="parentId"
        :field-props="{
          options: deptOptions,
          clearable: true,
          keyField: 'value',
        }"
      />
      <pro-digit
        title="显示排序"
        path="sort"
        :field-props="{ min: 0, max: 999 }"
      />
      <pro-input
        title="负责人"
        path="leader"
      />
      <pro-input
        title="联系电话"
        path="phone"
        :field-props="{ maxlength: 11 }"
      />
      <pro-input
        title="邮箱"
        path="email"
        :rule="[
          {
            pattern: new RegExp(Regex.Email),
            message: '请输入正确的邮箱格式',
            trigger: 'blur',
          },
        ]"
      />
      <pro-switch
        title="部门状态"
        path="status"
        :field-props="{ checkedValue: 0, uncheckedValue: 1 }"
      />
      <div />
      <pro-textarea
        class="col-span-2"
        title="备注"
        path="remark"
      />
    </div>
  </pro-modal-form>
</template>
