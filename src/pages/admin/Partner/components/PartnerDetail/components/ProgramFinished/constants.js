export const columns = [
    { field: 'index', name: 'STT', minWidth: 80, align: 'center' },
    { field: 'programName', name: 'Program Name', minWidth: 270 },
    {
        field: 'createdAt',
        name: 'Created At',
        minWidth: 50,
    },
    {
        field: 'finishDate',
        name: 'Finish Date',
        minWidth: 50,
    },
    {
        field: 'target',
        name: 'Target',
        minWidth: 100,
    },
    {
        field: 'totalMoney',
        name: 'Total Money',
        minWidth: 100,
    },
    {
        field: 'status',
        name: 'Status',
        minWidth: 50,
    },
    {
        field: 'completion',
        name: 'Completion',
        minWidth: 370,
    },
    {
        field: 'actions',
        name: 'Actions',
        minWidth: 50,
        align: 'center',
    },
];

export const columnsPartnerTable = [
    {
        field: 'index',
        maxWidth: 170,
        name: 'STT',
        align: 'center',
    },
    {
        field: 'programName',
        maxWidth: 170,
        name: 'Program',
    },
    {
        field: 'status',
        maxWidth: 170,
        name: 'Status',
    },
    // {
    //     field: 'partner',
    //     maxWidth: 170,
    //     name: 'Partner',
    // },
    {
        field: 'target',
        maxWidth: 170,
        name: 'Target',
    },
    // {
    //     field: 'action',
    //     maxWidth: 170,
    //     name: '',
    // },
];

export const dataTablePrograms = [
    {
        programName: '1Program name',
        partner: 'FaceBook 1',
        target: '$10000',
    },
];
