// import "babel-polyfill";
import Vue from 'vue'
import Vuex from 'vuex'

/* 整体加载ElementUI */
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN.js'
import gallery from 'img-vuer'
import router from '@/router'
import App from './App'
import store from './store'
import '@/router/permission'

import common from '@/common/mixin/common.js' // permission control
import numberOnly from '@/common/directive/numberOnly.js' // permission control
import defaultSelect from '@/common/directive/defaultSelect.js' // permission control

Vue.use(gallery)

Vue.use(Element, { locale, size: 'small', zIndex: 3000 })
Vue.directive('numberOnly', numberOnly)
Vue.directive('defaultSelect', defaultSelect)

/* 按需加载ElementUI */
// import {
//   Col,
//   Container,
//   Aside,
//   Button,
//   Form,
//   FormItem,
//   Input,
//   Select,
//   Option,
//   Dropdown,
//   Checkbox,
//   CheckboxGroup,
//   Radio,
//   RadioGroup,
//   Switch,
//   TimePicker,
//   DatePicker,
//   Message,
//   Menu,
//   MenuItem,
//   Submenu,
//   MenuItemGroup,
//   Header,
//   Avatar,
//   Tooltip,
//   Breadcrumb,
//   BreadcrumbItem,
// } from "element-ui";
// import locale from "element-ui/lib/locale/lang/zh-CN";

// const components = [
//   Col,
//   Container,
//   Aside,
//   Header,
//   Avatar,
//   Tooltip,
//   Menu,
//   MenuItem,
//   Submenu,
//   MenuItemGroup,
//   Button,
//   Form,
//   FormItem,
//   Input,
//   Select,
//   Option,
//   Dropdown,
//   Checkbox,
//   CheckboxGroup,
//   Radio,
//   RadioGroup,
//   Switch,
//   TimePicker,
//   DatePicker,
//   Breadcrumb,
//   BreadcrumbItem,
// ];

// const Element = {
//   install(Vue) {
//     components.forEach((component) => {
//       Vue.component(component.name, component);
//     });
//   },
// };

// Vue.prototype.$message = Message;

// Vue.use(Element, { locale, size: "small", zIndex: 3000 });

Vue.use(Vuex)
// 公共js
Vue.mixin(common)

Vue.config.productionTip = false

// if (process.env.NODE_ENV === 'development') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
