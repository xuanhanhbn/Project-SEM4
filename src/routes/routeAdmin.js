import BillingPage from '~/pages/admin/Billing';
import Dashboard from '~/pages/admin/Dashboard';
import Partner from '~/pages/admin/Partner';
import Program from '~/pages/admin/Program';
import ProgramDetail from '~/pages/admin/Program/components/ProgramDetail';
import TablePages from '~/pages/admin/Tables';

// Public routes
const AdminRouter = [
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
