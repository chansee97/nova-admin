<script setup lang="ts">
interface Props {
  message: string
}

const props = defineProps<Props>()
</script>

<template>
  <n-tooltip :show-arrow="false" trigger="hover">
    <template #trigger>
      <icon-park-outline-help class="op-50 cursor-help" />
    </template>
    {{ props.message }}
  </n-tooltip>
</template>
