<template>
  <el-container id="app" :class="'page-' + $route.name" direction="vertical">
    <HeaderBar />
    <el-container class="app-container">
      <SideBar />
      <el-container class="app-main">
        <Breadcrumb />
        <!-- <transition name="fade-transform" mode="out-in"> -->
        <!-- <keep-alive :exclude="'Dashboard'"> -->
        <router-view :key="key" />
        <!-- </keep-alive> -->
        <!-- </transition> -->
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import HeaderBar from './components/HeaderBar'
import SideBar from './components/SideBar/index'
import Breadcrumb from './components/Breadcrumb'

export default {
  name: 'Layout',
  components: {
    HeaderBar,
    SideBar,
    Breadcrumb,
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
