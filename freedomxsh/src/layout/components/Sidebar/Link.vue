<!--
 * @Author: your name
 * @Date: 2021-04-15 15:27:43
 * @LastEditTime: 2021-04-22 11:16:09
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \freedomxsh\src\layout\components\Sidebar\Link.vue
 * 用来处理路由的渲染以及点击
-->
<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  methods: {
    linkProps(url) {
      // 判断是否是外链（带有http协议名的）如果是则给他去掉然后把点击事件变成一个a标签   处理内链还是外链）
      if (isExternal(url)) {
        return {
          is: "a",
          href: url,
          target: "_blank",
          rel: "noopener",
        };
      }
      // 内链就是一个相对路径 变成routerlink
      return {
        is: "router-link",
        to: url,
      };
    },
  },
};
</script>
