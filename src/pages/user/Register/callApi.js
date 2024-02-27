import { postApiNoAuth, getApiNoAuth } from '~/utils/api';

export async function registerApi(data) {
    const url = '/auth/register';
    try {
        const res = await postApiNoAuth(url, data);
        console.log('res: ', res);
        return res;
    } catch (error) {
        return error;
    }
}

export async function loginApi(data) {
    const url = '/auth/log-in';
    try {
        const res = await postApiNoAuth(url, data);
        if (res && res?.status === 200) {
            return res?.data;
        }
    } catch (error) {
        return error;
    }
}

// export async function getActiveApi(code, email) {
//     const url = `/auth/active?code=${code}&email=${email}`;
//     try {
//         const res = await getApiNoAuth(url);
//         if (res && res?.status === 200) {
//             return res?.data;
//         }
//     } catch (error) {
//         return error;
//     }
// }
