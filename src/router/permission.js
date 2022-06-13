// import { Message } from 'element-ui'
// import NProgress from 'nprogress'
// import router from '@/router'
// import store from '@/store'
// import 'nprogress/nprogress.css'
// import { getToken } from '@/common/conf/utils'
// import { appName, routesWhiteList } from '@/config'

// NProgress.configure({ showSpinner: false })

// const whiteList = routesWhiteList // 不用重定向白名单

// router.beforeEach(async (to, from, next) => {
//   NProgress.start()

//   // 设置页面标题
//   if (to.meta.title) document.title = `${to.meta.title} - ${appName}`

//   // 判断用户是否已登录
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // 如果已登录，则重定向到主页
//       next({ path: '/' })
//       NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
//     } else {
//       // 通过getInfo判断用户是否获得了他的权限角色
//       const hasRoles = store.getters.roles && store.getters.roles.length > 0
//       if (hasRoles) {
//         next()
//       } else {
//         try {
//           // 获取用户信息
//           const { data } = await store.dispatch('user/getInfo')

//           const ary = ['系统管理员', '平台管理员', '录入管理员', '投放管理员']
//           const aryEn = ['admin', 'platformer', 'inputer', 'launcher']
//           const index = ary.findIndex(d => d === data.roleName)

//           // 根据角色生成可访问的路由
//           await store.dispatch('user/changeRoles', [aryEn[index]])
//           // await store.dispatch('user/changeRoles', ['admin'])

//           // 确保addRoute完成的hack方法
//           // 设置replace:true，这样导航就不会留下历史记录
//           next({ ...to, replace: true })
//         } catch (error) {
//           // 移除token，进入登录页面重新登录
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else if (whiteList.indexOf(to.path) !== -1) {
//     // 免登录白名单直接进入
//     next()
//   } else {
//     // 其他没有权限访问的页面重定向到登录页面
//     next(`/login?redirect=${to.path}`)
//     NProgress.done()
//   }
// })

// router.afterEach(() => {
//   NProgress.done()
// })
