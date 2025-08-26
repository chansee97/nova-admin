import {
  create,
  ProInput,
  ProSelect,
} from 'pro-naive-ui'
import type { App } from 'vue'

const proNaive = create({
  components: [ProInput, ProSelect],
})

export function install(app: App) {
  app.use(proNaive)
}
