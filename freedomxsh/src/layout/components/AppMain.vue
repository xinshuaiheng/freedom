<!--
 * @Author: your name
 * @Date: 2021-04-06 16:32:15
 * @LastEditTime: 2021-04-23 10:56:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-rbac-admin\src\layout\components\AppMain.vue
-->
<template>
  <section id="app-main" class="app-main">
    <div id="app-main-container" class="app-main-container">
      <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive :include="cachedViews">
            <router-view :key="key" />
          </keep-alive> -->
        <router-view />
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
};
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  padding: 16px 14px;
  background-color: #fbfbfb;
  height: calc(100vh - 50px);
  box-sizing: border-box;
  overflow: auto;
  &-container {
    height: 100%;
  }
}
</style>
