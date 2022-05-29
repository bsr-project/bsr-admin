import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/user/list',
    name: 'UserList',
    component: () =>
      import(/* webpackChunkName: "UserList" */ '@/views/User/List.vue'),
    meta: {
      title: '用户列表'
    }
  },
  {
    path: '/mission/list',
    name: 'MissionList',
    component: () =>
      import(/* webpackChunkName: "MissionList" */ '@/views/Mission/List.vue'),
    meta: {
      title: '任务列表'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '@/views/Auth/Login.vue'),
    meta: {
      title: '登录'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
