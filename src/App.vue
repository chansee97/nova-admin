<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
	<div>
		<a href="https://vitejs.dev" target="_blank">
			<img src="/pixel.svg" class="logo" alt="Vite logo" />
		</a>
	</div>
	<HelloWorld msg="Vite + Vue 的中后台模板" />
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
