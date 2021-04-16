/*
 * @Author: your name
 * @Date: 2021-04-14 09:19:24
 * @LastEditTime: 2021-04-14 18:51:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedom\freedomxsh\src\mixins\global.js
 */

import { mapGetters } from 'vuex';
export default {
  computed: {
    // 使用vuex的getter的快付方法
    ...mapGetters(['device', 'userInfo', 'dict', 'campus']),
    mobile () {
      return this.device === 'mobile';
    }
  }
};