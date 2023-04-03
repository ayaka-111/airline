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
	{
    path: "/guest",
    name: "GuestInfo",
    component: () => {
      return import("@/views/guest/GuestInfo.vue");
    },
  },
	{
    path: "/reference",
    name: "Reference",
    component: () => {
      return import("@/views/guest/Reference.vue");
    },
  },
	{
    path: "/referenceForm",
    name: "ReferenceForm",
    component: () => {
      return import("@/views/guest/ReferenceForm.vue");
    },
  },
	{
    path: "/completed",
    name: "Completed",
    component: () => {
      return import("@/views/reservation/Completed.vue");
    },
  },
	{
    path: "/confirmation",
    name: "Confirmation",
    component: () => {
      return import("@/views/reservation/Confirmation.vue");
    },
  },
	{
    path: "/finalConfirmation",
    name: "FinalConfirmation",
    component: () => {
      return import("@/views/reservation/FinalConfirmation.vue");
    },
  },
	{
    path: "/searchResult",
    name: "SearchResult",
    component: () => {
      return import("@/views/reservation/SearchResults.vue");
    },
  },
  {
    path: "/passenger",
    name: "PassengerInfo",
    component: () => {
      return import("@/views/reservation/PassengerInfo.vue");
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

router.beforeEach((to, from, next) => {
  router['referrer'] = from;
  next()
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
