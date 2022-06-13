<template>
  <el-container id="app" :class="'page-' + $route.name" direction="vertical">
    <!-- <el-header>Header</el-header> -->
    <HeaderBar />
    <el-main>
      <router-view :key="key" />
    </el-main>
    <FootBar />
  </el-container>
</template>
<script>
import HeaderBar from './components/HeaderBar'
import FootBar from './components/FootBar'

export default {
  name: 'Layout',
  components: {
    HeaderBar,
    FootBar,
  },
  computed: {
    key() {
      return this.$route.path
    },
  },
}
</script>
<style lang="scss">
#app {
  // @include size(100%, 100%);
  position: relative;
  width: 100%;
  height: 100%;

  .app-container {
    @include size(100%, calc(100% - 0.6rem));

    .app-main {
      flex-direction: column;
      .el-main {
        @include size(calc(100% - 0.4rem), calc(100% - 0.15rem));
        margin: 0 0.2rem 0.15rem;
        background: $bg-white;
        border-radius: $radius;
      }
    }
  }
}
</style>
