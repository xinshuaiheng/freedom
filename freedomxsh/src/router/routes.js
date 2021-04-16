/*
 * @Author: your name
 * @Date: 2021-04-14 19:21:15
 * @LastEditTime: 2021-04-15 15:28:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \freedomxsh\src\router\routes.js
 */

import Layout from '@/layout'
export default [
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/',
    name: '_dashboard',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  }
]
