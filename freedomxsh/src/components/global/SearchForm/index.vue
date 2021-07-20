<template>
  <div class="search-form">
    <el-form ref="form" :model="model" :inline="!isMobile">
      <el-form-item v-for="(item, index) in formList" :key="index" :label="item.label" :prop="item.prop">
        <!-- 输入框 -->
        <el-input
          v-if="item.tag === 'input'"
          v-model="model[item.prop]"
          v-bind="item.attrs || {}"
          :style="isMobile ? { width: '100%', marginBottom: '5px' } : { width: item.width }"
          :placeholder="item.placeholder"
          clearable
          v-on="item.listeners || {}"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          v-if="item.tag === 'select'"
          v-model="model[item.prop]"
          v-bind="item.attrs || {}"
          :style="isMobile ? { width: '100%', marginBottom: '5px' } : { width: item.width }"
          :placeholder="item.placeholder"
          clearable
          v-on="item.listeners || {}"
        >
          <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value"></el-option>
        </el-select>
        <!-- 日期选择器 -->
        <el-date-picker
          v-if="item.tag === 'datePicker'"
          v-model="model[item.prop]"
          v-bind="item.attrs || {}"
          :style="isMobile ? { width: '100%', marginBottom: '5px' } : { width: item.width }"
          value-format="yyyy-MM-dd"
          :placeholder="item.placeholder"
          :editable="false"
          type="date"
          v-on="item.listeners || {}"
        ></el-date-picker>
      </el-form-item>
      <el-form-item v-if="isShowBtn">
        <el-button type="primary" plain @click="handleBtnClick">查 询</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    size: {
      type: String,
      default: 'mini'
    },
    formCell: {
      type: Array,
      default() {
        return [];
      }
    },
    model: {
      type: Object,
      default() {
        return {};
      }
    },
    isShowBtn: {
      type: Boolean,
      default: true
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    formList() {
      return this.formCell.filter(item => !item.hidden);
    }
  },
  mounted() {
    console.log(this.model, this.formCell, 'asdjkxahsdl65265234');
  },
  methods: {
    handleBtnClick() {
      console.log(this.model, this.formCell, 'asdjkxahsdl65265234');
      this.$emit('on-search');
    },
    resetForm(formName) {
      console.log(this.model, this.formCell, 'asdjkxahsdl65265234');
      this.$refs[formName].resetFields();
      this.$emit('on-reset');
    }
  }
};
</script>

<style lang="scss" scoped>
.search-form {
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  overflow: hidden;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
