<!--
 * @Author: your name
 * @Date: 2021-04-15 15:27:43
 * @LastEditTime: 2021-04-22 10:19:00
 * @LastEditors: Please set LastEditors
 * @Description: 修改密码组件
 * @FilePath: \freedomxsh\src\layout\components\EditPwd\index.vue
 * vh  是相对于试图的一种百分比形式
-->

<template>
  <div>
    <el-dialog
      title="修改密码"
      :width="mobile ? '90%' : '700px'"
      :top="mobile ? '5vh' : '15vh'"
      append-to-body
      :visible="showEditPwd"
      show-close="ture"
      close-on-click-modal="false"
      close-on-press-escape="false"
      @close="handleDialogClose"
    >
      <el-form
        ref="form"
        :model="model"
        status-icon
        :rules="rules"
        label-width="100px"
        :label-position="mobile ? 'top' : 'right'"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model="model.oldPassword"
            type="password"
            placeholder="请输入密码"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="model.newPassword"
            type="password"
            placeholder="新密码：8-16位数字、字母或符号的两者结合"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input
            v-model="model.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="userInfo.isInitPwd === 1">
          <p style="color: red; margin: 0">
            初始密码过于简单,请修改密码后重新登入
          </p>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="submitForm('form')"
          ></el-button>
          <el-button
            :disabled="isDisabled"
            @click="handleDialogClose"
          ></el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { editPassword } from "@/api/user";

export default {
  data() {
    let validatePass = (value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.model.newPassword !== "") {
          this.$ref.form.validateField("confirmPassword");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.model.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      model: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        newPassword: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
          {
            message: "密码必须是8-16位数字、字母或符号的两者结合",
            // pattern: /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{8,16}$/,
            trigger: ["blur"],
          },
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["showEditPwd", "userInfo"]),
    isDisabled() {
      return this.loading || this.userInfo.isInitPwd === 1;
    },
  },
  watch: {
    // 每次开关有变化都椒盐虾整个表单
    showEditPwd() {
      this.$refs.from && this.$refs.form.resetFields();
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const { msg } = await editPassword(this.model);
            this.loading = false;
            this.$message.success(`${msg},请重新登入`);
            this.handleDialogClose();
            this.$emit("on-success");
          } catch {
            this.loading = false;
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改密码保存在vuex
    handleDialogClose() {
      this.$store.dispatch("user/showEditPwd", false);
    },
  },
};
</script>
