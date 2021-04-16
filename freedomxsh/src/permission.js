/*
 * @Author: your name
 * @Date: 2021-04-13 15:45:29
 * @LastEditTime: 2021-04-15 14:16:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedom\freedomxsh\src\permission.js
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress';
import { Notification } from 'element-ui';
import { getToken, removeToken } from '@/utils/auth';
import { setTitle } from '@/utils/common';

NProgress.configure({ showSpinner: false });
const whiteList = ['/login'];
console.log(router)
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if(hasToken){
    if(to.path==='./login'){
      next({path:'/'});
      NProgress.done()
    }else{
      
      const hasRoles = store.getters.isGetPermission;
      if (hasRoles) {
        next();
      } else {
        try{
          console.log(1)
          const {routes,operations} = await store.dispatch('user/userInfo')
          await store.dispatch('permission/generateOperations', operations)
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            routes
          );
          router.addRoutes(accessRoutes);
          next({...to,replace:true})
              }catch{
                removeToken();
                next(`/login?redirect=${to.path}`);
                NProgress.done();
              }
      }
    }
  }else{
    if(whiteList.indexOf(to.path) !==-1){
      next()
    }else{
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
})
router.afterEach(to => {
  setTitle(to);
  Notification.closeAll();
  NProgress.done();
});