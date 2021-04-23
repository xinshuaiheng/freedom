<!--
 * @Author: your name
 * @Date: 2021-04-15 15:27:43
 * @LastEditTime: 2021-04-21 16:26:18
 * @LastEditors: Please set LastEditors
 * @Description: 右上角用户操作界面
 * @FilePath: \freedomxsh\src\layout\components\Navbar.vue
-->
<!--
  * hamburger       左侧控制菜单收缩的按钮组件 toggleSideBar是他的点击事件   
  * breadcrumb      面包屑组件  根据当前活跃的路由的id查询是否又父级路由并且返回到面包屑上
  * el-dropdown      element的下拉选择组件     placement 出现位置   command 点击回调
  * svg-icon         element的svg组件
-->

<template>
  <div class="navbar">
    <hamburger
      id="hamburger-containerbtn"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div>
      <el-dropdown
        placement="bottom-end"
        class="avatar-container right-menu-item hover-effect"
        @command="handeCommand"
      >
        <div class="user">
          <svg-icon icon-class="user" className="icon" />
          <span class="name">{{ userInfo.name || userInfo.companyName }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item v-if="userInfo.type === 3" command="company"
            >公司信息</el-dropdown-item
          >
          <el-dropdown-item command="password">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <edit-pwd @on-success="handleSuccess" />
    <user-info :show.sync="showInfo" />
    <company-info :show.sync="showCompanyInfo" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import EditPwd from "./EditPwd";
import UserInfo from "./UserInfo";
import CompanyInfo from "./CompanyInfo";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    EditPwd,
    UserInfo,
    CompanyInfo,
  },
  data() {
    return {
      // 控制用户修改页面
      showInfo: false,
      // 控制公司修改显示
      showCompanyInfo: false,
    };
  },
  computed: {
    ...mapGetters(["sidebar", "userInfo"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$msgbox({
        title: "提示",
        message: "确认登出吗？",
        // 是否显示取消按钮
        showCancelButton: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        showClose: false,
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.showCancelButton = false;
            instance.closeOnClickModal = false;
            // 删除token以及登入权限
            await this.$store.dispatch("user/logout");
            this.$router.push("/login");
            done();
          } else {
            done();
          }
        },
      });
    },
    handleCommand(command) {
      switch (command) {
        case "info":
          this.showInfo = true;
          break;
        case "company":
          this.showCompanyInfo = true;
          break;
        case "logout":
          this.logout();
          break;
        case "password":
          this.$store.dispatch("user/showEditPwd", true);
          break;
      }
    },
    // 修改密码后的回调
    async handleSuccess() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #212121;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 20px;
      font-size: 14px;
      color: #b9b9b9;
      .name {
        display: inline-block;
        vertical-align: middle;
        max-width: 200px;
        @include no-wrap;
      }
      .svg-icon {
        margin-right: 5px;
      }
      .avatar-wrapper {
        padding-top: 8px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
