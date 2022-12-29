import { createRouter, createWebHistory } from "vue-router"
import Layout from "@/views/layout/index.vue"
const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      // component: () => import("@/views/verify/index.vue"),
      meta: {
        hidden: true,
      },
      redirect: "/project",
    },
    {
      path: "/button",
      meta: {
        hidden: true,
      },
      component: Layout,
      children: [
        {
          path: "/proof/send/:type/:id",
          component: () => import("@/views/proof/send/_id.vue"),
        },
        {
          path: "/letterInfo/:type/:prjId/:prjName/:prjNo",
          component: () => import("@/views/project/LetterInfo/index.vue"),
        },
      ],
    },
    // /proof/send
    {
      path: "/project",
      name: "project",
      component: Layout,
      meta: {
        title: "项目管理",
      },
      children: [
        {
          path: "/project",
          component: () => import("@/views/project/index.vue"),
        },
        {
          path: "/createProject",
          component: () => import("@/views/project/createPro/index.vue"),
        },
        {
          path: "/createLetter",
          component: () => import("@/views/project/createLetter/index.vue"),
        },
        // {
        //   path: "/letterInfo",
        //   component: () => import("@/views/project/LetterInfo/index.vue"),
        // },
        {
          path: "/ImportRecords",
          component: () => import("@/views/project/records/index.vue"),
        },
        {
          path: "/detail",
          component: () => import("@/views/project/detail/index.vue"),
        },
        {
          path: "/statistics",
          component: () => import("@/views/project/statistics/index.vue"),
        },
      ],
    },
    {
      path: "/proof",
      name: "proof",
      redirect: "/proof/send",
      component: Layout,
      meta: {
        title: "函证管理",
        type: "grop",
      },
      children: [
        {
          path: "/proof/send",
          name: "send",
          meta: {
            title: "发函管理",
          },
          component: () => import("@/views/proof/send/index.vue"),
        },
        // {
        //   path: "/proof/accredit",
        //   name: "accredit",
        //   meta: {
        //     title: "授权管理",
        //   },
        //   component: () => import("@/views/proof/accredit/index.vue"),
        // },
        // {
        //   path: "/proof/reply",
        //   name: "reply",
        //   meta: {
        //     title: "回函管理",
        //   },
        //   component: () => import("@/views/proof/reply/index.vue"),
        // },
      ],
    },
    {
      path: "/user",
      name: "user",
      component: Layout,
      meta: {
        title: "用户管理",
      },
      children: [
        {
          path: "/user",
          component: () => import("@/views/user/index.vue"),
        },
        {
          path: "/user/edit",
          component: () => import("@/views/user/components/Edit.vue"),
        },
      ],
    },
    {
      path: "/role",
      name: "role",
      component: Layout,
      meta: {
        title: "角色管理",
      },
      children: [
        {
          path: "/role",
          component: () => import("@/views/role/index.vue"),
        },
        {
          path: "/role/edit",
          component: () => import("@/views/role/Edit.vue"),
        },
      ],
    },
    {
      path: "/log",
      name: "log",
      component: Layout,
      meta: {
        title: "日志管理",
      },
      children: [
        {
          path: "/log",
          component: () => import("@/views/log/index.vue"),
        },
      ],
    },
  ],
})

export default router
