import BillingPage from '~/pages/admin/Billing';
import ChatBox from '~/pages/admin/ChatBox';
import Dashboard from '~/pages/admin/Dashboard';
import Partner from '~/pages/admin/Partner';
import PartnerDetailPage from '~/pages/admin/Partner/components/PartnerDetail';
import Program from '~/pages/admin/Program';
import ProgramDetail from '~/pages/admin/Program/components/ProgramDetail';
import ProgramDetailForAdmin from '~/pages/admin/Program/components/ProgramDetailForAdmin';
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
        path: '/admin/program/detail/:programId',
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
        path: '/admin/partner/detail/:partnerId',
        component: PartnerDetailPage,
    },
    {
        path: '/admin/message',
        component: ChatBox,
    },
    {
        path: '/admin/program-detail-for-admin/:programId',
        component: ProgramDetailForAdmin,
    },
    {
        path: '/admin/tables',
        component: TablePages,
    },
];
const privateRoutes = [];

export { AdminRouter, privateRoutes };
