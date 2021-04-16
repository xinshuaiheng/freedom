/*
 * @Author: your name
 * @Date: 2021-04-13 14:01:14
 * @LastEditTime: 2021-04-15 14:38:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedomxsh\src\store\index.js
 */
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters"
Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
const store1 = new Vuex.Store({
  getters,
  modules
})
export default store1
