<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  maxLength?: string
}>()
const emit = defineEmits(['update:modelValue'])

const text = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div v-if="text" class="copy-wrap">
    <n-ellipsis :style="{ 'max-width': maxLength || '12em' }">
      {{ text }}
    </n-ellipsis>
    <span v-copy="text" class="copy_icon">
      <icon-park-outline-copy />
    </span>
  </div>
</template>

<style scoped>
.copy-wrap{
  display: inline-flex;
  align-items: center;
  gap:0.5em;
}
.copy_icon{
  cursor: pointer;
}
</style>
