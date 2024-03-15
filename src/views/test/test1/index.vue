<script setup lang="ts">
import {
  expiredTokenRequest,
  fetachDelete,
  fetachFormPost,
  fetachGet,
  fetachPost,
  fetachPut,
  fetchUpdateToken,
  testFailedRequest,
  testFailedResponse,
  testFailedResponse_NT,
} from '@/service'

const msg = ref()

function pinter() {
  msg.value = import.meta.env
}
function get() {
  fetachGet({ a: 112211 }).then((res) => {
    msg.value = res
  })
}
function delete2() {
  fetachDelete().then((res) => {
    msg.value = res
  })
}
function post() {
  const params = {
    data: '2022-2-2',
    data1: [],
    data2: {},
    data3: '',
    data4: null,
    data5: undefined,
  }
  fetachPost(params).then((res) => {
    msg.value = res
  })
}

function formPost() {
  const params = {
    data: '2022-2-2',
  }
  fetachFormPost(params).then((res) => {
    msg.value = res
  })
}
function put() {
  const params = {
    data: '2022-2-2',
  }
  fetachPut(params).then((res) => {
    msg.value = res
  })
}

// 测试请求失败
function failedRequest() {
  testFailedRequest().then((res) => {
    msg.value = res
  })
}
// 测试业务失败
function failedResponse() {
  testFailedResponse().then((res) => {
    msg.value = res
  })
}
// 测试业务失败无提示
function failedResponse_NT() {
  testFailedResponse_NT().then((res) => {
    msg.value = res
  })
}
// token过期
function expiredToken() {
  expiredTokenRequest().then((res) => {
    msg.value = res
  })
}
// 刷新token
function updataToken() {
  fetchUpdateToken('test token').then((res) => {
    msg.value = res
  })
}
</script>

<template>
  <div>
    <n-h1>接口功能测试</n-h1>
    <n-space>
      <n-button strong secondary type="success" @click="pinter">
        check env
      </n-button>
      <n-button strong secondary type="success" @click="get">
        use online get
      </n-button>
      <n-button strong secondary type="success" @click="post">
        use online post
      </n-button>
      <n-button strong secondary type="success" @click="formPost">
        use online formPost
      </n-button>
      <n-button strong secondary type="success" @click="delete2">
        use online delete
      </n-button>
      <n-button strong secondary type="success" @click="put">
        use online put
      </n-button>
      <n-button strong secondary type="error" @click="failedRequest">
        失败-错误状态码
      </n-button>
      <n-button strong secondary type="error" @click="failedResponse">
        失败-错误业务码
      </n-button>
      <n-button strong secondary type="error" @click="failedResponse_NT">
        响应失败(无提示)
      </n-button>
      <n-button strong secondary @click="expiredToken">
        token 过期
      </n-button>
      <n-button strong secondary @click="updataToken">
        refresh token
      </n-button>
    </n-space>

    <pre>
      {{ msg }}
    </pre>
  </div>
</template>

<style scoped></style>
