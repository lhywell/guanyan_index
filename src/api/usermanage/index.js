// 账户管理
import request from '@/common/axios/index'
import { baseURL } from '@/config'

// 获取用户信息
export async function getUserInfo(data = {}) {
  return request({
    url: `${baseURL}/user/info`,
    method: 'get',
    data,
  })
}

// 分页查询用户列表
export async function getUserlist(data = {}) {
  return request({
    url: `${baseURL}/user/page`,
    method: 'post',
    data,
  })
}

// 更新用户信息
export async function userUpdate(data = {}) {
  return request({
    url: `${baseURL}/user/update`,
    method: 'post',
    data,
  })
}

// 删除用户
export async function usersDelete(data = {}) {
  return request({
    url: `${baseURL}/user/delete`,
    method: 'get',
    data,
  })
}

// 查询角色列表
export async function getRoleList(data) {
  return request({
    url: `${baseURL}/role/list`,
    method: 'get',
    data,
  })
}

// 添加用户
export function userAdd(data = {}) {
  return request({
    url: `${baseURL}/user/add`,
    method: 'post',
    data,
  })
}
