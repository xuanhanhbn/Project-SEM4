import Home from '~/pages/user/Home';
import About from '~/pages/user/About';
import Campaigns from '~/pages/user/Campaigns';
import Faqs from '~/pages/user/Faqs';
import CampaignDetail from '~/pages/user/Campaigns/components/CampaignDetail';
import RegisterPage from '~/pages/user/Register';
import ActiveAccount from '~/pages/user/ActiveToken';
import LoginPage from '~/pages/user/Login';
import SignUpPage from '~/pages/user/SignUp';
import ResetPasswordPage from '~/pages/user/ResetPassword';
import ForgotPasswordPage from '~/pages/user/ForgotPassword';
import ChangePassword from '~/pages/user/ChangePassword';

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
        path: '/sign-up',
        component: SignUpPage,
    },
    {
        path: '/active-acount',
        component: ActiveAccount,
    },
    {
        path: '/reset-password',
        component: ResetPasswordPage,
    },
    {
        path: '/forgot-password',
        component: ForgotPasswordPage,
    },
    {
        path: '/change-password',
        component: ChangePassword,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
