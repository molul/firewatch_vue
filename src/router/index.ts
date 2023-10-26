import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MapView from "../views/MapView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/mapa",
    name: "mapa",
    component: MapView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
