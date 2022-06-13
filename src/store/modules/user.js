import request from '@/common/axios'
import { getToken, setToken, removeToken, removeStorage } from '@/common/conf/utils'
import router, { resetRouter } from '@/router'
import { baseURL, tokenKey } from '@/config'

const state = {
  token: getToken(tokenKey) || '',
  name: '',
  avatar: '',
  description: '',
  roles: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_DESCRIPTION: (state, description) => {
    state.description = description
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

const actions = {
  // 登录
  login({ commit }, data) {
    return request({
      url: `${baseURL}/login`,
      method: 'post',
      data,
      abort: true,
    }).then(res => {
      if (res.data.token) {
        commit('SET_TOKEN', res.data.token)

        // 如果登录接口返回权限信息，可以在这里直接修改，这样就少调用一次 getInfo
        // dispatch('changeRoles', [res.data.roles])
      }

      return res
    })
  },

  // 获取用户信息
  getInfo({ commit }) {
    return request({
      url: `${baseURL}/user/info`,
      method: 'get',
      params: { token: state.token },
    }).then(res => {
      const { roleName, username } = res.data
      const ary = ['系统管理员', '平台管理员', '录入管理员', '投放管理员']
      const aryEn = ['admin', 'platformer', 'inputer', 'launcher']
      const index = ary.findIndex(d => d === roleName)

      const roles = aryEn[index]
      commit('SET_ROLES', [roles])
      commit('SET_NAME', username)
      // commit('SET_AVATAR', avatar)
      // commit('SET_DESCRIPTION', description)

      return res
    })
  },

  // 登出
  logout({ dispatch }, data) {
    return request({
      url: `${baseURL}/logout`,
      method: 'get',
      data,
      abort: true,
    }).then(res => {
      dispatch('resetToken')
      removeStorage('username')
      removeStorage('password')
      removeStorage('rememberme')
      removeStorage('authorization')
      return res
    })
  },

  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      // 加延时是为了在用户点击登录后，不因为角色被清空而导致跟角色相关的功能权限变化产生页面更新抖动
      setTimeout(() => {
        commit('SET_ROLES', [])
      }, 1000)
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // 动态修改权限
  async changeRoles({ commit, dispatch }, roles) {
    if (roles instanceof Array && roles.length) {
      commit('SET_ROLES', roles)

      // 根据角色生成可访问的路由
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
      // 动态添加可访问的路由
      resetRouter()
      accessRoutes.forEach(route => {
        router.addRoute(route)
      })
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
