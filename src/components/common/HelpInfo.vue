<script setup lang="ts">
interface Props {
  message: string
}

const { message } = defineProps<Props>()
</script>

<template>
  <n-tooltip :show-arrow="false" trigger="hover">
    <template #trigger>
      <icon-park-outline-help class="op-50 cursor-help" />
    </template>
    {{ message }}
  </n-tooltip>
</template>
