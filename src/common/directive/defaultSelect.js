// 自定义指令，用于下拉多选框 el－select 时，默认值不可删除，调用方式：v-defaultSelect
// https://blog.csdn.net/qq_36356218/article/details/102605332

export default {
  componentUpdated(el, bindings) {
    // values v-model 绑定值
    // options 下拉选项
    // prop 对应 options 中 的 value 属性
    // defaultProp 默认值判断属性
    // defaultValue 默认值判断值
    const [values, options, prop] = bindings.value
    // 需要隐藏的标签索引
    const indexs = []
    const tempData = values.map(a => options.find(op => op[prop] === a))
    // window.console.log(values, options, prop, defaultProp, defaultValue, tempData)
    tempData.forEach((a, index) => {
      // if (a[defaultProp] === defaultValue)
      indexs.push(index)
    })
    const dealStyle = tags => {
      tags.forEach((d, index) => {
        if (indexs.includes(index) && ![...d.classList].includes('select-tag-close-none')) {
          d.classList.add('none')
        }
      })
    }
    // 设置样式 隐藏close icon
    const tags = el.querySelectorAll('.el-tag__close')
    if (tags.length === 0) {
      // 初始化tags为空处理
      setTimeout(() => {
        const tagTemp = el.querySelectorAll('.el-tag__close')
        dealStyle(tagTemp)
      })
    } else {
      dealStyle(tags)
    }
  },
}
