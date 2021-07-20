/*
 * @Author: your name
 * @Date: 2021-04-06 16:32:15
 * @LastEditTime: 2021-04-16 15:18:01
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-rbac-admin\src\permission.js
 */
/*
 * @Author: your name
 * @Date: 2021-04-06 16:32:15
 * @LastEditTime: 2021-04-15 09:52:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-rbac-admin\src\permission.js
 */
import router from './router';
import store from './store';
import NProgress from 'nprogress';
import { Notification } from 'element-ui';
import { getToken, removeToken } from '@/utils/auth';
import { setTitle } from '@/utils/common';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
console.log(to,from,'路由的每次跳转888888888')
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      // 是否有登入权限

      const hasRoles = store.getters.isGetPermission;
      console.log(hasRoles,'是否有tonken权限999999999999999999')
      if (hasRoles) {
        next();
      } else {
        try {
          const { routes, operations } = await store.dispatch('user/userInfo');
          console.log(routes,operations,'获取到返回的路由信息和operations-12','operationss元素代码按钮')
          await store.dispatch('permission/generateOperations', operations);
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            routes
          );
          router.addRoutes(accessRoutes);
          console.log('追加到路由菜单里面-22')
          // next({ …to, replace: true })中的replace: true只是一个设置信息，告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。
          next({ ...to, replace: true });
        } catch (error) {
          removeToken();
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(to => {
  setTitle(to);
  Notification.closeAll();
  NProgress.done();
});
