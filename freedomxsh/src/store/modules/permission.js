/*
 * @Author: your name
 * @Date: 2021-04-15 11:25:37
 * @LastEditTime: 2021-04-15 13:45:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedomxsh\src\store\modules\permission.js
 */

import { reject, resolve } from 'core-js/fn/promise';

 const sonsTree = (obj,arr)=>{
   const children=[];
   for(let i = 0 ;i<arr.lenght;i++){
     if(arr[i].pid===obj.id){
       sonsTree(arr[i],arr)
       children.push(arr[i])
     }
   }
   obj.children = children
   return obj
 }


 const toTree = data=>{
   const treeArr=[]
   for(let i =0;i<data.lenght;i++){
     if(data[i].pid===0){
       const arr = sonsTree(data[i],data)
       treeArr.push(arr)
    }
   }
   return treeArr
 }
 const toMenus = menus =>
   menus.map(item => ({
     name: item.name,
     code: item.code,
     icon: item.icon,
     path: item.path,
     hidden: !!item.hidden,
     pid: item.pid,
     id: item.id
   }));

   const toRoutes = menus =>{
    let parentRoute = [
      {
        path: '/',
        // component: () => import('@/layout'),
        children: []
      }
    ];
    let childRoutes = menus.filter(menus=>menus.isRouter)
    .map(item=>{
      let path = item.path.slice(1)
      return {
        path,
        component:()=>import(`@/${item.cmpPath}`),
        name:item.code,
        meta: { 
          title:item.name,
          activeMenu: item.activeMenu
         }
      }
    })
    parentRoute[0].children = childRoutes;
    return parentRoute;
   }
   const baseRoute = { path: '*', redirect: '/404', hidden: true };
const commonMenus = {
  name: '首页',
  icon: 'dashboard',
  hidden: false,
  path: '/dashboard'
};

const state = {
  menus: [],
  addRoutes: [],
  operations: [],
  sourceMenus: []
};
const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
  SET_OPERATIONS: (state, operations) => {
    state.operations = operations;
  },
  SET_SOURCE_MENUS: (state, menus) => {
    state.sourceMenus = menus;
  }
};
const actions={
  generateRoutes({commit},menus){
    return new Promise ((resolve,reject)=>{
      commit('SET_SOURCE_MENUS',menus)
      const accessdMenus = toTree(toMenus(menus))
      accessdMenus.unshift(commonMenus)
      commit('SET_MENUS',accessdMenus)
      const accessedRoutes = toRoutes(menus);
      console.log(accessedRoutes,'整理完路由config-21')
      accessedRoutes.push(baseRoute);
      resolve(accessedRoutes);
    })
  },
  generateOperations ({ commit }, operations) {
    return commit('SET_OPERATIONS', operations);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};