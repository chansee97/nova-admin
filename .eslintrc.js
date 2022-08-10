module.exports = {
  //https://eslint.org/docs/latest/
  root: true,
  // 环境变量 https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments
  env: {
    browser: true, //浏览器全局变量。
    node: true, // Node.js 全局变量和 Node.js 范围。
    es2021: true, // 所有的ECMAScript6的特性除了模块
  },
  // 全局变量
  globals: {},
  // 指定解析器与解析器配置
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  // 想要Linting规则的插件 https://eslint.org/docs/latest/user-guide/configuring/plugins
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  // 指定扩展的配置，配置支持递归扩展，支持规则的覆盖和聚合。
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    '@vue/typescript/recommended',
  ],
  rules: {
    // TSESLint docs https://typescript-eslint.io/rules/
    'no-var': 'error', // 禁止使用var
    'no-unused-vars': 'off', // 允许声明不使用的值
    'no-console': 'warn', // 禁止出现console
    'no-debugger': 'off', // 关闭debugger警告
    'vue/multi-word-component-names': 0, // 关闭文件名多单词
    // 'import/no-unresolved': ['error', { ignore: ['~icons/*'] }],
  },
};
