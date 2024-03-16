export const tabItems = [
    {
        id: 1,
        label: 'Personal info',
        icon: <i className="mr-2 fa-regular fa-file-invoice"></i>,
    },
    {
        id: 2,
        label: 'Security',
        icon: <i className="mr-2 fa-regular fa-lock-keyhole"></i>,
    },
];

export const inputUpdateProfile = [
    {
        field: 'partnerName',
        lable: 'Company Name',
        placeholder: 'Maybank',
        type: 'INPUT',
    },
    {
        field: 'email',
        lable: 'Email Address',
        placeholder: 'maybank@gmail.com',
        type: 'INPUT',
    },
    // {
    //     field: 'phone',
    //     lable: 'Phone',
    //     placeholder: '123-45-678',
    //     pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}',
    //     type: 'INPUT_NUMBER',
    // },
    // {
    //     field: 'address',
    //     lable: 'Address',
    //     placeholder: 'House number, Street, Neighborhood, Ward, District, City',
    //     type: 'INPUT',
    // },
    // {
    //     field: 'website',
    //     lable: 'Website',
    //     placeholder: 'http://www.maybank.com',
    //     type: 'INPUT',
    // },
    {
        field: 'description',
        lable: 'Description',
        placeholder: '',
        type: 'INPUT_AREA',
    },
    // {
    //     field: 'paypal',
    //     lable: 'Paypal',
    //     placeholder: 'Paypal email',
    //     type: 'INPUT',
    // },
    // {
    //     field: 'vnpay',
    //     lable: 'Vnpay',
    //     placeholder: 'Vnpay number',
    //     type: 'INPUT',
    // },
    // {
    //     field: 'momo',
    //     lable: 'Momo',
    //     placeholder: 'Momo number',
    //     type: 'INPUT',
    // },
    {
        field: 'urlLogo',
        lable: 'Logo image',
        placeholder: '',
        type: 'INPUT_UPLOAD',
    },
    // {
    //     field: 'logo_partner',
    //     lable: 'Logo partner',
    //     placeholder: '',
    //     type: 'INPUT_UPLOAD',
    // },
];

export const inputChangePassword = [
    // {
    //     id: 1,
    //     field: 'oldPassword',
    //     label: 'Old password',
    //     placeholder: '••••••••',
    //     type: 'password',
    // },
    {
        id: 2,
        field: 'newPassword',
        label: 'New password',
        placeholder: '••••••••',
        type: 'password',
    },
    {
        id: 3,
        field: 'confirmPassword',
        label: 'Confirm password',
        placeholder: '••••••••',
        type: 'password',
    },
];

export const todayCardData = [
    {
        id: 1,
        field: 'totalMoney',
        cardName: `Total Money`,
        todayAmount: `$53,000`,
        cardIcon: <i className="fa-solid fa-money-check-dollar-pen"></i>,
    },
    {
        id: 2,
        field: 'totalFollowers',
        cardName: `Total Followers`,
        todayAmount: `2,300`,
        cardIcon: <i className="fa-solid fa-user"></i>,
    },
    {
        id: 3,
        field: 'totalDonateForPaypal',
        cardName: `Today's Paypal`,
        todayAmount: `$33,000`,
        cardIcon: <i className="fa-brands fa-cc-paypal"></i>,
    },
    {
        id: 4,
        field: 'totalDonateForVnPay',
        cardName: `Today's VNPay`,
        todayAmount: `$20,000`,
        cardIcon: <i className="fa-solid fa-credit-card"></i>,
    },
];

export const optionsChartLine = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
    interaction: {
        intersect: false,
        mode: 'index',
    },
    scales: {
        y: {
            grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
            },
            ticks: {
                display: true,
                padding: 10,
                color: '#b2b9bf',
                font: {
                    size: 11,
                    family: 'Open Sans',
                    style: 'normal',
                    lineHeight: 2,
                },
            },
        },
        x: {
            grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5],
            },
            ticks: {
                display: true,
                color: '#b2b9bf',
                padding: 20,
                font: {
                    size: 11,
                    family: 'Open Sans',
                    style: 'normal',
                    lineHeight: 2,
                },
            },
        },
    },
};

export const linePaymentData = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Paypal',
            tension: 0.4,
            // borderWidth: 0,
            pointRadius: 0,
            borderColor: '#cb0c9f',
            borderWidth: 3,
            backgroundColor: 'rgba(203,12,159,0.2)',
            fill: true,
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
            maxBarThickness: 6,
        },
        {
            label: 'Create Card',
            tension: 0.4,
            // borderWidth: 0,
            pointRadius: 0,
            borderColor: '#3A416F',
            backgroundColor: 'rgba(20,23,39,0.2)',
            borderWidth: 3,
            fill: true,
            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
            maxBarThickness: 6,
        },
    ],
};

export const columns = [
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

export const fakeDataTable = [
    {
        programName: 'Donate emergency support in Afghanistan',
        target: '$12.000',
        completion: '45%',
    },
];
