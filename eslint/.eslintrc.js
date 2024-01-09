// ESLint 检查 .vue 文件需要单独配置编辑器：
// https://eslint.vuejs.org/user-guide/#editor-integrations
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    "vue/setup-compiler-macros": true,
  },
  extends: ["taro/vue3", "eslint-config-standard", "prettier"],
  rules: {
    "no-new": "off",
    "no-debugger": "warn",
    "no-var": "error",
    // 圈复杂度
    complexity: ["error", 10],
    // 块嵌套最大深度
    "max-depth": ["error", 5],
    // 最大行长
    "max-len": ["error", { code: 100, tabWidth: 4 }],
    // 一个文件最大行数
    "max-lines": [
      "error",
      { max: 500, skipBlankLines: true, skipComments: true },
    ],
    // 回调嵌套最大深度
    "max-nested-callbacks": ["error", { max: 5 }],
    // 一个方法最大行数
    "max-lines-per-function": ["error", 80],
    // 禁止多空行
    "no-multiple-empty-lines": ["error"],
    // 禁止分号结尾
    semi: ["error", "never"],
    // 该规则规定了在对象字面量语法中key和value之间的空白，冒号前不要留空格，冒号后面需留一个空格
    "key-spacing": [2, { beforeColon: false, afterColon: true }],
    // 该规则规定了在逗号前不要留空格，逗号后面需留一个空格
    "comma-spacing": ["error", { before: false, after: true }],
    // 缩进
    indent: ["error"],
    // 禁止出现多个空格
    "no-multi-spaces": ["error"],
    // 禁止不必要的转义字符
    "no-useless-escape": 0,
  },
  parser: ["vue-eslint-parser", "@typescript-eslint/parser"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  globals: {
    NodeJS: "readonly",
    ProcessEnv: "readonly",
    TARO_ENV: "readonly",
    definePageConfig: "readonly",
    defineAppConfig: "readonly",
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
    wx: "readonly",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
}
