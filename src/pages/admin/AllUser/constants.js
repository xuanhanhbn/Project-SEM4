import React from 'react';

export const columns = [
    {
        field: 'index',
        maxWidth: 170,
        name: 'STT',
        align: 'center',
    },
    {
        field: 'displayName',
        maxWidth: 170,
        name: 'Display name',
        isSort: true,
    },
    {
        field: 'email',
        maxWidth: 170,
        name: 'Email',
    },
    {
        field: 'phoneNumber',
        maxWidth: 100,
        name: 'Phone number',
        isSort: true,
    },
    {
        field: 'role',
        maxWidth: 100,
        name: 'Role',
        filters: [
            {
                text: 'USER',
                value: 'USER',
            },
            {
                text: 'PARTNER',
                value: 'PARTNER',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record?.role?.startsWith(value),
    },
    {
        field: 'status',
        width: 50,
        name: 'Status',
    },
    {
        field: 'actions',
        width: 50,
        name: 'Actions',
        align: 'center',
    },
];
