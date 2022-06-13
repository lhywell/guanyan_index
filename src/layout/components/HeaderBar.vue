<template>
  <el-header>
    <!-- <div class="logo"/> -->
    <div class="header">
      <span>首页</span>
      <span>我们</span>
      <span>产品</span>
      <span>咨询</span>
      <span>联系</span>
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

  .header {
    display: flex;
    justify-content: space-around;
    width: 600px;
  }
  .logo {
    width: 0.3rem;
    height: 100%;
    background: url(./images/logo.png) center center no-repeat;
    background-size: 100% auto;
    float: left;
    margin: 0 0.1rem 0 0;
  }
}
</style>
