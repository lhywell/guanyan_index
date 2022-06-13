import Layout from '@/layout'

// const contentRouter = {
//   path: '/content',
//   component: Layout,
//   redirect: 'material',
//   name: 'content',
//   meta: {
//     title: '内容中心',
//     icon: 'el-icon-folder',
//   },
//   children: [
//     {
//       path: 'material',
//       component: () => import('@/views/content/material'),
//       name: 'material',
//       meta: {
//         title: '素材管理',
//         roles: ['admin', 'normal'],
//       },
//     },
//     {
//       path: 'weixin',
//       component: () => import('@/views/content/weixin'),
//       name: 'weixin',
//       meta: {
//         title: '内容分发',
//         roles: ['admin'],
//       },
//     },
//     {
//       path: 'clues',
//       component: () => import('@/views/content/clues'),
//       name: 'clues',
//       meta: {
//         title: '线索回收',
//         roles: ['admin'],
//       },
//     },
//   ],
// }
const contentRouter = {
  path: '/usermanage',
  component: Layout,
  redirect: 'noRedirect',
  children: [
    {
      path: 'index',
      component: () => import('@/views/usermanage'),
      name: 'usermanage',
      meta: {
        title: '账户管理',
        icon: 'el-icon-setting',
        roles: ['admin'],
      },
    },
  ],
}

export default contentRouter
