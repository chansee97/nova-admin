<script setup lang="ts">
import { MdEditor } from 'md-editor-v3' // https://imzbf.github.io/md-editor-v3/zh-CN/docs
import 'md-editor-v3/lib/style.css'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const modelValue = defineModel()
const theme = computed(() => {
  return appStore.darkMode ? 'dark' : 'light'
})

const toolbarsExclude = [
  'mermaid',
  'katex',
  'github',
  'htmlPreview',
  'catalog',
]
</script>

<template>
  <MdEditor
    v-model="modelValue" :theme="theme" read-only :toolbars-exclude="toolbarsExclude"
  />
</template>

<style scoped></style>
