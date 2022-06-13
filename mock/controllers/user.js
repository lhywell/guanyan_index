const tokens = {
  admin: {
    token: 'admin-token',
  },
  normal: {
    token: 'normal-token',
  },
}

const users = {
  'admin-token': {
    roles: ['admin'],
    description: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '管理员',
  },
  'normal-token': {
    roles: ['normal'],
    description: '我是搬砖小能手',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '普通用户',
  },
}

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 300,
          message: '账号或密码错误',
        }
      }

      return {
        code: 200,
        data: token,
      }
    },
  },

  // get user info
  {
    url: '/user1/info.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 300,
          message: '获取用户信息失败',
        }
      }

      return {
        code: 200,
        data: info,
      }
    },
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success',
      }
    },
  },
]
