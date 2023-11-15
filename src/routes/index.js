import Home from '~/pages/Home';
import About from '~/pages/About';
import Campaigns from '~/pages/Campaigns';
import Faqs from '~/pages/Faqs';

// Public routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/campaigns',
        component: Campaigns,
    },
    {
        path: '/faq',
        component: Faqs,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
