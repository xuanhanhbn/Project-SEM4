import BillingPage from '~/pages/admin/Billing';
import ChatBox from '~/pages/admin/ChatBox';
import Dashboard from '~/pages/admin/Dashboard';
import LoginPage from '~/pages/admin/Login';
import Partner from '~/pages/admin/Partner';
import Program from '~/pages/admin/Program';
import ProgramDetail from '~/pages/admin/Program/components/ProgramDetail';
import TablePages from '~/pages/admin/Tables';
import RegisterPage from '~/pages/admin/Register';

// Public routes
const AdminRouter = [
    {
        path: '/',
        component: LoginPage,
    },
    {
        path: '/register',
        component: RegisterPage,
    },
    {
        path: '/admin/dasboard',
        component: Dashboard,
    },
    {
        path: '/admin/program',
        component: Program,
    },
    {
        path: '/admin/program/detail',
        component: ProgramDetail,
    },
    {
        path: '/admin/partner',
        component: Partner,
    },
    {
        path: '/admin/message',
        component: ChatBox,
    },
    {
        path: '/admin/billing',
        component: BillingPage,
    },
    {
        path: '/admin/tables',
        component: TablePages,
    },
];
const privateRoutes = [];

export { AdminRouter, privateRoutes };
