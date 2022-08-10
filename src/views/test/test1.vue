<template>
  <div>
    <n-space>
      <n-button strong secondary type="success" @click="pinter">check env</n-button>
      <n-button strong secondary type="success" @click="get">to get</n-button>
      <n-button strong secondary type="success" @click="post">to post</n-button>
      <n-button strong secondary type="success" @click="delete2">to delete</n-button>
      <n-button strong secondary type="success" @click="put">to put</n-button>
      <n-button strong secondary type="success" @click="patch">to patch</n-button>
      <n-button strong secondary type="success" @click="mock">to use mock</n-button>
    </n-space>

    {{ msg }}
  </div>
</template>

<script setup lang="ts">
import { fetachGet, fetachPost, fetachDelete, fetachPut, fetachPatch, fetchMock } from '@/service/api';
import { ref } from 'vue';
const msg = ref();
const pinter = () => {
  msg.value = import.meta.env;
};
const get = () => {
  fetachGet().then((res) => {
    msg.value = res;
  });
};
const delete2 = () => {
  fetachDelete().then((res) => {
    msg.value = res;
  });
};
const post = () => {
  const params = {
    data: '2022-2-2',
  };
  fetachPost(params).then((res) => {
    msg.value = res;
  });
};
const put = () => {
  const params = {
    data: '2022-2-2',
  };
  fetachPut(params).then((res) => {
    msg.value = res;
  });
};
const patch = () => {
  const params = {
    data: '2022-2-2',
  };
  fetachPatch(params).then((res) => {
    msg.value = res;
  });
};
const mock = () => {
  fetchMock().then((res) => {
    msg.value = res;
  });
};
</script>

<style scoped></style>
