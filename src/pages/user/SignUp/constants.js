export const inputRegister = [
    {
        field: 'email',
        placeholder: 'Email',
        type: 'email',
    },
    {
        field: 'displayName',
        placeholder: 'User name',

        type: 'text',
    },
    {
        field: 'birthDate',
        placeholder: 'Date of birth',

        type: 'BIRTH_DATE',
    },
    {
        field: 'password',
        placeholder: 'Password',
        type: 'password',
    },
    {
        field: 'confirmPassword',
        placeholder: 'Confirm password',
        type: 'password',
    },
    {
        field: 'phoneNumber',
        placeholder: 'Phone Number',

        type: 'text',
    },
    {
        field: 'avatarUrl',
        lable: 'Avatar image',
        placeholder: '',
        type: 'INPUT_UPLOAD',
    },
];

export const inputLogin = [
    {
        field: 'email',
        placeholder: 'Email',
        icon: <i className="fa-solid fa-envelope"></i>,
        type: 'email',
    },
    {
        field: 'password',
        placeholder: 'Password',
        icon: <i className="fa-solid fa-lock"></i>,
        type: 'password',
    },
];
