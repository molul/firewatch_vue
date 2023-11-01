import { createRouter, createWebHistory } from "vue-router";
import TableView from "../views/TableView.vue";
import MapView from "../views/MapView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MapView,
  },
  {
    path: "/tabla",
    name: "data",
    component: TableView,
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
