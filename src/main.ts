import Vue from 'vue'
import Vuex from "vuex";
import App from './App.vue'

import VueRouter from 'vue-router'
import Index from "@/views/Index.vue";
import History from "@/views/History.vue";
import StoreIndex from "@/store";

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '',
        name: 'index',
        component: App,
        meta: {title: 'Список'},
        children: [
            {
                path: '',
                name: `index`,
                component: Index,
                meta: {title: 'Список'}
            },
            {
                path: 'history/:type?',
                name: `history`,
                component: History,
                meta: {title: 'История'}
            },
        ]
    }]
})

const store = new Vuex.Store({
    modules:{
        StoreIndex: StoreIndex
    }
})

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
