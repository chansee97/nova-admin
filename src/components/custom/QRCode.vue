<template>
  <div>
    <vue-qr v-if="props.text" :text="props.text" qid="testid" :size="props.size" :correct-level="1"></vue-qr>
  </div>
</template>

<script setup lang="ts">
import vueQr from 'vue-qr/src/packages/vue-qr.vue'; //https://www.npmjs.com/package/vue-qr
const props = withDefaults(
  defineProps<{
    text?: string;
    size?: number;
  }>(),
  {
    text: '',
    size: 300,
  },
);
</script>

<style scoped></style>
