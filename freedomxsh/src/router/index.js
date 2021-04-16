/*
 * @Author: your name
 * @Date: 2021-04-13 14:01:14
 * @LastEditTime: 2021-04-15 14:54:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedomxsh\src\router\index.js
 */
import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);
const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
  });

  export function resetRouter () {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;

  }
  
  const router = createRouter();
  
  export default router;