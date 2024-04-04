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
import ThanksPage from '~/pages/user/DonateSuccess';
import PartnerDetail from '~/pages/user/Partner/components/PartnerDetail';

// Public routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/about',
        component: About,
        exact: true,
    },
    {
        path: '/campaigns',
        component: Campaigns,
        exact: true,
    },
    {
        path: '/faq',
        component: Faqs,
        exact: true,
    },
    {
        path: '/campaign-detail/:programId',
        component: CampaignDetail,
        exact: true,
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
        path: '/profile/:userId',
        component: ProfilePage,
        layout: null,
    },
    {
        path: '/partner',
        component: PartnerPage,
        // layout: null,
    },
    {
        path: '/partner/detail/:partnerId',
        component: PartnerDetail,
        // layout: null,
    },
    {
        path: '/payment-success',
        component: ThanksPage,
        layout: null,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
