export const inputEditProgram = [
    {
        field: 'programName',
        lable: 'Program name',
        type: 'INPUT_NAME',
    },

    {
        field: 'startDate',
        lable: 'Start date',
        type: 'INPUT_DATE',
    },
    {
        field: 'endDate',
        lable: 'End date',
        type: 'INPUT_DATE',
    },
    {
        field: 'finishDate',
        lable: 'Finish date',
        type: 'INPUT_DATE',
    },

    {
        field: 'programDescription',
        lable: 'Program description',
        type: 'INPUT_AREA',
    },
    {
        field: 'programThumbnailBannerId',
        lable: 'Upload banner image',
        type: 'INPUT_UPLOAD',
    },
    {
        field: 'programThumbnailCarouselId',
        lable: 'Upload carousel image',
        type: 'INPUT_UPLOAD',
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
