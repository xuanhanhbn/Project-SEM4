import { postApiDefault } from '~/utils/api';

export async function changePasswordApi(data) {
    // console.log('dataAPI: ', data);
    const url = '/user/change-password';
    try {
        const res = await postApiDefault(url, data);
        if (res && res?.status === 200) {
            return res?.data;
        }
    } catch (error) {
        return error;
    }
}
