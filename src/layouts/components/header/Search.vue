<script setup lang="ts">
import { NFlex, NTag, NText } from 'naive-ui'
import { useRouteStore } from '@/store'
import { renderIcon } from '@/utils'

const routeStore = useRouteStore()
const searchValue = ref('')

const { t } = useI18n()

const options = computed(() => {
  return routeStore.rowRoutes.filter((item) => {
    const conditions = [
      t(`route.${String(item.name)}`, item['meta.title'] || item.name)?.includes(searchValue.value),
      item.path?.includes(searchValue.value),
    ]
    return conditions.some(condition => condition)
  }).map((item) => {
    return {
      label: t(`route.${String(item.name)}`, item['meta.title'] || item.name),
      value: item.path,
      icon: item['meta.icon'],
    }
  })
})

function renderLabel(option: any) {
  return h(NFlex, {}, {
    default: () => [
      h(NTag, { size: 'small', type: 'primary', bordered: false }, { icon: renderIcon(option.icon), default: () => option.label }),
      h(NText, { depth: 3 }, { default: () => option.value }),
    ],
  })
}

const router = useRouter()
function handleSelect(value: string) {
  router.push(value)
  nextTick(() => {
    searchValue.value = ''
  })
}
</script>

<template>
  <n-auto-complete
    v-model:value="searchValue" class="w-20em m-r-1em" :input-props="{
      autocomplete: 'disabled',
    }" :options="options" :render-label="renderLabel" :placeholder="$t('app.searchPlaceholder')" clearable @select="handleSelect"
  >
    <template #prefix>
      <n-icon>
        <icon-park-outline-search />
      </n-icon>
    </template>
  </n-auto-complete>
</template>

<style scoped></style>
