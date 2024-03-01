import { postApiNoAuth } from '~/utils/api';

export async function loginApi(data) {
    const url = '/auth/log-in';
    try {
        const res = await postApiNoAuth(url, data);
        return res;
    } catch (error) {
        return error;
    }
}
