<!--
 * @Author: your name
 * @Date: 2021-04-15 15:27:43
 * @LastEditTime: 2021-04-22 10:49:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedomxsh\src\layout\components\Sidebar\index.vue
 * logo logo图标是通过isCollapes变量控制是长的还是短的    这个变量是通过判断左侧路由菜单是否展开收缩
 * menu   default-active属于导航栏的key
          mode="模式"
          collapse="是否水平折叠收起菜单"
          unique-opened 是否只保持一个菜单展开状态
          active-text-color 菜单活跃颜色
          collapse-transition 是否开启折叠懂话
  * scrollbar element的滚动条  如果侧栏过程会自动增加滚动条
  * 其中mapGetters方法前面加了三个点（对象展开运算符），使得它可以混入computed属性 （官方解释：使用对象展开运算符将 getter 混入 computed 对象中）
此处mapGetters的作用是将store中的getter映射到局部计算属性。
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(menu, index) in menus"
          :key="index"
          :item="menu"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
  components: {
    SidebarItem,
    Logo,
  },
  computed: {
    ...mapGetters(["menus", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // 如果设置路径，侧边栏将突出显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
