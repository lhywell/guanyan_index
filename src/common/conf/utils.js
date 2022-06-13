import { tokenKey } from '@/config'
import store from '@/store'

export function thousands(value) {
  return value ? value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : value
}

export function toFixed(value, mun = 2) {
  try {
    const data = Number(value)
    if (Number.isNaN(data)) {
      return `${value}`
    }
    let result = data.toFixed(mun)
    const array = result.split('.')
    if (array.length > 1) {
      if (array[1] === '00') {
        result = `${array[0]}`
      } else {
        const ext = array[1].split('')
        if (ext[1] === '0') {
          result = `${array[0]}.${ext[0]}`
        }
      }
    }
    return result
  } catch (error) {
    return `${value}`
  }
}

export function formatNumber(value) {
  try {
    let data = Number(value)
    let unit = ''
    if (Number.isNaN(data)) {
      return `${value}`
    }
    const flag = data < 0
    data = Math.abs(data)
    if (data >= 100000000) {
      data /= 100000000
      unit = '亿'
    } else if (data >= 10000000) {
      data /= 10000000
      unit = '千万'
    } else if (data >= 10000) {
      data /= 10000
      unit = '万'
    }
    return (flag ? '-' : '') + toFixed(data) + unit
  } catch (error) {
    return `${value}`
  }
}

export function byteSwitch(b, i = 0) {
  const unit = ['B', 'KB', 'MB', 'GB', 'TB']
  while (b >= 1024 && i <= 4) {
    b /= 1024
    i += 1
  }
  return `${toFixed(b)} ${unit[i > 4 ? 4 : i]}`
}

export function splitFirst(str, character) {
  const len = character.length
  const index = str.indexOf(character)
  if (index === -1) return [str]
  return [str.slice(0, index), str.slice(index + len)]
}

export function getFilenameByRequest(disposition) {
  const match = disposition && disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i)
  return match ? decodeURIComponent(match[1]) : ''
}

export function setStorage(key, value, type = 'local') {
  const method = type === 'local' ? window.localStorage : window.sessionStorage
  try {
    value = JSON.stringify(value)
  } catch (error) {}
  method.setItem(key, value)
}

export function getStorage(key, type = 'local') {
  const method = type === 'local' ? window.localStorage : window.sessionStorage
  let value = method.getItem(key)
  try {
    if (value) {
      value = JSON.parse(value)
    }
  } catch (error) {}
  return value
}

export function removeStorage(key, type = 'local') {
  const method = type === 'local' ? window.localStorage : window.sessionStorage
  method.removeItem(key)
}

export function clearStorage(type = 'local') {
  const method = type === 'local' ? window.localStorage : window.sessionStorage
  method.clear()
}

// 传参是为了解决：在引入 hasPermission 方法的情况下 tokenKey 引入会在 getToken 方法执行后才生效，会导致 tokenKey 未定义。
export function getToken(key) {
  return getStorage(key || tokenKey) || ''
}

export function setToken(token) {
  return setStorage(tokenKey, `Bearer ${token}`)
}

export function removeToken() {
  return removeStorage(tokenKey)
}

export function checkEmail(val) {
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

  return regex.test(val)
}

export function replaceAll(str, s1, s2) {
  return str.replace(new RegExp(s1, 'gm'), s2)
}

export function hasPermission(value) {
  const roles = store.getters && store.getters.roles
  let hasRole = false

  if (value && typeof value === 'string') {
    hasRole = roles.includes(value)
  } else if (value && value instanceof Array && value.length > 0) {
    hasRole = roles.some(role => value.includes(role))
  } else {
    throw new Error(`hasPermission: params error! Like "['admin','editor']"`)
  }

  return hasRole
}

/*
 * 下载文件流：
 * @param  {datas} String 数据内容
 * @param  {title} String 下载文件名称
 * content-type:Excel文件
 * type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
 * content-type:zip
 * type: "application/x-zip-compressed;charset=utf-8",
 * content-type:json
 * type: "application/application/octet-stream",
 */
export const exportFile = (datas, title, type) => {
  // 调用成功，在html中创建一个a元素
  const aTag = document.createElement('a')
  // 创建一个blob对象
  let exportType
  if (type === 'pdf') {
    exportType = 'application/pdf'
  } else if (type === 'zip') {
    exportType = 'application/x-zip-compressed;charset=utf-8'
  } else if (type === 'excel') {
    exportType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  }
  const blob = new Blob([datas], {
    type: exportType,
  }) // 这个content是下载的文件内容，自己修改
  if (title) aTag.download = title // 下载的文件名
  aTag.href = URL.createObjectURL(blob) // 创建一个URL对象
  aTag.click()
  URL.revokeObjectURL(blob) // 释
}

export const officeView = 'https://view.officeapps.live.com/op/view.aspx?src='
