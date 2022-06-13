module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    defineProps: true,
    defineEmits: true,
    defineExpose: true,
    withDefaults: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  // 参考资料：https://cloud.tencent.com/developer/chapter/12618
  rules: {
    'no-empty': ['error', { allowEmptyCatch: true }], // 不允许空块语句，但允许空catch子句
    'no-shadow': ['error', { allow: ['state'] }], // 校验阴影变量声明，但允许store中的state
    'global-require': 'off', // 允许require的调用不用必须位于模块顶层
    'arrow-body-style': ['error', 'as-needed'], // 禁止在箭头函数体的周围使用大括号
    'linebreak-style': ['error', 'unix'], // 统一行结尾
    'no-param-reassign': 'off', // 允许对函数参数进行再赋值
    'import/no-cycle': 'off',
    'import/no-unresolved': 'off', // 取消自动解析路径，以此开启alias的别名路径设置
    'import/no-extraneous-dependencies': 'off', // 使用history/createBrowserHistory引入包时，不会报错
    'import/extensions': 'off', // 取消对文件扩展名的验证
    'vue/html-self-closing': [
      'error', // 强制标签自闭合
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'no-plusplus': [
      'off',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    curly: ['error', 'multi-line'], // 禁止多行条件省略花括号
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
  overrides: [
    {
      files: ['vue.config.js'],
      rules: {
        'no-console': 'off', // 允许调用console对象的方法
        'no-underscore-dangle': 'off', // 允许在标识符中使用下划线
        'class-methods-use-this': 'off', // 允许类方法不适用this
      },
    },
  ],
}
