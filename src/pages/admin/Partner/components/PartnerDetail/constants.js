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
