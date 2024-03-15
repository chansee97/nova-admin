<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue'

function toMyGithub() {
  window.open('https://github.com/chansee97')
}
</script>

<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="toMyGithub">
        <i-icon-park-outline-github />
      </HeaderButton>
    </template>
    <span>Github</span>
  </n-tooltip>
</template>

<style scoped></style>
