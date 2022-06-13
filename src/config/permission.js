// /**

//  * @description 路由守卫，目前两种模式：all模式与intelligence模式
//  */
// import VabProgress from 'nprogress'
// import router from '@/router'
// import store from '@/store'
// import 'nprogress/nprogress.css'
// import getPageTitle from '@/utils/pageTitle'
// import {
//   authentication,
//   loginInterception,
//   progressBar,
//   recordRoute,
//   routesWhiteList,
// } from '@/config'

// let allPath = [] // 当前权限可以访问的所有path
// function getAllPath(accessRoutes, rootPath = '') {
//   accessRoutes.forEach(d => {
//     if (d?.children?.length) {
//       let curpath = ''
//       if (rootPath != '/') {
//         curpath = d.path.startsWith('/') ? d.path : `/${d.path}`
//       } else {
//         curpath = d.path
//       }
//       getAllPath(d.children, rootPath + curpath)
//     } else {
//       let curpath = ''
//       if (rootPath != '/') {
//         curpath = d.path.startsWith('/') ? d.path : `/${d.path}`
//       } else {
//         curpath = d.path
//       }
//       allPath.push(rootPath + curpath)
//     }
//   })
// }

// VabProgress.configure({
//   easing: 'ease',
//   speed: 500,
//   trickleSpeed: 200,
//   showSpinner: false,
// })
// router.beforeResolve(async (to, from, next) => {
//   if (progressBar) VabProgress.start()
//   let hasToken = store.getters['user/accessToken']

//   if (!loginInterception) hasToken = true

//   if (hasToken) {
//     if (to.path === '/login') {
//       // next({ path: '/' })
//       next()
//       if (progressBar) VabProgress.done()
//     } else {
//       const hasPermissions =
//         store.getters['user/permissions'] && store.getters['user/permissions'].length > 0
//       if (hasPermissions) {
//         next()
//       } else {
//         try {
//           let permissions
//           if (!loginInterception) {
//             // settings.js loginInterception为false时，创建虚拟权限
//             // await store.dispatch('user/setPermissions', ['admin'])
//             // permissions = ['admin']
//           } else {
//             permissions = await store.dispatch('user/getUserInfo')
//           }

//           let accessRoutes = []
//           if (authentication === 'intelligence') {
//             accessRoutes = await store.dispatch('routes/setRoutes', permissions)
//           } else if (authentication === 'all') {
//             accessRoutes = await store.dispatch('routes/setAllRoutes')
//           }
//           router.addRoutes(accessRoutes)

//           allPath = []
//           getAllPath(accessRoutes)
//           if (allPath.includes(to.fullPath)) {
//             next({ ...to, replace: true })
//             return
//           }
//           const firstLaytouPath = store.getters['user/firstLaytouPath']
//           next(firstLaytouPath)
//           return
//         } catch {
//           await store.dispatch('user/resetAccessToken')
//           if (progressBar) VabProgress.done()
//         }
//       }
//     }
//   } else if (routesWhiteList.indexOf(to.path) !== -1) {
//     next()
//   } else {
//     if (recordRoute) {
//       next(`/login?redirect=${to.path}`)
//     } else {
//       next('/login')
//     }

//     if (progressBar) VabProgress.done()
//   }
//   document.title = getPageTitle(to.meta.title)
// })
// router.afterEach(() => {
//   if (progressBar) VabProgress.done()
// })
