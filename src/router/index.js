import { createRouter, createWebHistory } from 'vue-router';
import Login from 'C:\\Users\\user\\Desktop\\VScode\\frontend-login\\src\\components\\login.vue';
import Network from 'C:\\Users\\user\\Desktop\\VScode\\frontend-login\\src\\components\\Network.vue';
import Signup from 'C:\\Users\\user\\Desktop\\VScode\\frontend-login\\src\\components\\Signup.vue';
import Animation2 from '../components/Animation2.vue'


window.isAuthenticated = false;


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/network_checking',
    name: 'Network_checking',
    component: Network,
    meta: { requiresAuth: true }
  },
  {
    path: '/sign_up',
    name: 'Sign_up',
    component: Signup
  },
  {
    path: '/ani',
    component: Animation,
  },
  {
    path: '/ani2',
    component: Animation2,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {

    if (!window.isAuthenticated) {
      next({ name: 'Login' }); // Example: redirect to login page
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;