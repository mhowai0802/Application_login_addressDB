import { createRouter, createWebHistory } from 'vue-router';
import Login from 'C:/Users/user/Desktop/VueJS/network-login/src/components/LoginPage.vue';
import Dropdown from 'C:/Users/user/Desktop/VueJS/network-login/src/App.vue';


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dropdown,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/');
  } else {
    next();
  }
});

function isLoggedIn() {
  // Implement your logic to check if the user is logged in
  // For simplicity, return true for demonstration purposes
  return true;
}

export default router;