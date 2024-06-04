import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import router from '@/router';
import { apolloProvider } from './graphql/provider';
import './style.css';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css'
import App from './App.vue';

import Menu from 'primevue/menu';

/* Components */


const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.use(apolloProvider);

app.component('Menu', Menu);

app.mount('#app');