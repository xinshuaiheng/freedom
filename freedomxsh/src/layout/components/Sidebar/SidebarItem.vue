<!--
 * @Author: your name
 * @Date: 2021-04-15 15:27:43
 * @LastEditTime: 2021-04-23 10:53:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedomxsh\src\layout\components\Sidebar\SidebarItem.vue
 * applink 给每一个路由都绑定一个点击事件为了跳转路径（处理传入的内链或者外链的目的）
 * item    属于渲染每个路由的渲染页面 实际显示页面
 * 判断路由显示根据三个条件 1.有且只有一个子项目    2.子菜单是否包含子菜单     3.路由是否显示 hidden

 * 若路由子页面小于2 直接走渲染   如果大于2  循环递归方法调用sidebar-item
-->

<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children, item)">
      <app-link :to="onlyOneChild.path">
        <el-menu-item
          :index="onlyOneChild.path"
          :class="submenu - title - noDropdown"
        >
          <item
            :icon="onlyOneChild.icon || item.icon"
            :title="onlyOneChild.name"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="itemPath" popper-append-to-body>
      <template>
        <item :icon="item.icon" :title="item.name" />
      </template>
      <sidebar-item
        v-for="(child, index) in item.children"
        :key="index"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import Item from "./Item";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";
import item from "../CompanyInfo/item.vue";

export default {
  name: "SidebarItem",
  comments: { Item, AppLink },
  components: { item },

  mixins: [FixiOSBug],
  props: {
    // 有权限路由循环数组每一个
    item: {
      type: Object,
      require: true,
    },
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  computed: {
    itemPath() {
      return this.item.path === "/"
        ? this.item.path + this.item.code
        : this.item.path;
    },
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      // 判断是否有子菜单项 如果为空直接返回一个空数组
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          if (item.path === "/" && item.code) {
            this.onlyOneChild.path = item.path + item.code;
          }
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = parent;
        if (parent.path === "/" && parent.code) {
          this.onlyOneChild.path = parent.path + parent.code;
          return true;
        }
      }
      return false;
    },
  },
};
</script>
