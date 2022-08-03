import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/teamInfo",
    name: "teamInfo",
    component: () => import("../views/team/TeamInfoView.vue"),
  },
  {
    path: "/team/create",
    name: "teamCreate",
    component: () => import("../views/team/TeamCreateView.vue")
  },
  {
    path: '/team/list',
    name: "teamList",
    component: () => import("../views/team/TeamListView.vue")
  },
  {
    path: "/project/manage",
    name: "projectManage",
    component: () => import("../views/project/projectManage.vue")
  },
  {
    path: "/project/recycle",
    name: "projectRecycle",
    component: () => import("../views/project/projectRecycle.vue"),
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
    path: "/proto",
    name: "Proto",
    component: () => import("../examples/vseditor/index.vue"),
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
