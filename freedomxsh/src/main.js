import Vue from "vue";
import App from "./App.vue";
// 页面跳转进度条
import NProgress from "nprogress"
import ElementUI from "element-ui"
import permission from './directive/permission';
import router from './router';
import store from './store';
import config from './config';
import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css';
import './icons'; // icon
import "./registerServiceWorker";
import './assets/styles/element-variables.scss';
import './assets/styles/index.scss';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import './permission';

import globalComp from './components/global';
import globalMixin from '@/mixins/global';

// 全局使用permission路由配置文件
Vue.use(permission)
Vue.use(ElementUI,{size:'medium',zIndex:3000})
// 全局注册
Vue.mixin(globalMixin);
Vue.config.productionTip = false;
// 近用进度条
NProgress.configure({showSpinner:false})
Vue.prototype.$config = config;
globalComp(Vue);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
