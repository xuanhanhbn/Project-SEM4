import { getApiDefault, postApiNoAuth } from '~/utils/api';

export async function loginApi(data) {
    const url = '/auth/log-in';
    try {
        const res = await postApiNoAuth(url, data);
        return res;
    } catch (error) {
        return error;
    }
}

export async function getMeApi() {
    const url = '/user/get-me';
    try {
        const res = await getApiDefault(url);
        return res;
    } catch (error) {
        return error;
    }
}
