import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import animate from './utils/animate'
import virtual from "./utils/virtual"
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import vRegion from 'v-region';
import reg from './utils/reg'
import axios from './http/http';
Vue.prototype.axios=axios;
Vue.use(vRegion);
Vue.prototype.animate = animate;
Vue.prototype.virtual = virtual;
Vue.prototype.reg=reg
// swiper引用
import swiper from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'
import personbar from './components/person/personbar'
Vue.use(swiper);
Vue.use(elementui);
//数字滚动
import countto from 'vue-count-to';
Vue.component('countTo',countto);
Vue.config.productionTip = false
import headers from './components/header.vue';
Vue.component('headers', headers);
Vue.component('personbar', personbar);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')