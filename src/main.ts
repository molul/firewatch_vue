import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css"; // vue3-openlayers version < 1.0.0-*

createApp(App).use(router).use(OpenLayersMap /* options */).mount("#app");
