import { postApiNoAuth } from '~/utils/api';

export async function resetPasswordApi(data) {
    const url = `/auth/reset-password?email=${data.email}`;
    try {
        const res = await postApiNoAuth(url, data);
        console.log('res: ', res);
        return res;
    } catch (error) {
        return error;
    }
}
