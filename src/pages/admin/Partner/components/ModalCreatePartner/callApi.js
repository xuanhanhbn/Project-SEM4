import { postApiDefault } from '~/utils/api';

export async function createPartnerApi(data) {
    console.log('dataAPI: ', data);
    const url = '/partner/create-partner';
    try {
        const res = await postApiDefault(url, data);
        if (res && res?.status === 200) {
            return res?.data;
        }
    } catch (error) {
        return error;
    }
}
