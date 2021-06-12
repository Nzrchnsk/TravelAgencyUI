import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/places',
    name: 'placeList',
    component: () => import('../views/places/placesList'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/login'),
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/auth/registration'),
  },
  {
    path: '/places/:placeId',
    name: 'placeEdit',
    component: () => import('../views/places/editPlace'),
    props: true,
  },
  {
    path: '/places/add',
    name: 'placeAdd',
    component: () => import('../views/places/editPlace'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
