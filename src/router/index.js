import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserList from '../views/UserList.vue'
import Aiface from '../views/Aiface.vue'
import AiDetect from '../views/AiDetect.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/userList',
    name: 'userList',
    component: UserList
  },
  {
    path: '/aiface',
    name: 'aiface',
    component: Aiface
  },
  {
    path: '/aidetect',
    name: 'AiDetect',
    component: AiDetect
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
