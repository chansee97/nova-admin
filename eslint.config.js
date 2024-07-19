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
  },
)
