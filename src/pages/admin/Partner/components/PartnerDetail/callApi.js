import { getApiDefault, postApiDefault } from '~/utils/api';

export async function getAllPartnerApi() {
    const url = `/partner/get-all-partner?partnerName=&page=&size=`;
    try {
        const res = await getApiDefault(url);
        // console.log('res: ', res);
        if (res && res?.status === 200) {
            return res;
        }
    } catch (error) {
        return error;
    }
}

export async function getPartnerDetailApi(id) {
    const url = `/partner/detail-partner?id=${id}`;
    try {
        const res = await getApiDefault(url);
        if (res && res?.status === 200) {
            return res;
        }
    } catch (error) {
        return error;
    }
}

export async function createProgramApi(data) {
    const url = `/program/create-program`;
    try {
        const res = await postApiDefault(url, data);
        // console.log('res: ', res);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
