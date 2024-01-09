# ESlint 配置步骤

1. [安装 Vscode 插件 ESLint 、 Prettier - Code formatter](#安装-vscode-插件-eslint--prettier---code-formatter)
1. [全局安装 eslint](#全局安装-eslint)
1. [新建 .eslintrc.json 或者是 .eslintrc.js](#新建-eslintrcjson-或者是-eslintrcjs)
1. [安装依赖](#安装依赖)
1. [同步 eslint 和 prettier 规则](#同步-eslint-和-prettier-规则)
1. [检查规则是否生效](#检查规则是否生效)

## 安装 Vscode 插件 ESLint 、 Prettier - Code formatter

打开 vscode

Ctrl + Shift + X / Command + Shift + X 打开插件安装面板 搜索安装 ESLint 、 Prettier - Code formatter

## 全局安装 eslint

```bash
npm i eslint -g
```

## 新建 .eslintrc.json 或者是 .eslintrc.js

.eslintrc.js

```js
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
  extends: ['eslint-config-standard', 'prettier'],
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
```

## 安装依赖

```bash
pnpm install eslint-config-standard prettier -D

pnpm install prettier-eslint eslint-config-prettier -D

pnpm install vue-eslint-parser -D # 适配vue项目
```

上面的安装过程中可能会出现缺少前置依赖可以根据提示安装对应版本

```bash
pnpm i eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 -D
```

## 同步 eslint 和 prettier 规则

新建 .prettierrc

```json
{
  "semi": false
}
```

## 检查规则是否生效

重启 VSCode

ctrl + P / command + p

输入

`> eslint`

选择 Restart ESlint Server

再次 輸入

ctrl + P / command + p

`> eslint`

选择 Show Output Channel

查看 ESlint 是否是 runing 状态。

如果不是 查看报错信息 解决好对应问题即可

(完)
