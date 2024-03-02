import { getApiDefault, postApiDefault } from '~/utils/api';

export async function getAllPartnerApi() {
    const url = `partner/get-all-partner?partnerName=&page=0&size=0`;
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

export async function getApiSearchPartner(data) {
    const url = `partner/get-partner-by-search?search=${data}`;
    try {
        const res = await getApiDefault(url, data);
        if (res && res?.status === 200) {
            return res?.data;
        }
    } catch (error) {
        return error;
    }
}
