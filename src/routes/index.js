import Home from '~/pages/user/Home';
import About from '~/pages/user/About';
import Campaigns from '~/pages/user/Campaigns';
import Faqs from '~/pages/user/Faqs';
import CampaignDetail from '~/pages/user/Campaigns/components/CampaignDetail';
import RegisterPage from '~/pages/user/Register';
import InputToken from '~/pages/user/Register/components/InputTocken';

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
    {
        path: '/campaign-detail',
        component: CampaignDetail,
    },
    {
        path: '/register',
        component: RegisterPage,
    },
    {
        path: '/active-acount',
        component: InputToken,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
