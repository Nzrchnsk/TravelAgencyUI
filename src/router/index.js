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
    path: '/places',
    name: 'placeList',
    component: () => import('../views/places/placesList'),
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
  {
    path: '/trips',
    name: 'tripsList',
    component: () => import('../views/trips/tripsList'),
  },
  {
    path: '/trips/:tripId',
    name: 'tripEdit',
    component: () => import('../views/trips/editTrip'),
    props: true,
  },
  {
    path: '/trips/add',
    name: 'tripAdd',
    component: () => import('../views/trips/editTrip'),
    props: true,
  },
  {
    path: '/users',
    name: 'usersList',
    component: () => import('../views/users/userssList'),
    props: true,
  },
  {
    path: '/buy_ticket/:tripId',
    name: 'buyTicket',
    component: () => import('../views/trips/buyTicket'),
    props: true,
  },
  {
    path: '/tickets',
    name: 'ticketsList',
    component: () => import('../views/tickets/ticketList'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
