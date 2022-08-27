import { createRouter, createWebHistory } from "vue-router";

import AdminDashboard from "../views/admin/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "SignIn",
    meta: { hasUser: true },
    component: () => import("../views/auth/SignIn.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/admin",
    name: "AdminIndex",
    meta: { isAdmin: true, requiresLogin: true },
    rediect: "/admin/dashboard",
    component: () => import("../views/admin/Index.vue"),
    children: [
      {
        path: "dashboard",
        name: "AdminDashboard",
        components: { AdminDashboard: AdminDashboard },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresLogin) &&
    !localStorage.getItem("auth")
  ) {
    next({ name: "SignIn" });
  } else if (
    to.matched.some((record) => record.meta.hasUser) &&
    localStorage.getItem("auth") &&
    localStorage.getItem("isAdmin")
  ) {
    next({ name: "AdminIndex" });
  } else {
    next();
  }
});
export default router;
