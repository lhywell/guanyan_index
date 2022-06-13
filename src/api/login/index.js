import request from '@/common/axios/index'
import { baseURL } from '@/config'

// 查看协作信息列表
export default function loginIn(data) {
  return request({
    url: `${baseURL}/login`,
    method: 'post',
    data,
  })
}
