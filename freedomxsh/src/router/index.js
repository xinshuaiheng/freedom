import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);
const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    // scrollBehavior (to, from, savedPosition) {
    //   if (savedPosition && to.name !== from.name) {
    //     return new Promise(resolve => {
    //       this.app.$root.$once('restoreSavedScroll', () => {
    //         this.app.$root.$nextTick(() => resolve(savedPosition));
    //       });
    //     });
    //   }
    // },
    routes
  });
// 重置路由·初始化路由   刷新页面使新的路由表权限进行刷新 防止登出时候原路由还会存在
export function resetRouter () {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

const router = createRouter();

export default router;
