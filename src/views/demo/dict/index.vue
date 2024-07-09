<script setup lang="ts">
import { useDictStore } from '@/store'
import { fetchDictList } from '@/service'

const { dict } = useDictStore()

const dictKey = ref('')
const options = ref()
const subOptions = ref()
const currentDict = ref()
async function getAlldict() {
  const { data, isSuccess } = await fetchDictList()
  if (isSuccess) {
    options.value = data.map((item) => {
      return {
        label: item.label,
        value: item.code,
      }
    })
  }
}
function changeSelect(v: string) {
  dict(v).then((data) => {
    currentDict.value = data
    subOptions.value = data.list()
  })
}

onMounted(() => {
  getAlldict()
})

const data = ref()
async function getDict() {
  data.value = currentDict.value.list()
}

async function getValueMap() {
  data.value = currentDict.value.mapByValue()
}
async function getLabelMap() {
  data.value = currentDict.value.mapByLabel()
}

const dictValue = ref()

const dictLabel = computed(() => {
  if (data.value && dictValue.value) {
    return data.value[dictValue.value].label
  }
  return ''
})
</script>

<template>
  <n-card title="字典示例">
    <n-flex vertical>
      <n-flex>
        <n-select v-model:value="dictKey" class="w-1/3" :options="options" @update:value="changeSelect" />
        子字典下拉框
        <n-select class="w-1/3" :options="subOptions" />
      </n-flex>
      <n-flex>
        <n-button @click="getDict">
          获取当前字典数据
        </n-button>
        <n-button @click="getValueMap">
          获取当前字典ValueMap
        </n-button>
        <n-button @click="getLabelMap">
          获取当前字典LabelMap
        </n-button>
      </n-flex>

      <pre class="bg-#eee">
          {{ data }}
        </pre>

      <n-flex align="center">
        <n-input-number v-model:value="dictValue" />
        <n-text v-if="data && dictValue" type="info">
          回显结果 {{ dictLabel }}
        </n-text>
      </n-flex>
    </n-flex>
  </n-card>
</template>

<style scoped></style>
