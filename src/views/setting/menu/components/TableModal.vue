<script setup lang="ts">
import type {
  FormItemRule,
} from 'naive-ui'
import HelpInfo from '@/components/common/HelpInfo.vue'
import { useBoolean, useLoading } from '@/hooks'
import { Regex } from '@/constants'
import { fetchRoleList } from '@/service'

interface Props {
  modalName?: string
  allRoutes: AppRoute.RowRoute[]
}

const props = withDefaults(defineProps<Props>(), {
  modalName: '',
})

const emit = defineEmits<{
  open: []
  close: []
}>()

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const { loading: submitLoading, startLoading, endLoading } = useLoading(false)

const defaultFormModal: AppRoute.RowRoute = {
  'name': '',
  'path': '',
  'id': -1,
  'pid': null,
  'meta.title': '',
  'meta.icon': '',
  'meta.requiresAuth': true,
  'meta.roles': [],
  'meta.keepAlive': false,
  'meta.hide': false,
  'meta.order': undefined,
  'meta.href': undefined,
  'meta.activeMenu': undefined,
  'meta.withoutTab': true,
  'meta.pinTab': false,
  'meta.menuType': 'page',
}
const formModel = ref()

type ModalType = 'add' | 'view' | 'edit'
const modalType = shallowRef<ModalType>('add')
const modalTitle = computed(() => {
  const titleMap: Record<ModalType, string> = {
    add: '添加',
    view: '查看',
    edit: '编辑',
  }
  return `${titleMap[modalType.value]}${props.modalName}`
})

async function openModal(type: ModalType = 'add', data: AppRoute.RowRoute) {
  emit('open')
  modalType.value = type
  getRoleList()
  showModal()
  const handlers = {
    async add() {
      formModel.value = { ...defaultFormModal }
    },
    async view() {
      if (data)
        formModel.value = { ...data }
    },
    async edit() {
      if (data)
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

const dirTreeOptions = computed(() => {
  return filterDirectory(JSON.parse(JSON.stringify(props.allRoutes)))
})

function filterDirectory(node: any[]) {
  return node.filter((item) => {
    if (item.children) {
      const childDir = filterDirectory(item.children)
      if (childDir.length > 0)
        item.children = childDir
      else
        Reflect.deleteProperty(item, 'children')
    }

    return (item['meta.menuType'] === 'dir')
  })
}

const rules = {
  'name': {
    required: true,
    // message: '请输入菜单名称',
    validator(rule: FormItemRule, value: string) {
      if (!value)
        return new Error('请输入菜单名称')

      if (!new RegExp(Regex.RouteName).test(value))
        return new Error('菜单只能包含英文数字_!@#$%^&*~-')

      return true
    },
    trigger: 'blur',
  },
  'path': {
    required: true,
    message: '请输入菜单路径',
    trigger: 'blur',
  },
  'componentPath': {
    required: true,
    message: '请输入组件路径',
    trigger: 'blur',
  },
  'meta.title': {
    required: true,
    message: '请输入菜单标题',
    trigger: 'blur',
  },
  'meta.href': {
    validator(rule: FormItemRule, value: string) {
      if (!new RegExp(Regex.Url).test(value))
        return new Error('请输入正确的URL地址')

      return true
    },
    trigger: 'blur',
  },
}

const options = ref<Entity.Role[]>([])
async function getRoleList() {
  const { data } = await fetchRoleList()
  options.value = data
}
</script>

<template>
  <n-modal
    v-model:show="modalVisible" :mask-closable="false" preset="card" :title="modalTitle" class="w-700px"
    :segmented="{
      content: true,
      action: true,
    }"
  >
    <n-form
      ref="formRef"
      :rules="rules" label-placement="left" :label-width="100"
      :model="formModel"
      :disabled="modalType === 'view'"
    >
      <n-grid :cols="2" :x-gap="18">
        <n-form-item-grid-item :span="2" path="pid">
          <template #label>
            父级目录
            <HelpInfo message="不填写则为顶层菜单" />
          </template>
          <n-tree-select
            v-model:value="formModel.pid" filterable clearable :options="dirTreeOptions" key-field="id"
            label-field="meta.title" children-field="children" placeholder="请选择父级目录"
          />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="菜单名称" path="name">
          <n-input v-model:value="formModel.name" placeholder="Eg: system" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="标题" path="meta.title">
          <n-input v-model:value="formModel['meta.title']" placeholder="Eg: My-System" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="2" label="路由路径" path="path">
          <n-input v-model:value="formModel.path" placeholder="Eg: /system/user" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="菜单类型" path="meta.menuType">
          <n-radio-group v-model:value="formModel['meta.menuType']" name="radiogroup">
            <n-space>
              <n-radio value="dir">
                目录
              </n-radio>
              <n-radio value="page">
                页面
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="图标" path="meta.icon">
          <icon-select v-model:value="formModel['meta.icon']" :disabled="modalType === 'view'" />
        </n-form-item-grid-item>
        <n-form-item-grid-item v-if="formModel['meta.menuType'] === 'page'" :span="2" label="组件路径" path="componentPath">
          <n-input v-model:value="formModel.componentPath" placeholder="Eg: /system/user/index.vue" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" path="meta.order">
          <template #label>
            菜单排序
            <HelpInfo message="数字越小，同级中越靠前" />
          </template>
          <n-input-number v-model:value="formModel['meta.order']" />
        </n-form-item-grid-item>
        <n-form-item-grid-item v-if="formModel['meta.menuType'] === 'page'" :span="1" path="meta.href">
          <template #label>
            外链页面
            <HelpInfo message="填写后，点击菜单将跳转到该地址，组件路径任意填写" />
          </template>
          <n-input v-model:value="formModel['meta.href']" placeholder="Eg: https://example.com" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="登录访问" path="meta.requiresAuth">
          <n-switch v-model:value="formModel['meta.requiresAuth']" />
        </n-form-item-grid-item>
        <n-form-item-grid-item
          v-if="formModel['meta.menuType'] === 'page'" :span="1" label="页面缓存"
          path="meta.keepAlive"
        >
          <n-switch v-model:value="formModel['meta.keepAlive']" />
        </n-form-item-grid-item>
        <n-form-item-grid-item
          v-if="formModel['meta.menuType'] === 'page'" :span="1" label="标签栏可见"
          path="meta.withoutTab"
        >
          <n-switch v-model:value="formModel['meta.withoutTab']" />
        </n-form-item-grid-item>
        <n-form-item-grid-item v-if="formModel['meta.menuType'] === 'page'" :span="1" label="常驻标签栏" path="meta.pinTab">
          <n-switch v-model:value="formModel['meta.pinTab']" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="1" label="侧边菜单隐藏" path="meta.hide">
          <n-switch v-model:value="formModel['meta.hide']" />
        </n-form-item-grid-item>
        <n-form-item-grid-item
          v-if="formModel['meta.menuType'] === 'page' && formModel['meta.hide']" :span="2"
          path="meta.activeMenu"
        >
          <template #label>
            高亮菜单
            <HelpInfo message="当前路由不在左侧菜单显示，但需要高亮某个菜单" />
          </template>
          <n-input v-model:value="formModel['meta.activeMenu']" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="2" path="meta.roles">
          <template #label>
            访问角色
            <HelpInfo message="不填写则表示所有角色都可以访问" />
          </template>
          <n-select
            v-model:value="formModel['meta.roles']" multiple filterable
            label-field="role"
            value-field="id"
            :options="options"
          />
        </n-form-item-grid-item>
      </n-grid>
    </n-form>
    <template v-if="modalType !== 'view'" #action>
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

<style scoped></style>
