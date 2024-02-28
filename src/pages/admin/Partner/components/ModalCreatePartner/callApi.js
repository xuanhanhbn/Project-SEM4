import { postApiDefault, postApiImageDefault } from '~/utils/api';

export async function createPartnerApi(data) {
    // console.log('dataAPI: ', data);
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

export async function uploadPartnerLogoApi(data) {
    console.log('dataAPI: ', data);
    const url = '/partner/upload';
    try {
        const res = await postApiImageDefault(url, data);
        return res;
        // if (res && res?.status === 200) {
        //     return res?.data;
        // }
    } catch (error) {
        return error;
    }
}
