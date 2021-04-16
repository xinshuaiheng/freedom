/*
 * @Author: your name
 * @Date: 2021-04-14 18:56:21
 * @LastEditTime: 2021-04-14 18:56:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedom\freedomxsh\src\config\index.js
 */
const baseUrl = 
process.env.VUE_APP_ENV === 'development'
    ? ''
    : process.env.VUE_APP_ENV === 'test'
      ? ''
      : '';
      export default {
        /**
         * @description 配置显示在浏览器标签的title
         */
        title: 'RBAC权限管理系统',
        /**
         * @description api请求基础路径
         */
        baseUrl,
      
        fixedHeader: false,
      
        sidebarLogo: true
      };