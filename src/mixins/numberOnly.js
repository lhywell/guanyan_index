//自定义指令，用于限制输入内容为正数，调用方式：v-numberOnly
export default {
  bind(el, binding, vnode) {
    el.handler = (e) => {
      e = e || window.event
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode
      let re = /\d/
      // if(charcode == 46){
      //     if(el.value.includes('.')){
      //         e.preventDefault();
      //     }
      //     return;
      // }
      // else if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
      if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
    }
    el.addEventListener('keypress', el.handler)
  },
  unbind(el, binding) {
    el.removeEventListener('keypress', el.handler)
  },
}
