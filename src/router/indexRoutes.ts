export default [
  {
    path: "",
    name: "myInfo",
    component: () => import("@/views/MyInfo.vue"),
    meta: {
      transition: "animate__slideInRight",
      transitionOut: "animate__slideOutLeft",
    },
  },
  {
    path: "myInfo",
    name: "myInfo",
    component: () => import("@/views/MyInfo.vue"),
    meta: {
      transition: "animate__slideInRight",
      transitionOut: "animate__slideOutLeft",
    },
  },
  {
    path: "/todos",
    name: "todos",
    component: () => import("@/views/Todos.vue"),
    meta: {
      transition: "animate__slideInRight",
      transitionOut: "animate__slideOutLeft",
    },
  },
  {
    path: "/blogs",
    name: "blogs",
    component: () => import("@/views/Blogs.vue"),
    meta: {
      transition: "animate__slideInRight",
      transitionOut: "animate__slideOutLeft",
    },
  },
  {
    path: "/paperwall",
    name: "paperwall",
    component: () => import("@/views/Paperwall.vue"),
    meta: {
      transition: "animate__slideInRight",
      transitionOut: "animate__slideOutLeft",
    },
  },
  {
    path: "/newblog",
    name: "newblog",
    component: () => import("@/views/Newblog.vue"),
    meta: {
      transition: "animate__slideInRight",
      transitionOut: "animate__slideOutLeft",
    },
  },

  {
    path: "/detailBlog",
    name: "detailBlog",
    component: () => import("@/components/common/DetailBlog.vue"),
    meta: {
      transition: "animate__slideInRight",
      transitionOut: "animate__slideOutLeft",
    },
  },
  {
    path: "/echarts",
    name: "echarts",
    component: () => import("@/views/Echarts.vue"),
    meta: {
      transition: "animate__backInRight",
      transitionOut: "animate__slideOutLeft",
    },
  },
];
