/*
 * @Author: your name
 * @Date: 2021-04-15 11:10:21
 * @LastEditTime: 2021-04-21 16:23:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedomxsh\src\store\modules\user.js
 */
import { login, logout, getUserInfo } from '@/api/user';
// import { Message } from 'element-ui'
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';
import { reject, resolve } from 'core-js/fn/promise';

const state = {
  token: getToken(),
  isGetPermission: false,
  userInfo: {},
  companyInfo: {},
  showEditPwd: false
};

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token;
  },
  SET_USER_INFO (state, info) {
    state.userInfo = info;
  },
  SET_COMPANY_INFO (state, info) {
    state.companyInfo = info;
  },
  SET_DICT (state, dict) {
    state.dict = dict;
  },
  SET_IS_GET_PERMISSION (state, val) {
    state.isGetPermission = val;
  },
  SET_SHOW_EDIT_PWD (state, val) {
    state.showEditPwd = val;
  }
};

const actions={
  login({commit},userInfo){
    const{username,uuid,...rest} =userInfo
    return new Promise((resolve,reject)=>{
      login({username:username.trim(),...rest},uuid)
      .then(res=>{
        const{data}=res;
        commit('SET_TOKEN',data.token)
        setToken(data.token)
        resolve()
      })
      .catch(error=>{
        reject(error)
      })
    })
  },
  userInfo({commit}){
    return new Promise((resolve,reject)=>{
      getUserInfo().then(res=>{
        let {data}=res
        commit('SET_USER_INFO', data.user);
        commit('SET_IS_GET_PERMISSION', true);
        if (data.user && data.user.isInitPwd) {
          commit('SET_SHOW_EDIT_PWD', true);
        }
        if (data.user.type === 3) {
          commit('SET_COMPANY_INFO', data.company);
        }
        resolve(data);
      })
      .catch(error=>{
        reject(error)
      })
    })
  },
  showEditPwd ({ commit }, value) {
    commit('SET_SHOW_EDIT_PWD', value);
  },
  logout({commit}){
    return new Promise ((resolve,reject)=>{
      if(!getToken()){
        commit('SET_TOKEN', '');
        commit('SET_IS_GET_PERMISSION', false);
        removeToken()
        resetRouter()
        resolve()
        return
      }
       login().then(()=>{
        commit('SET_TOKEN', '');
        commit('SET_IS_GET_PERMISSION', false);
        removeToken()
        resetRouter()
        resolve()
       })
       .catch(error => {
        reject(error);
      });
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};