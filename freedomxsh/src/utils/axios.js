/*
 * @Author: your name
 * @Date: 2021-04-06 16:32:15
 * @LastEditTime: 2021-04-16 15:18:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-rbac-admin\src\utils\axios.js
 */
import axios from 'axios';
import NProgress from 'nprogress';
// import store from '../store';
import router from '../router';
import { Message } from 'element-ui';
import { getToken, removeToken } from '@/utils/auth';
import { encryptRsa } from '@/utils/gas.jdk';

class HttpRequest {
  constructor (baseUrl = '') {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    };
    console.log('定义axios的公共路径和请求头','-1')
    return config;
  }
  destroy (url) {
    delete this.queue[url];
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        NProgress.start();
        const token = getToken();
        console.log(token,'获取token信息','-2')
        this.queue[url] = true;
        console.log( this.queue,'这个axios请求为true','-3')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log(config,'再axios的config里面添加请求头信息','-4')
        }
        const { data } = config;
        // if (params) {
        //   // console.log(params);
        //   const str = JSON.stringify(params);
        //   config.params = encryptRsa(str);
        // }
        if (data) {
          // console.log(data);
          const str = JSON.stringify(data);
          config.data = encryptRsa(str);
          console.log(config,'axios参数修改初始登入','-5')
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        NProgress.done();
        this.destroy(url);
        // const { data, msg } = res.data;
        // const _data = typeof data === 'object' ? this.decrypt(data) : data;
        // console.log(_data);
        return res.data;
      },
      async error => {
        NProgress.done();
        this.destroy(url);
        console.log('请求完事了删除该请求队列的权限','-6')
        let { data, status } = error.response;
        if (status === 401) {
          removeToken();
          // await store.dispatch('user/logout');
          router.push(`/login`);
        }
        if (data.error && data.error.indexOf('jwt') > -1) {
          // await store.dispatch('user/logout');
          removeToken();
          router.push(`/login`);
        }
        Message.error(data.msg);
        return Promise.reject(data);
      }
    );
  }
  request (options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    console.log(options,'-7')
    return instance(options);
  }
}
export default HttpRequest;
