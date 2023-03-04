<template>
  <n-watermark
    v-if="props.showWatermark"
    content="Ench-Admin"
    cross
    fullscreen
    :font-size="16"
    :line-height="16"
    :width="384"
    :height="384"
    :x-offset="12"
    :y-offset="60"
    :rotate="-15"
  />
</template>

<script setup lang="ts">
interface Props {
	showWatermark: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	showWatermark: false,
});
</script>
