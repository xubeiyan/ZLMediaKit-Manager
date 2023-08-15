import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import ServerStatus from '../views/ServerStatus.vue';
import About from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/serverstatus',
    name: 'ServerStatus',
    component: ServerStatus,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router