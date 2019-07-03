import Vue
    from 'vue'

import Vuetify
    from 'vuetify'
import moment
    from 'moment'
import Router
    from 'vue-router'

import App
    from './App.vue'
import 'vuetify/dist/vuetify.min.css'

import VueApexCharts
    from 'vue-apexcharts'
import DataDisplay
    from "./views/DataView";
import ImportDisplay
    from "./views/ImportView";
import fr
    from "vuetify/es5/locale/fr";

Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);


Vue.config.productionTip = false;

Vue.use(Vuetify, {
    lang: {
        locales: { fr },
        current: 'fr'
    }
});

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/import'
        }, {
            path: '/import',
            name: 'import',
            component: ImportDisplay,
        }, {
            path: '/data-display',
            name: 'display',
            component: DataDisplay
        }]
});


moment.locale('fr');

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
