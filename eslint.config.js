// eslint.config.js
import antfu from '@antfu/eslint-config'

// https://github.com/antfu/eslint-config
export default antfu(
  {
    typescript: {
      overrides: {
        'ts/no-unused-expressions': ['error', { allowShortCircuit: true }],
      },
    },
    vue: {
      overrides: {
        'vue/no-reserved-component-names': 'off',
        'vue/component-definition-name-casing': 'off',
      },
    },
  },
)
