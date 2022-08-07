<template>
  <div text-center c-blue>I prove that you have made the jump test1.</div>
  <div text-center cursor-pointer>
    <div hover:c-blue @click="pinter">click check env</div>
    <div hover:c-blue @click="get">click to get</div>
    <div hover:c-blue @click="post">click to post</div>
    <div hover:c-blue @click="delete2">click to delete</div>
    <div hover:c-blue @click="put">click to put</div>
    <div hover:c-blue @click="patch">click to patch</div>
  </div>
</template>

<script setup lang="ts">
import { fetachGet, fetachPost, fetachDelete, fetachPut, fetachPatch } from '@/service/api';

const pinter = () => {
  console.log('打印环境配置', import.meta.env);
};
const get = () => {
  fetachGet().then((res) => {
    console.log(res);
  });
};
const delete2 = () => {
  fetachDelete().then((res) => {
    console.log(res);
  });
};
const post = () => {
  const params = {
    data: '2022-2-2',
  };
  fetachPost(params).then((res) => {
    console.log(res);
  });
};
const put = () => {
  const params = {
    data: '2022-2-2',
  };
  fetachPut(params).then((res) => {
    console.log(res);
  });
};
const patch = () => {
  const params = {
    data: '2022-2-2',
  };
  fetachPatch(params).then((res) => {
    console.log(res);
  });
};
</script>

<style scoped></style>
