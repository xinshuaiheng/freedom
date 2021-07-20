/*
 * @Author: your name
 * @Date: 2021-04-06 16:32:15
 * @LastEditTime: 2021-04-16 15:17:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-rbac-admin\src\store\modules\permission.js
 */
// import asyncRoutesMap from '@/router/asyncRoutesMap'
// import { lazyComponent } from '@/utils/common'

const sonsTree = (obj, arr) => {
  const children = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pid === obj.id) {
      sonsTree(arr[i], arr);
      children.push(arr[i]);
    }
  }
  obj.children = children;
  console.log(obj,'动态路由子节点-16')
  return obj;
};

const toTree = data => {
  console.log(data,'获取到传入路由信息-15')
  const treeArr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].pid === 0) {
      const o = sonsTree(data[i], data);
      treeArr.push(o);
    }
  }
  console.log(treeArr,'获取到动态路由节点-17')
  return treeArr;
};

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

const toRoutes = menus => {
  let parentRoute = [
    {
      path: '/',
      component: () => import('@/layout'),
      children: []
    }
  ];
  console.log(menus,'根据isrouter存在的话添加到路由里-19')
  let childRoutes = menus
    .filter(menu => menu.isRouter)
    .map(item => {
      let path = item.path.slice(1);
      return {
        path,
        component: () => import(`@/${item.cmpPath}`),
        // component: lazyComponent(item.cmpPath),
        name: item.code,
        meta: {
          title: item.name,
          activeMenu: item.activeMenu
        }
      };
    });
  parentRoute[0].children = childRoutes;
  return parentRoute;
};

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

const actions = {
  generateRoutes ({ commit }, menus) {
    console.log({ commit }, menus,'根据传入路由参数-13')
    return new Promise(resolve => {
      commit('SET_SOURCE_MENUS', menus);
      console.log('保存来源路由信息-14')
      const accessedMenus = toTree(toMenus(menus));
      accessedMenus.unshift(commonMenus);
      console.log(accessedMenus,'添加首页-18')
      commit('SET_MENUS', accessedMenus);
      console.log('保存路由信息防止刷新删除-20')
      const accessedRoutes = toRoutes(menus);
      console.log(accessedRoutes,'整理完路由config-21')
      accessedRoutes.push(baseRoute);
      resolve(accessedRoutes);
    });
  },
  generateOperations ({ commit }, operations) {
    return commit('SET_OPERATIONS', operations);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
