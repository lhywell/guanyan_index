<template>
  <div v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow"
    >
      <router-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
          {{ onlyOneChild.meta.title }}
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title" v-if="item.meta">
        <i :class="item.meta && item.meta.icon" />
        {{ item.meta.title }}
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children, parent) {
      children = children || []
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        }
        this.onlyOneChild = item
        return true

      })

      // 当只有一个子路由时，默认显示子路由
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有要显示的子路由，则显示父级
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang=scss>
.sidebar-container {
  [class^="el-icon-"] {
    position: relative;
    top: -0.02rem;
    left: -0.04rem;
    line-height: 0.2rem;
  }

  .el-menu-item {
    padding-left: 0.28rem !important;
    border-left: 2px solid $white;

    &:hover,
    &:focus,
    &.is-active {
      background-color: $bg-gray-lighter;
      border-color: $blue;
    }
  }
  .el-submenu__title {
    border-left: 2px solid $white;

    &:hover {
      background-color: $bg-gray-lighter;
      border-color: $blue;
    }
  }
  .el-submenu {
    .el-menu-item {
      padding-left: 0.7rem !important;
    }
    .el-submenu__title {
      padding-left: 0.28rem !important;
    }
  }
}
</style>
