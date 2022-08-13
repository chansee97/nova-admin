<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <HeaderButton @click="toMyGithub">
        <i-icon-park-outline-github class="text-18px" />
      </HeaderButton>
    </template>
    <span>Github</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import HeaderButton from '../common/HeaderButton.vue';
const toMyGithub = () => {
  window.open('https://github.com/chen-see');
};
</script>

<style scoped></style>
