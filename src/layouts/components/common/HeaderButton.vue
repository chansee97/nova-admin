<script setup lang="ts"></script>

<template>
  <n-el
    tag="div"
    class="el h-full px-3 cursor-pointer"
  >
    <n-space
      align="center"
      class="h-full"
    >
      <slot />
    </n-space>
  </n-el>
</template>

<style scoped>
  .el {
    color: var(--n-text-color);
    background-color: var(--n-color);
    transition: 0.3s var(--cubic-bezier-ease-in-out);
  }
  .el:hover {
    background-color: var(--button-color-2-hover);
    color: var(--n-text-color-hover);
  }
</style>
