import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { VueAxios } from 'vue-axios'


import 'jquery/src/jquery.js'

import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.interceptors.request.use(function (config) {
    config.headers.common = {
        'Authorization': `Bearer ${localStorage.getItem('auth')}`,
    };
    return config;
});



createApp(App).use(store).use(VueAxios, axios).use(router).mount('#app')
