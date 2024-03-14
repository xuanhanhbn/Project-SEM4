import BillingPage from '~/pages/admin/Billing';
import ChatBox from '~/pages/admin/ChatBox';
import Dashboard from '~/pages/admin/Dashboard';
import Partner from '~/pages/admin/Partner';
import PartnerDetailPage from '~/pages/admin/Partner/components/PartnerDetail';
import Program from '~/pages/admin/Program';
import ProgramDetail from '~/pages/admin/Program/components/ProgramDetail';
import TablePages from '~/pages/admin/Tables';
import ChangePassword from '~/pages/user/ChangePassword';

// Public routes
const AdminRouter = [
    {
        path: '/admin/dashboard',
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
        path: '/admin/change-password',
        component: ChangePassword,
        layout: null,
    },
    {
        path: '/admin/partner/detail',
        component: PartnerDetailPage,
    },
    {
        path: '/admin/message',
        component: ChatBox,
    },
    // {
    //     path: '/admin/billing',
    //     component: BillingPage,
    // },
    {
        path: '/admin/tables',
        component: TablePages,
    },
];
const privateRoutes = [];

export { AdminRouter, privateRoutes };
