import {
  create,
  ProDateRange,
  ProDateTimeRange,
  ProInput,
  ProSelect,
} from 'pro-naive-ui'
import type { App } from 'vue'

const proNaive = create({
  components: [ProInput, ProSelect, ProDateRange, ProDateTimeRange],
})

export function install(app: App) {
  app.use(proNaive)
}
