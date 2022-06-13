<template>
  <div class="error-container">
    <div v-if="code === 404">
      <img src="./images/404.png" />
      <p class="error-txt">404.页面找不到了...</p>
    </div>
    <div v-else-if="code === 401">
      <img src="./images/401.png" />
      <p class="error-txt">401.您没有权限访问该页面...</p>
    </div>
    <div v-else>
      <img src="./images/500.png" />
      <p class="error-txt">500.服务器出现错误了...</p>
    </div>
    <a class="error-back" href="/">
      返回首页
      <i class="el-icon-d-arrow-right" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: Number,
      default: 404
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss">
.error-container {
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.error-txt {
  margin-top: 0.3rem;
  font-size: 0.2rem;
  color: rgb(81, 90, 110);
}
.error-back {
  margin-top: 0.3rem;
  font-size: 0.18rem;
  color: rgb(81, 90, 110);
  display: inline-block;
}
.error-back:hover {
  color: #2c51c5;
}
</style>
