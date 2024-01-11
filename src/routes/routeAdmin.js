import Dashboard from '~/pages/admin/Dashboard';
import Partner from '~/pages/admin/Partner';
import Program from '~/pages/admin/Program';

// Public routes
const AdminRouter = [
    {
        path: '/admin',
        component: Dashboard,
    },
    {
        path: '/admin/program',
        component: Program,
    },
    {
        path: '/admin/partner',
        component: Partner,
    },
];
const privateRoutes = [];

export { AdminRouter, privateRoutes };
