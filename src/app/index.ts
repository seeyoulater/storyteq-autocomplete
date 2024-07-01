import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { setupStore } from "./providers/store";

const store = setupStore()

createApp(App)
    .use(store)
    .mount("#app");
