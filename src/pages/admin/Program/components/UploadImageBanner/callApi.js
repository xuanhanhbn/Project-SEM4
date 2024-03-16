import { postApiImageDefault } from '~/utils/api';

export async function uploadProgramBannerApi(data) {
    // console.log('dataAPI: ', data);
    const url = '/attachment/upload';
    try {
        const res = await postApiImageDefault(url, data);
        return res;
    } catch (error) {
        return error;
    }
}
