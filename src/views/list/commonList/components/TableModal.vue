<script setup lang="ts">
type FormModel = Pick<Entity.DemoList, 'name' | 'age' | 'gender' | 'address' | 'email' | 'role' | 'disabled'>
const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  modalData: null,
})
const emit = defineEmits<Emits>()
const defaultFormModal: FormModel = {
  name: '',
  age: 0,
  gender: null,
  email: '',
  address: '',
  role: 'user',
  disabled: true,
}
const formModel = ref({ ...defaultFormModal })

interface Props {
  visible: boolean
  type?: ModalType
  modalData?: any
}
interface Emits {
  (e: 'update:visible', visible: boolean): void
}

const modalVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    closeModal(visible)
  },
})
function closeModal(visible = false) {
  emit('update:visible', visible)
}
type ModalType = 'add' | 'edit'
const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: '添加用户',
    edit: '编辑用户',
  }
  return titles[props.type]
})

function UpdateFormModelByModalType() {
  const handlers = {
    add: () => {
      formModel.value = { ...defaultFormModal }
    },
    edit: () => {
      if (props.modalData)
        formModel.value = { ...props.modalData }
    },
  }
  handlers[props.type]()
}
watch(
  () => props.visible,
  (newValue) => {
    if (newValue)
      UpdateFormModelByModalType()
  },
)
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    :mask-closable="false"
    preset="card"
    :title="title"
    class="w-700px"
    :segmented="{
      content: true,
      action: true,
    }"
  >
    <n-form label-placement="left" :model="formModel" label-align="left" :label-width="80">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="用户名" path="name">
          <n-input v-model:value="formModel.name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="年龄" path="age">
          <n-input-number v-model:value="formModel.age" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="性别" path="gender">
          <n-input v-model:value="formModel.gender" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="邮箱" path="email">
          <n-input v-model:value="formModel.email" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="地址" path="address">
          <n-input v-model:value="formModel.address" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="角色" path="role">
          <n-input v-model:value="formModel.role" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="状态" path="disabled">
          <n-switch v-model:value="formModel.disabled" />
        </n-form-item-grid-item>
      </n-grid>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal()">
          取消
        </n-button>
        <n-button type="primary">
          提交
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
