import { createApp } from "vue";
import App from "./App.vue";
import Toast from "vue-toastification";
import router from "./router";
import store from "./store";
import "flowbite";
import "./assets/css/app.css";
import "vue-toastification/dist/index.css";
import "tw-elements";
import "animate.css";
const app = createApp(App);
const options = {
 position: "top-right",
 timeout: 3000,
 closeOnClick: true,
 pauseOnFocusLoss: false,
 pauseOnHover: true,
 showCloseButtonOnHover: false,
 hideProgressBar: true,
 closeButton: false,
 icon: true,
 rtl: false,
 maxToasts: 3,
 transition: "Vue-Toastification__fade",
 newestOnTop: true,
};
app.use(store);
app.use(router);
app.use(Toast, options);
app.mount("#app");
