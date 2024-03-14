import { postApiImageDefault, postApiNoAuth } from '~/utils/api';

export async function registerApi(data) {
    const url = '/auth/register';
    try {
        const res = await postApiNoAuth(url, data);
        // console.log('res: ', res);
        return res;
    } catch (error) {
        return error;
    }
}

export async function uploadAvatarApi(data) {
    // console.log('dataAPI: ', data);
    const url = '/attachment/upload';
    try {
        const res = await postApiImageDefault(url, data);
        return res;
    } catch (error) {
        return error;
    }
}
