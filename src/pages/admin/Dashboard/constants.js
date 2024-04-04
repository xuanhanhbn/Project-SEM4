export const todayCardData = [
    {
        id: 1,
        field: 'newProgramInMonth',
        cardName: `Program In Month`,
        todayAmount: `$53,000`,
        cardIcon: <i className="fa-solid fa-money-check-dollar-pen"></i>,
    },
    {
        id: 2,
        field: 'newPartnerInMonth',
        cardName: `Partner In Month`,
        todayAmount: `2,300`,
        cardIcon: <i className="fa-solid fa-user"></i>,
    },
    {
        id: 3,
        field: 'newUserInMonth',
        cardName: `User In Month`,
        todayAmount: `$33,000`,
        cardIcon: <i className="fa-solid fa-user"></i>,
    },
    // {
    //     id: 4,
    //     cardName: `Today's Card`,
    //     todayAmount: `$20,000`,
    //     cardIcon: <i className="fa-solid fa-credit-card"></i>,
    // },
];

export const totalCardData = [
    {
        id: 1,
        field: 'totalProgram',
        cardName: `Total Program`,
        todayAmount: `$53,000`,
        cardIcon: <i className="fa-solid fa-money-check-dollar-pen"></i>,
    },
    {
        id: 2,
        field: 'totalPartner',
        cardName: `Total Partner`,
        todayAmount: `2,300`,
        cardIcon: <i className="fa-solid fa-user"></i>,
    },
    {
        id: 3,
        field: 'totalUser',
        cardName: `Total User`,
        todayAmount: `$33,000`,
        cardIcon: <i className="fa-solid fa-user"></i>,
    },
    // {
    //     id: 4,
    //     cardName: `Today's Card`,
    //     todayAmount: `$20,000`,
    //     cardIcon: <i className="fa-solid fa-credit-card"></i>,
    // },
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
            data: [50, 40, 0, 0, 0, 0, 0, 0, 0],
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
    { field: 'campaignName', name: 'Campaign Name', minWidth: 270 },
    {
        field: 'target',
        name: 'Target',
        minWidth: 170,
    },

    {
        field: 'completion',
        name: 'Completion',
        minWidth: 370,
    },
];

export const fakeDataTable = [
    {
        campaignName: 'Donate emergency support in Afghanistan',
        target: '$12.000',
        completion: '45%',
    },
];
