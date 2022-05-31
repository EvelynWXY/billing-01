import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router"; //如果是目录相当于引入的是当前目录下的 index 文件
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router, //相当于： router:router
  store,
  render: (h) => h(App),
}).$mount("#app");
