import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import indexRoutes from "./indexRoutes";
declare module "vue-router" {
  interface RouteMeta {
    // title: string,
    transition: string;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    component: () => import("@/views/Login.vue"),
    children: [],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/Index.vue"),
    children: indexRoutes,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: (to, from, savePosition) => {
    if (savePosition) {
      return savePosition;
    } else {
      return {
        top: 0,
      };
    }
  },
  routes,
});

export default router;
