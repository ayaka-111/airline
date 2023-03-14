import {createRouter, createWebHistory} from "vue-router";
import type {RouteRecordRaw} from "vue-router";
import Top from "@/views/Top.vue";

const routeSettings: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Top",
		component: Top
	},
	{
		path: "/login",
		name: "Login",
		component: () => {
			return import("@/views/Login.vue");
		}
	},
  {
		path: "/signUp",
		name: "SignUp",
		component: () => {
			return import("@/views/SignUp.vue");
		}
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
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routeSettings
})

export default router
