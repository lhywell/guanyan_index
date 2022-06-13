<template>
  <el-header>
    <!-- <div class="logo"/> -->
    <h1>{{ appName }}</h1>
    <div class="userinfo">
      <el-avatar :size="23" icon="el-icon-user-solid" />
      <span class="nickname ellipsis" :title="name">{{ name }}</span>
      <el-tooltip content="退出登录" placement="bottom">
        <span class="el-icon-switch-button icon-logout" @click="loginOut" />
      </el-tooltip>
    </div>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'
import { appName } from '@/config'

export default {
  name: 'HeaderBar',
  computed: {
    ...mapGetters(['name']),
  },
  data() {
    return {
      appName,
    }
  },
  methods: {
    loginOut() {
      this.$store.dispatch('user/logout').then(() => {
        // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        this.$router.push(`/login`)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.el-header {
  @include size(100%, 0.6rem);
  padding: 0 0.3rem;
  line-height: 0.6rem;
  background: $bg-white;
  border-bottom: $border;

  .logo {
    width: 0.3rem;
    height: 100%;
    background: url(./images/logo.png) center center no-repeat;
    background-size: 100% auto;
    float: left;
    margin: 0 0.1rem 0 0;
  }

  h1 {
    display: inline-block;
    font-size: 0.2rem;
    font-weight: normal;
  }

  .userinfo {
    float: right;

    .el-avatar {
      vertical-align: middle;
    }
    .nickname {
      margin: 0 0.2rem 0 0.1rem;
      vertical-align: middle;
    }

    .icon-logout {
      vertical-align: middle;
      position: relative;
      border-left: $border;
      padding: 0 0.2rem;
      cursor: pointer;
    }
  }
}
</style>
