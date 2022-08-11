<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <div class="hover:bg-hex-F3F4F6 hover:shadow-inner h-full px-4 flex-center cursor-pointer" @click="toMyGithub">
        <e-icon icon="icon-park-outline:github" />
      </div>
    </template>
    <span>Github</span>
  </n-tooltip>
</template>

<script setup lang="ts">
const toMyGithub = () => {
  window.open('https://github.com/chen-see');
};
</script>

<style scoped></style>
