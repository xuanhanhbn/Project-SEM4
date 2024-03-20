import { postApiDefault } from '~/utils/api';

export async function paymentReturnApi(data) {
    const url = '/api/v1/pay-return';
    try {
        const res = await postApiDefault(url, data);
        return res;
    } catch (error) {
        return error;
    }
}
