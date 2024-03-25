import { getApiDefault, postApiDefault } from '~/utils/api';

export async function getAllPartnerApi() {
    const url = `partner/get-all-partner?name=&page=1&size=20`;
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
            return res;
        }
    } catch (error) {
        return error;
    }
}

export async function createPartnerApi(data) {
    // console.log('dataAPI: ', data);
    const url = '/partner/create-partner';
    try {
        const res = await postApiDefault(url, data);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}

export async function blockPartnerApi(id) {
    // console.log('dataAPI: ', data);
    const url = `/partner/block-partner?id=${id}`;
    try {
        const res = await getApiDefault(url);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
