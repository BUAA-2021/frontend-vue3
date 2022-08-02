import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Index.vue"),
  },
  // {
  //   path: "/team",
  //   name: "team",
  //   component: () => import("../views/team/TeamInfoView.vue"),
  // },
  {
    path: "/team/:id",
    name: "team",
    component: () => import("../views/team/TeamInfoView.vue"),
  },
  {
    path: "/team/create",
    name: "teamCreate",
    component: () => import("../views/team/TeamCreateView.vue")
  },
  {
    path: "/editor",
    name: "editor",
    component: () => import("../views/Editor.vue"),
  },
  {
    path: "/user/login",
    name: "login",
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/user/register",
    name: "register",
    component: () => import("../views/login/Register.vue"),
  },
  { 
    path: "/example1",
    name: "example1",
    component: () => import("../examples/demos/index.vue"),
  },
  { 
    path: "/example2",
    name: "example2",
    component: () => import("../examples/vseditor/index.vue"),
  },
  {
    path: "/user/profile",
    name: "profile",
    component: () => import("../views/account/Profile.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
