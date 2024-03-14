import { postApiDefault, postApiNoAuth } from '~/utils/api';

export async function changePasswordApi(data) {
    // console.log('dataAPI: ', data);
    const url = '/user/change-password';
    try {
        const res = await postApiDefault(url, data);
        return res;
    } catch (error) {
        return error;
    }
}

export async function loginApi(data) {
    const url = '/auth/log-in';
    try {
        const res = await postApiNoAuth(url, data);
        return res;
    } catch (error) {
        return error;
    }
}
