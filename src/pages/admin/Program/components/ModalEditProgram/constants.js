export const inputCreateProgram = [
    // {
    //     field: 'tagName',
    //     lable: 'Tag name',
    //     type: 'SELECT',
    // },
    {
        field: 'partner',
        lable: 'Partner',
        type: 'SELECT',
    },
    {
        field: 'recruitCollaborators',
        lable: 'Recruit Collaborators',
        type: 'CHECK_BOX',
    },
    {
        field: 'programName',
        lable: 'Program name',
        type: 'INPUT_NAME',
    },
    {
        field: 'target',
        lable: 'Target',
        type: 'INPUT_AMOUNT',
    },
    {
        field: 'startDate',
        lable: 'Start date',
        type: 'INPUT_DATE',
    },
    // {
    //     field: 'endDate',
    //     lable: 'End date',
    //     type: 'INPUT_DATE',
    // },
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
];

export const INPUT_EDIT_PROGRAM = [
    {
        field: 'partnerName',
        lable: 'Partner',
        type: 'INPUT',
        disabled: true,
        width: '50%',
    },
    {
        field: 'recruitCollaborators',
        lable: 'Recruit Collaborators',
        type: 'CHECK_BOX',
        disabled: true,
        width: '50%',
    },
    {
        field: 'programName',
        lable: 'Program Name',
        type: 'INPUT',
        disabled: true,
        width: '50%',
    },
    {
        field: 'target',
        lable: 'Target',
        type: 'INPUT_AMOUNT',
        disabled: true,
        width: '50%',
    },
    {
        field: 'startDonateDate',
        lable: 'Start date',
        type: 'INPUT_DATE',
        disabled: true,
        width: '50%',
    },
    {
        field: 'finishDate',
        lable: 'Finish date',
        type: 'INPUT_DATE',
        disabled: false,
        width: '50%',
    },
    {
        field: 'description',
        lable: 'Program description',
        type: 'INPUT_AREA',
        width: '100%',
        disabled: true,
    },
];
