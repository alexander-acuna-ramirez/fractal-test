import HomePage from '@/pages/HomePage.vue';
import Page2 from '@/pages/Page2.vue';
import Page3 from '@/pages/Page3.vue';
import DefaulLayout from '@/layouts/DefaultLayout.vue';
const routes = [
    { 
        path: '/',
        component: DefaulLayout,
        redirect: 'home',
        children: [
            {
                path: 'home',
                name: 'HomePage',
                component: HomePage,
            },
            {
                path: 'stadistics',
                name: 'StadisticsPage',
                component: Page2
            },
            {
                path: 'news',
                name: 'NewsPage',
                component: Page3
            }
        ]
    }
];

export default routes;