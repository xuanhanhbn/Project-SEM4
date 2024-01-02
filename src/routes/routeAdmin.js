import Dashboard from '~/pages/admin/Dashboard';

// Public routes
const AdminRouter = [
    {
        path: '/',
        component: Dashboard,
    },
    // {
    //     path: '/about',
    //     component: About,
    // },
];
const privateRoutes = [];

export { AdminRouter, privateRoutes };
