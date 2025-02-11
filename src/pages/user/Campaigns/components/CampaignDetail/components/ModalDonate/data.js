import cardIcon from '~/assets/images/logo/adyen_card_group.png';
import paypalIcon from '~/assets/images/logo/16889553131686049166paypal.png';

export const inputValueDonate = [
    {
        id: '1',
        value: '5',
        type: 'BUTTON',
    },
    {
        id: '2',
        value: '70',
        type: 'BUTTON',
    },
    {
        id: '3',
        value: '35',
        type: 'BUTTON',
    },
    {
        id: '4',
        value: '21',
        type: 'BUTTON',
    },
    {
        id: '5',
        value: '',
        type: 'INPUT',
    },
    {
        id: '6',
        value: 'Paypal',
        label: 'Paypal',
        type: 'RADIO',
        icon: paypalIcon,
    },
    {
        id: '7',
        value: 'VNPay',
        label: 'VNPay',
        type: 'RADIO',
        icon: cardIcon,
    },
];
