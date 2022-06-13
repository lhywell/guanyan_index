import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import { baseURL, tokenKey } from '@/config'
import { getToken } from '@/common/conf/utils'
import store from '@/store'
import router from '@/router'

require('promise.prototype.finally').shim()

const { CancelToken } = axios
const md5 = require('js-md5')

// 请求重复判断
const promiseObj = {}

function checkRequest(option) {
  let next = true
  const { url, method, data = {}, params = {}, abort = false } = option
  const key = md5(JSON.stringify({ url, method, data, params }))

  if (typeof promiseObj[key] !== 'undefined') {
    if (abort) {
      if (promiseObj[key]) promiseObj[key]('取消请求')
    } else {
      next = false
    }
  } else {
    promiseObj[key] = null
    next = () => {
      delete promiseObj[key]
    }
  }

  return {
    key,
    next,
  }
}

// 跳转登录
function toLogin() {
  store.dispatch('user/resetToken')
  const path = window.location.pathname
  const params = {
    name: 'login',
  }
  if (path.indexOf('login') === -1 && path !== '/') {
    params.query = {
      redirect: path,
    }
  }
  router.push(params)
}

// 创建实例时设置配置的默认值
const instance = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  baseURL: process.env.NODE_ENV === 'development' ? '' : baseURL,
  // headers: {
  //   'Content-Type': 'application/json;charset=UTF-8',
  // },
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 添加token
    config.headers[tokenKey] = getToken(tokenKey)

    // post数据改为表单提交
    if (config.method === 'post' && config.datatype === 'formdata') {
      config.headers['Content-Type'] = 'multipart/form-data'
      if (config.data) {
        const params = new FormData()
        Object.keys(config.data).forEach(key => {
          const value = config.data[key]
          if (value !== undefined) {
            params.append(key, value)
          }
        })
        config.data = params
      }
    }

    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => Promise.reject(err),
)

// 添加响应拦截器
instance.interceptors.response.use(
  res => {
    const { status, data } = res
    if (Object.prototype.toString.call(data) === '[object Blob]') {
      return data
    }

    if (status === 200) {
      // 401：token失效
      if (data.code === 401) {
        toLogin()
      } else if (data.code === 200) {
        return data
      } else {
        return Promise.reject(data)
        // return data
      }
    }
    return Promise.reject(data)
  },
  error => {
    try {
      if (error.response.data.code === '401') {
        toLogin()
      }
    } catch (e) {
      // 如果返回，会再进入实例的catch回调中。
    }
    // return Promise.reject(error)
  },
)

const request = option =>
  new Promise((resolve, reject) => {
    option.method = option.method.toLowerCase() || 'get'

    const checkRes = checkRequest(option)

    if (!checkRes.next) {
      reject(new Error('重复请求'))
    } else {
      if (option.method === 'get' && option.data) {
        option.params = option.data
      }
      instance({
        ...option,
        cancelToken: new CancelToken(cancel => {
          promiseObj[checkRes.key] = cancel
        }),
      })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          Message.error(error)
          // reject(error)
        })
        .finally(() => {
          checkRes.next()
        })
    }
  })

export default request
