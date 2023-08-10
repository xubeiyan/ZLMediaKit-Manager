import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import ServerConfig from '../views/ServerConfig.vue';
import About from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/serverconfig',
    name: 'ServerConfig',
    component: ServerConfig,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router