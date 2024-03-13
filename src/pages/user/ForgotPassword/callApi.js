import { getApiNoAuth } from '~/utils/api';

export async function forgotPasswordApi(data) {
    const url = `/auth/forgot-password?email=${data.email}`;
    try {
        const res = await getApiNoAuth(url, data);
        // console.log('res: ', res);
        return res;
    } catch (error) {
        return error;
    }
}
