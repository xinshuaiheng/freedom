/*
 * @Author: your name
 * @Date: 2021-04-15 13:25:02
 * @LastEditTime: 2021-04-15 14:07:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedomxsh\src\directive\permission\permission.js
 */
import store from '@/store'

export default {
  inserted (el, binding, vnode) {
    const { value } = binding
    const permissionOperations = store.getters && store.getters.permissionOperations
    if (value && typeof (value) === 'string') {
      const hasPermission = permissionOperations.includes(value)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`权限配置错误！`)
    }
  }
}
