<script setup lang="ts">
import type { ToolbarNames } from 'md-editor-v3'

import { MdEditor } from 'md-editor-v3'

// https://imzbf.github.io/md-editor-v3/zh-CN/docs
import 'md-editor-v3/lib/style.css'
import { useAppStore } from '@/store'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const appStore = useAppStore()

const data = useVModel(props, 'modelValue', emit)

const theme = computed(() => {
  return appStore.colorMode ? 'dark' : 'light'
})

const toolbarsExclude: ToolbarNames[] = [
  'mermaid',
  'katex',
  'github',
  'htmlPreview',
  'catalog',
]
</script>

<template>
  <MdEditor
    v-model="data" :theme="theme" :toolbars-exclude="toolbarsExclude"
  />
</template>

<style scoped></style>
