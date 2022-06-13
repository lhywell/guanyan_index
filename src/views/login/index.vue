<template>
  <div class="page-login">
    <div class="login-box">
      <div class="login-left" />
      <div class="title">
        <div class="title-tips">hello!</div>
        <b>欢迎来到{{ appName }}</b>
      </div>
      <p>账号</p>
      <el-input
        placeholder="请输入账号"
        autofocus
        clearable
        tabindex="1"
        v-model="username"
        @focus="closeTip"
        @clear="clearUsername"
      />
      <p>密码</p>
      <el-input
        placeholder="请输入密码"
        type="password"
        tabindex="2"
        v-model="password"
        @focus="closeTip"
        @keyup.enter.native="onSubmit"
      />

      <div>
        <el-checkbox v-model="rememberme">下次自动登录</el-checkbox>
        <el-popover placement="bottom" trigger="click" popper-class="pop-login" width="170">
          <el-alert title="请联系系统管理员" type="warning" :closable="false" show-icon />
          <el-button slot="reference" type="text">忘记密码</el-button>
        </el-popover>
      </div>

      <el-alert v-if="isWarning" :title="warnTxt" type="warning" show-icon @close="closeTip" />
      <el-alert v-if="isError" :title="errorTxt" type="error" show-icon @close="closeTip" />
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </div>
  </div>
</template>
<script>
import { getStorage, setStorage, removeStorage } from '@/common/conf/utils'
import { appName } from '@/config'
// const md5 = require('js-md5')
// import { getUserInfo } from '@/api/usermanage'

export default {
  name: 'Login',
  data() {
    return {
      appName,
      rememberme: false,
      username: '',
      password: '',
      errorTxt: '',
      warnTxt: '请输入账号和密码',
      errTxt: '用户名和密码不匹配',
      isWarning: false,
      isError: false,
    }
  },
  mounted() {
    this.username = getStorage('username') || 'admin'
    this.password = getStorage('password') || '123456'
    this.rememberme = getStorage('rememberme')
    if (this.rememberme && this.username && this.password) {
      // this.doLogin(true)
    }
  },
  watch: {},
  methods: {
    onSubmit() {
      if (!this.username || !this.password) {
        this.isWarning = true
        return
      }
      this.isWarning = false
      this.isError = false
      this.doLogin()
    },
    doLogin() {
      if (!this.username || !this.password) {
        this.isWarning = true
        return
      }

      // let pwd = this.password
      // if (!auto) {
      //   pwd = md5(pwd)
      // }
      this.isWarning = false
      this.isError = false

      this.$store
        .dispatch('user/login', {
          username: this.username,
          password: this.password,
        })
        .then(async () => {
          // eslint-disable-next-line no-debugger
          // debugger
          setStorage('username', this.username)

          if (this.rememberme) {
            setStorage('password', this.password)
            setStorage('rememberme', this.rememberme)
          } else {
            removeStorage('password')
            removeStorage('rememberme')
          }

          // 登录重定向
          // const res = await getUserInfo()
          const { data } = await this.$store.dispatch('user/getInfo')
          const ary = ['系统管理员', '平台管理员', '录入管理员', '投放管理员']
          const aryEn = ['admin', 'platformer', 'inputer', 'launcher']
          const index = ary.findIndex(d => d === data.roleName)

          // 根据角色生成可访问的路由
          await this.$store.dispatch('user/changeRoles', [aryEn[index]])
          if (data.roleName === '投放管理员') {
            this.$router.push({
              path: '/launch/deal',
            })
          } else if (this.$route.query.redirect) {
            this.$router.push({ path: this.$route.query.redirect })
          } else {
            this.$router.push({
              path: '/',
            })
          }

          // 登录重定向
          // if (this.$route.query.redirect) {
          //   window.console.log(222)
          //   this.$router.push({ path: this.$route.query.redirect })
          // } else {
          //   window.console.log(222)
          //   this.$router.push({
          //     path: '/',
          //   })
          // }
        })
        .catch(res => {
          this.errorTxt = res.message || this.errTxt
          this.isError = true
        })
    },
    closeTip() {
      this.isWarning = false
      this.isError = false
    },
    clearUsername() {
      removeStorage('username')
    },
  },
}
</script>
<style lang="scss">
@import './index.scss';
</style>
