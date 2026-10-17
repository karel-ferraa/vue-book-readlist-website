import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: "/",
		name: "index",
		component: () => import("../views/HomeView.vue"),
	},
	{
		path: "/home",
		name: "home",
		component: () => import("../views/HomeView.vue"),
	},
	{
		path: "/favorites",
		name: "favorites",
		component: () => import("../views/HomeView.vue"),
	},
	{
		path: "/explore",
		name: "explore",
		component: () => import("../views/ExploreView.vue"),
	},
	{
		path: "/not-found",
		name: "not-found",
		component: () => import("../views/NotFound.vue"),
	},
	{
		path: "/:catchAll(.*)",
		name: "not-found",
		component: () => import("../views/NotFound.vue"),
	},
]
const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
