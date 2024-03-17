export const sideBarList = [
    {
        id: 1,
        tabName: 'Dashboard',
        type: 'TAB_ITEM',
        tabIcon: <i className="fa-duotone fa-chart-simple "></i>,
        path: '/admin/dashboard',
        role: ['ADMIN'],
    },

    // {
    //     id: 3,
    //     tabName: 'Tables',
    //     type: 'TAB_ITEM',
    //     tabIcon: <i className="fa-regular fa-table-tree"></i>,
    //     path: '/admin/tables',
    // },
    // {
    //     id: 4,
    //     tabName: 'Billing',
    //     type: 'TAB_ITEM',
    //     tabIcon: <i className="fa-duotone fa-credit-card"></i>,
    //     path: '/admin/billing',
    // },

    {
        id: 5,
        tabName: 'ACCOUNT PAGES',
        type: 'TABTITLE',
        tabIcon: '',
        role: ['PARTNER'],
    },
    {
        id: 2,
        tabName: 'Partner',
        type: 'TAB_ITEM',
        tabIcon: <i className="fa-regular fa-handshake"></i>,
        path: '/admin/partner',
        role: ['ADMIN', 'PARTNER'],
    },
    {
        id: 7,
        tabName: 'Message',
        type: 'TAB_ITEM',
        tabIcon: <i className="fa-brands fa-rocketchat"></i>,
        path: '/admin/message',
        role: ['PARTNER'],
    },
    {
        id: 6,
        tabName: 'Program',
        type: 'TAB_ITEM',
        tabIcon: <i className="fa-duotone fa-diagram-project"></i>,
        path: '/admin/program',
        role: ['ADMIN'],
    },
];
