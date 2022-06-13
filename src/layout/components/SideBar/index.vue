<template>
  <el-aside class="sidebar-container" width="2rem">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu">
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  name: "MenuBar",
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果设置路径，侧边栏将突出显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
};
</script>
<style lang="scss">
.sidebar-container {
  @include size(2rem, 100%);
  background: $bg-white;

  .el-scrollbar {
    @include size(100%, 100%);

    .scrollbar-wrapper {
      height: calc(100% + 8px);
      overflow-x: hidden;
    }
    .is-horizontal {
      display: none;
    }

    .el-menu {
      border: none;
    }
  }
}
</style>
