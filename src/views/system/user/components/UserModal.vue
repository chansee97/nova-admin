<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createUser, getRoleOptions, getUserById, updateUser } from '@/api'
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

const modalForm = createProModalForm<Partial<Entity.User> & { roleIds?: number[] }>({
  omitEmptyString: false,
  initialValues: {
    gender: 'unknown',
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
const roleOptions = ref<Entity.TreeNode[]>([])

async function openModal(type: ModalType = 'add', data?: Partial<Entity.User>) {
  modalType.value = type
  getRoleOptions().then((res) => {
    roleOptions.value = res.data
  })
  modalForm.open()
  const handlers = {
    async add() {
    },
    async edit() {
      if (!data)
        return

      const { data: user } = await getUserById(data.id!)
      modalForm.values.value = user
      modalForm.values.value.roleIds = user.roles.map(role => role.id)
    },
  }
  await handlers[type]()
}

async function submitModal(filedValues: Partial<Entity.User>) {
  const handlers = {
    async add() {
      try {
        await createUser(filedValues)
        window.$message.success('用户创建成功')
        return true
      }
      catch (error) {
        console.error('创建用户失败', error)
        return false
      }
    },
    async edit() {
      try {
        await updateUser(modalForm.values.value.id!, filedValues)
        window.$message.success('用户更新成功')
        return true
      }
      catch (error) {
        console.error('更新用户失败', error)
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
        title="用户名"
        path="username"
        :readonly="modalType === 'edit'"
      />
      <pro-input
        v-if="modalType === 'add'"
        required
        title="密码"
        path="password"
      />
      <pro-input
        title="昵称"
        path="nickName"
      />
      <pro-radio-group
        title="性别"
        path="gender"
        :field-props="{
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ],
        }"
      />
      <pro-digit
        title="部门ID"
        path="deptId"
      />
      <pro-input
        title="邮箱"
        path="email"
        placeholder="example@domain.com"
        :rule="[
          {
            pattern: new RegExp(Regex.Email),
            message: '请输入正确的邮箱格式',
            trigger: 'blur',
          },
        ]"
      />
      <pro-input
        title="手机号"
        path="phone"
        max-length="11"
      />
      <pro-select
        title="角色"
        path="roleIds"
        :field-props="{ multiple: true, options: roleOptions }"
      />
      <pro-switch
        title="用户状态"
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
