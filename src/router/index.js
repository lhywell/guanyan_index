import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
// import Layout from '@/layout'
import Dashboard from '@/layout/Dashboard.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'

/* Router Modules */
// import contentRouter from './modules/content.js'

Vue.use(Router)

// ['admin', 'sder', 'platformer', 'reviewer']

// 没有角色权限控制的页面
export const constantRoutes = [
  {
    path: '/',
    name: 'index',
    // meta: { title: '内容管理', icon: 'el-icon-s-home', roles: ['admin', 'platformer', 'inputer'] },
    component: EmptyLayout,
    redirect: '/dashboard/index',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // meta: { title: '内容管理', icon: 'el-icon-s-home', roles: ['admin', 'platformer', 'inputer'] },
    component: Dashboard,
    redirect: 'noRedirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'revenue',
        meta: {
          title: '首页',
          // icon: 'el-icon-coin',
          // roles: ['admin', 'platformer', 'inputer'],
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    hidden: true,
    meta: { title: '登录' },
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'dashboard',
  //       meta: { title: '数据概况', icon: 'el-icon-pie-chart' },
  //     },
  //   ],
  // },
  // {
  //   path: '/switch-roles',
  //   component: Layout,
  //   redirect: '/switch-roles',
  //   children: [
  //     {
  //       path: 'switch-roles',
  //       component: () => import('@/views/switch-roles'),
  //       name: 'switch-roles',
  //       meta: { title: '角色切换', icon: 'el-icon-user' },
  //     },
  //   ],
  // },
]

// 解决官方bug
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () =>
  new Router({
    mode: 'hash', // 需要服务端支持
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
