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
import ProfilePage from '~/pages/user/Profile';
import PartnerPage from '~/pages/user/Partner';
import PartnerDetailPage from '~/pages/user/Partner/components/PartnerDetail';
import ThanksPage from '~/pages/user/DonateSuccess';

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
        layout: null,
    },
    {
        path: '/login',
        component: LoginPage,
        layout: null,
    },
    {
        path: '/sign-up',
        component: SignUpPage,
        layout: null,
    },
    {
        path: '/active-acount',
        component: ActiveAccount,
    },
    {
        path: '/reset-password',
        component: ResetPasswordPage,
        layout: null,
    },
    {
        path: '/forgot-password',
        component: ForgotPasswordPage,
        layout: null,
    },
    {
        path: '/change-password',
        component: ChangePassword,
        layout: null,
    },
    {
        path: '/profile',
        component: ProfilePage,
        // layout: null,
    },
    {
        path: '/partner',
        component: PartnerPage,
        // layout: null,
    },
    {
        path: '/partner/detail',
        component: PartnerDetailPage,
        // layout: null,
    },
    {
        path: '/payment-success',
        component: ThanksPage,
        // layout: null,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
