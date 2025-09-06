<script setup lang="ts">
import { getDictTypeList } from '@/api'
import { useDict } from '@/hooks/useDict'
import { useDictStore } from '@/store'

const dictStore = useDictStore()

const selectedDictType = ref('')
const selectedDictValue = ref('')
const dictTypeOptions = ref<Array<{ label: string, value: string }>>([])
const displayData = ref<Entity.DictData[] | Record<string, any>>([])

// 使用 useDict hook 获取字典数据
const dictUtils = computed(() => {
  if (!selectedDictType.value) {
    return {
      rawData: ref([]),
      enumMap: ref({}),
      valueMap: ref({}),
      labelMap: ref({}),
      options: ref([]),
    }
  }
  return useDict(selectedDictType.value)
})

// 获取所有字典类型
async function getAllDictTypes() {
  try {
    const { data } = await getDictTypeList()
    dictTypeOptions.value = data.list.map((item: Entity.DictType) => ({
      label: item.name,
      value: item.type,
    }))
  }
  catch (error) {
    console.error('获取字典类型失败:', error)
  }
}

// 选择字典类型时的处理
function changeSelect(dictType: string) {
  selectedDictType.value = dictType
  selectedDictValue.value = ''
  // 默认显示原始数据
  nextTick(() => {
    if (dictUtils.value.rawData.value.length > 0) {
      displayData.value = dictUtils.value.rawData.value
    }
  })
}

onMounted(() => {
  getAllDictTypes()
})

// 显示原始字典数据
function showRawData() {
  displayData.value = dictUtils.value.rawData.value
}

// 显示枚举映射（value -> name）
function showEnumMap() {
  displayData.value = dictUtils.value.enumMap.value
}

// 显示值映射（value -> dictData）
function showValueMap() {
  displayData.value = dictUtils.value.valueMap.value
}

// 显示标签映射（name -> dictData）
function showLabelMap() {
  displayData.value = dictUtils.value.labelMap.value
}

// 显示选项格式
function showOptions() {
  displayData.value = dictUtils.value.options.value
}

// 根据值获取标签（使用 enumMap）
const dictLabel = computed(() => {
  if (!selectedDictValue.value || !dictUtils.value.enumMap.value)
    return '--'
  return dictUtils.value.enumMap.value[selectedDictValue.value] || '--'
})

// 清理缓存
function clearCache() {
  dictStore.cleanDict()
  window.$message?.success('字典缓存已清理')
}

// 移除指定字典缓存
function removeCache() {
  if (selectedDictType.value) {
    dictStore.removeDict(selectedDictType.value)
    window.$message?.success(`已移除 ${selectedDictType.value} 的缓存`)
  }
}
</script>

<template>
  <n-card title="字典演示">
    <n-flex vertical>
      <n-flex align="center">
        <n-select
          v-model:value="selectedDictType"
          :options="dictTypeOptions"
          placeholder="请选择字典类型"
          @update:value="changeSelect"
        />
        <n-select
          v-model:value="selectedDictValue"
          :options="dictUtils.options.value"
          placeholder="请选择字典项"
        />
      </n-flex>

      <n-flex>
        <n-button @click="showRawData">
          显示原始数据 (rawData)
        </n-button>
        <n-button @click="showEnumMap">
          显示枚举映射 (enumMap)
        </n-button>
        <n-button @click="showValueMap">
          显示值映射 (valueMap)
        </n-button>
        <n-button @click="showLabelMap">
          显示标签映射 (labelMap)
        </n-button>
        <n-button @click="showOptions">
          显示选项格式 (options)
        </n-button>
      </n-flex>

      <n-flex>
        <n-button type="warning" @click="clearCache">
          清理所有缓存
        </n-button>
        <n-button type="error" :disabled="!selectedDictType" @click="removeCache">
          移除当前字典缓存
        </n-button>
      </n-flex>

      <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
      {{ JSON.stringify(displayData, null, 2) }}</pre>

      <n-flex v-if="selectedDictValue" align="center">
        <n-text>选中值: {{ selectedDictValue }}</n-text>
        <n-text type="info">
          对应标签: {{ dictLabel }}
        </n-text>
      </n-flex>

      <n-divider />

      <n-text depth="3">
        useDict Hook 使用说明：
      </n-text>
      <n-ul>
        <n-li>
          <n-text code>
            useDict(dictType)
          </n-text> - 使用字典类型获取字典工具对象
        </n-li>
        <n-li>
          <n-text code>
            rawData
          </n-text> - 原始字典数据数组 Entity.DictData[]
        </n-li>
        <n-li>
          <n-text code>
            enumMap
          </n-text> - 枚举映射 { value: name }
        </n-li>
        <n-li>
          <n-text code>
            valueMap
          </n-text> - 值映射 { value: dictData }
        </n-li>
        <n-li>
          <n-text code>
            labelMap
          </n-text> - 标签映射 { name: dictData }
        </n-li>
        <n-li>
          <n-text code>
            options
          </n-text> - 选项数组 [{ label: name, value }]
        </n-li>
        <n-li>字典数据会自动缓存60分钟，支持手动清理缓存</n-li>
        <n-li>推荐使用 useDict hook 而不是直接调用 API 或 store</n-li>
      </n-ul>
    </n-flex>
  </n-card>
</template>

<style scoped></style>
