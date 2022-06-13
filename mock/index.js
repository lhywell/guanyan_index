const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./controllers/user')

const mocks = [...user]

function mockXHR() {
  // 延时返回
  // Mock.setup({
  //   timeout: 3000,
  // })
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req

        let params = {}
        if (typeof body === 'string' && body.indexOf('&') !== -1) {
          body.split('&').forEach(tmp => {
            if (tmp.indexOf('=') !== -1) {
              let arr = tmp.split('=')
              if (arr.length == 2) {
                params[arr[0]] = arr[1]
              }
            }
          })
        } else {
          params = JSON.parse(body)
        }

        result = respond({
          method: type,
          body: params,
          query: param2Obj(url),
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR,
}
