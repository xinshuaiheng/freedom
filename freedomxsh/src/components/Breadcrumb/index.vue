<!--
 * @Author: your name
 * @Date: 2021-04-15 15:17:57
 * @LastEditTime: 2021-04-21 10:45:14
 * @LastEditors: Please set LastEditors
 * @Description: 面包屑
 * @FilePath: \freedomxsh\src\components\Breadcrumb\index.vue
-->

<template>
  <el-breadcrumb>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-if="routerName !== 'dashboard'" :key="routerName">
        <a class="home" @click.prevent="handleLink('dashboard')">首页</a>
      </el-breadcrumb-item>

      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="`${index}-${item}`"
      >
        <span class="no-redirect">{{ item }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapGetters } from "vuex";
const { body } = document;
const WIDTH = 992;
export default {
  props: {
    isMobile: {
      type: Boolean,
      // 默认值
      default: false,
    },
  },
  data() {
    return {
      // 面包屑循环的数据
      levelList: null,
      // 获取有权限的路由数组
      menus: [],
      // 当前路由的名字
      routerName: "",
    };
  },
  computed: {
    // 获取到登入时存得路由信息
    ...mapGetters(["sourceMenus"]),
  },
  watch: {
    // 每一次跳转路由都监听当前路由信息
    $route(route) {
      this.routerName = route.name;
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let name = this.routerName;
      // 过滤路由数组于当前路由是否又    就是筛选出首页    因为首页为基础路由不在后端返的路由内
      let menu = this.sourceMenus.find((item) => item.code === name);
      this.menus = [];
      if (menu) {
        // 说明他不是首页不是父级路由
        this.findParent(menu);
        this.levelList = this.menus
          .filter((item) => item.breadcrumb !== false)
          .map((y) => y.name);
      } else {
        // 说明他是首页，需要从路由路径记录寻找
        this.levelList = this.$route.matched
          .filter((item) => item.breadcrumb !== false && item.meta.title)
          .map((x) => x.meta.title);
      }
      let length = this.levelList.length;
      // 如果面包屑长度超宽或者大于2
      if (this.$_isMobile() && length > 2) {
        this.levelList = [this.levelList[0], this.levelList[length - 1]];
      }
    },
    // 根据路由数组来寻找当前路由的父级路由值到招标不到为止          pid为父级路由ID
    findParent(menu) {
      let parent = this.sourceMenus.find((x) => x.id === menu.pid);
      this.menus.push(parent);
      this.findParent(parent);
    },
    // 计算屏幕宽度
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    // 点击首页跳转
    handleLink(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .home {
    color: #b9b9b9;
    font-size: 12px;
    &:hover {
      color: #e9e9e9;
    }
  }
  .no-redirect {
    color: #b0b0b0;
    cursor: text;
    font-size: 12px;
  }
}
</style>
