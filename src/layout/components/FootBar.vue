<template>
  <el-footer class="footer">
    <span>© {{ year }} guanyan001.cn 版权所有 增值电信业务经营许可证： </span>
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

  a {
    color: #73777a;
  }
  .text-color:hover {
    color: #c8cacc;
  }
}
</style>
