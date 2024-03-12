import { getApiDefault } from '~/utils/api';

export async function logoutApi(data) {
    const url = '/auth/log-out';
    try {
        const res = await getApiDefault(url);
        return res;
    } catch (error) {
        return error;
    }
}
