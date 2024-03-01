import Home from '~/pages/user/Home';
import About from '~/pages/user/About';
import Campaigns from '~/pages/user/Campaigns';
import Faqs from '~/pages/user/Faqs';
import CampaignDetail from '~/pages/user/Campaigns/components/CampaignDetail';
import RegisterPage from '~/pages/user/Register';
// import InputToken from '~/pages/user/Register/components/InputTocken';
// import ActiveTocken from '~/pages/user/ActiveToken';
import ActiveAccount from '~/pages/user/ActiveToken';
import LoginPage from '~/pages/user/Login';
import SignInPage from '~/pages/user/SignIn';

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
        path: '/log-in',
        component: LoginPage,
    },
    {
        path: '/sign-in',
        component: SignInPage,
    },
    {
        path: '/active-acount',
        component: ActiveAccount,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
