import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Top from "@/views/Top.vue";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const routeSettings: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Top",
    component: Top,
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () => {
      return import("@/views/SignUp.vue");
    },
    meta: {
      //サインインしてるとアクセスできない
      requiresAuth: false,
    },
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: () => {
      return import("@/views/SignIn.vue");
    },
  },
  {
    path: "/myPage",
    name: "MyPage",
    component: () => {
      return import("@/views/MyPage.vue");
    },
    meta: {
      //サインインしていないとアクセスできない
      requiresAuth: true,
    },
  },
  // {
  // 	path: "/member/detail/:id",
  // 	name: "MemberDetail",
  // 	component: () => {
  // 		return import("@/views/member/MemberDetail.vue");
  // 	},
  // 	props: (routes) => {
  // 		const idNum = Number(routes.params.id);
  // 		return {
  // 			id: idNum
  // 		};
  // 	}
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSettings,
});

// サインインしているかチェックし、していなければsignInにれダイレクトされる
// router.beforeEach((to) => {
//   const authStore = useAuthStore();
// 		const loggedIn = computed(
// 			()=>{
// 				return authStore.isLoggedIn
// 			}
// 		)
//   if (!loggedIn && to.meta.requiresAuth) {
//     return { name: "SignIn" };
//   }
// 	// else {
  //   return { name: "MyPage" };
  // }
// });

export default router;
