import { getApiDefault } from '~/utils/api';

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

export async function getPartnerDetailApi() {
    const url = `/partner/detail-partner`;
    try {
        const res = await getApiDefault(url);
        console.log('res: ', res);
        if (res && res?.status === 200) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
