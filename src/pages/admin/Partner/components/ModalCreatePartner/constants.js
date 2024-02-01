export const inputCreatePartner = [
    {
        field: 'name',
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
    {
        field: 'phone',
        lable: 'Phone',
        placeholder: '123-45-678',
        pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}',
        type: 'INPUT_NUMBER',
    },
    {
        field: 'address',
        lable: 'Address',
        placeholder: 'House number, Street, Neighborhood, Ward, District, City',
        type: 'INPUT',
    },
    {
        field: 'website',
        lable: 'Website',
        placeholder: 'http://www.maybank.com',
        type: 'INPUT',
    },
    {
        field: 'describe',
        lable: 'Describe',
        placeholder: '',
        type: 'INPUT_AREA',
    },
    {
        field: 'paypal',
        lable: 'Paypal',
        placeholder: 'Paypal email',
        type: 'INPUT',
    },
    {
        field: 'vnpay',
        lable: 'Vnpay',
        placeholder: 'Vnpay number',
        type: 'INPUT',
    },
    {
        field: 'momo',
        lable: 'Momo',
        placeholder: 'Momo number',
        type: 'INPUT',
    },
    {
        field: 'logo',
        lable: 'Logo image',
        placeholder: '',
        type: 'INPUT_UPLOAD',
    },
];
