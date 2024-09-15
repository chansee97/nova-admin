<script setup lang="ts">
import { fetchDictList } from '@/service'
import { useDictStore } from '@/store'

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
    subOptions.value = data.data()
  })
}

onMounted(() => {
  getAlldict()
})

const data = ref()
async function getDict() {
  data.value = currentDict.value.data()
}

async function getEnum() {
  data.value = currentDict.value.enum()
}

async function getValueMap() {
  data.value = currentDict.value.valueMap()
}

async function getLabelMap() {
  data.value = currentDict.value.labelMap()
}

const dictValue = ref()

const dictLabel = computed(() => {
  if (data.value && data.value[dictValue.value]) {
    return data.value[dictValue.value].label
  }
  return '--'
})

const enumValue = ref()

const enumLabel = computed(() => {
  if (data.value && data.value[enumValue.value]) {
    return data.value[enumValue.value]
  }
  return '--'
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
        <n-button @click="getEnum">
          获取当前字典枚举
        </n-button>
        <n-button @click="getValueMap">
          获取当前字典ValueMap
        </n-button>
        <n-button @click="getLabelMap">
          获取当前字典LabelMap
        </n-button>
      </n-flex>

      <pre class="bg-#eee:30">
          {{ data }}
        </pre>

      <n-flex align="center">
        <n-input-number v-model:value="dictValue" :min="0" />
        <n-text type="info">
          Map回显结果 {{ dictLabel }}
        </n-text>
      </n-flex>
      <n-flex align="center">
        <n-input-number v-model:value="enumValue" :min="0" />
        <n-text type="info">
          Enum回显结果 {{ enumLabel }}
        </n-text>
      </n-flex>
    </n-flex>
  </n-card>
</template>

<style scoped></style>
