<template>
  <el-footer class="footer">
    <span>© {{ year }} guanyan001.cn 版权所有</span>
    <div style="display: inline-block; line-height: 60px; margin: 0 20px">
      <a
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011202003676"
        class="text-color gongan"
      >
        <img src="gongan.png" />&nbsp;京公网安备 11011202003676号
      </a>
    </div>
    <a class="text-color" href="https://beian.miit.gov.cn" target="_blank">京ICP备2022016336号</a>
  </el-footer>
</template>

<script>
export default {
  name: 'FootBar',
  computed: {},
  data() {
    return {
      year: '',
    }
  },
  mounted() {
    this.year = new Date().getFullYear()
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.footer {
  text-align: center;
  line-height: 60px;
  background: rgb(37, 37, 37);
  color: #73777a;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #73777a;
  }
  .text-color:hover {
    color: #c8cacc;
  }
  .gongan {
    display: flex;
    align-items: center;
  }
}
</style>
