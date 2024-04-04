import { getApiDefault, postApiDefault } from '~/utils/api';

export async function getAllUserApi(data) {
    const url = `user/get-all-user?name=${data?.name}&page=${data?.page}&size=${data?.size}`;
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

export async function blockUserApi(data) {
    // console.log('dataAPI: ', data);
    const url = `/user/toggle-lock-user?email=${data?.email}&value=${data?.value}`;
    try {
        const res = await getApiDefault(url);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
