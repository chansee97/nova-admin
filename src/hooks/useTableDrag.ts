import type { NDataTable } from 'naive-ui'
import { useDraggable } from 'vue-draggable-plus'

export function useTableDrag<T = unknown>(params: {
  tableRef: Ref<InstanceType<typeof NDataTable> | undefined>
  data: Ref<T[]>
  onRowDrag: (rows: T[]) => void
}) {
  const tableEl = computed(() => params.tableRef?.value?.$el as HTMLElement)
  const tableBodyRef = ref<HTMLElement | undefined>(undefined)

  const { start } = useDraggable(tableBodyRef, params.data, {
    immediate: false,
    animation: 150,
    handle: '.drag-handle',
    onEnd: (event) => {
      const { oldIndex, newIndex } = event
      const start = Math.min(oldIndex!, newIndex!)
      const end = Math.max(oldIndex!, newIndex!) - start + 1
      const changedRows = [...params.data.value].splice(start, end)
      params.onRowDrag(unref([...changedRows]))
    },
  })

  onMounted(async () => {
    while (!tableBodyRef.value) {
      tableBodyRef.value = tableEl.value?.querySelector('tbody') || undefined
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  })

  watchOnce(() => tableBodyRef.value, (el) => {
    el && start()
  })
}
