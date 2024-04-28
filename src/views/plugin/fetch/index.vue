<script setup lang="ts">
import { useRequest } from 'alova'
import {
  FailedRequest,
  FailedResponse,
  FailedResponseWithoutTip,
  dictData,
  downloadFile,
  expiredTokenRequest,
  fetchDelete,
  fetchFormPost,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchUpdateToken,
  getBlob,
  withoutToken,
} from '@/service'

const msg = ref()
const { data: fetchGetData, send: sendFetchGet } = useRequest(fetchGet({ a: 112211 }), {
  // 当immediate为false时，默认不发出
  immediate: false,
})

function handleRequestHook() {
  sendFetchGet()
  msg.value = fetchGetData.value
}
function pinterEnv() {
  msg.value = import.meta.env
}
async function get() {
  const res = await fetchGet({ a: 112211, b: false })
  msg.value = res
}
function delete2() {
  fetchDelete().then((res) => {
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
  fetchPost(params).then((res) => {
    msg.value = res
  })
}

function formPost() {
  const params = {
    data: '2022-2-2',
  }
  fetchFormPost(params).then((res) => {
    msg.value = res
  })
}
function put() {
  const params = {
    data: '2022-2-2',
  }
  fetchPut(params).then((res) => {
    msg.value = res
  })
}

// 测试请求失败
function failedRequest() {
  FailedRequest().then((res) => {
    msg.value = res
  })
}
// 测试业务失败
function failedResponse() {
  FailedResponse().then((res) => {
    msg.value = res
  })
}
// 测试无提示的业务失败
function failedResponseWithoutTip() {
  FailedResponseWithoutTip().then((res) => {
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
// 不携带token的接口
function withoutTokenRequest() {
  withoutToken().then((res) => {
    msg.value = res
  })
}
// 不携带token的接口
function getDictData() {
  dictData().then((res) => {
    msg.value = res
  })
}
// 模拟获取二进制文件
const imagePath = ref('https://images.unsplash.com/photo-1663529628961-80aa6ebcd157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80')
function getBlobFile() {
  getBlob(imagePath.value).then((res) => {
    msg.value = 'this is blob!'
    const link = URL.createObjectURL(res)
    const eleLink = document.createElement('a')
    eleLink.download = 'okk'
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
  })
}
// 下载大文件获取进度
const downloadPath = ref('https://suqiqi.oss-cn-beijing.aliyuncs.com/test/video/1.mp4')
const { downloading, abort: abortDownloadFile, send: sendDownloadFile } = useRequest(downloadFile(downloadPath.value), {
  // 当immediate为false时，默认不发出
  immediate: false,
})
const downloadProcess = computed(() => {
  if (!downloading.value.loaded)
    return 0
  return Math.floor(downloading.value.loaded / downloading.value.total * 100)
})
</script>

<template>
  <n-card title="网络请求示例">
    <n-space vertical :size="12">
      <pre class="bg-#eee">
      {{ msg }}
      </pre>
      <n-descriptions label-placement="left" bordered>
        <n-descriptions-item label="检查环境变量">
          <n-button strong secondary type="success" @click="pinterEnv">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="Get">
          <n-button strong secondary type="success" @click="get">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="Post">
          <n-button strong secondary type="success" @click="post">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="formPost">
          <n-button strong secondary type="success" @click="formPost">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="Delete">
          <n-button strong secondary type="success" @click="delete2">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="Put">
          <n-button strong secondary type="success" @click="put">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="useRequest风格">
          <n-button strong secondary type="success" @click="handleRequestHook">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="不带token的接口">
          <n-button strong secondary type="success" @click="withoutTokenRequest">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="获取文件下载">
          <n-button strong secondary type="success" @click="getBlobFile">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="带进度的下载文件" :span="3">
          <n-space vertical>
            <n-input v-model:value="downloadPath" />
            <div>文件大小：{{ downloading.total }}B</div>
            <div>已下载：{{ downloading.loaded }}B</div>
            <n-progress type="line" indicator-placement="inside" :percentage="downloadProcess" />
            <n-space>
              <n-button strong secondary @click="sendDownloadFile">
                开始下载
              </n-button>
              <n-button strong secondary type="warning" @click="abortDownloadFile">
                中断下载
              </n-button>
            </n-space>
          </n-space>
        </n-descriptions-item>
        <n-descriptions-item label="转换请求数据">
          <n-button strong secondary type="success" @click="getDictData">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="失败-错误状态码">
          <n-button strong secondary type="error" @click="failedRequest">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="失败-错误业务码">
          <n-button strong secondary type="error" @click="failedResponse">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="失败-错误业务码(无提示)">
          <n-button strong secondary type="error" @click="failedResponseWithoutTip">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="401-token过期">
          <n-button strong secondary @click="expiredToken">
            click
          </n-button>
        </n-descriptions-item>
        <n-descriptions-item label="refresh token">
          <n-button strong secondary @click="updataToken">
            click
          </n-button>
        </n-descriptions-item>
      </n-descriptions>
      <n-alert title="关于401-token失效刷新" type="warning">
        请在控制台将网络速率设置为最低（1kb左右）后点击查看，否则会造成请求大量发送
      </n-alert>
    </n-space>
  </n-card>
</template>

<style scoped></style>
