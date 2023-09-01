import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';
import Ocr from '@/views/Ocr.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/ocr',
    component: Ocr
  },
  // {
  //   path: '/guide/:locale',
  //   redirect: () => {
  //     window.location.href = 'https://github.com';
  //   }
  // },
  {
    // Not found
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
