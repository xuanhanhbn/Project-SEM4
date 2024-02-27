import { getApiDefault } from '~/utils/api';

export async function getAllPartnerApi(data) {
    const url = '/get-all-partner';
    try {
        const res = await getApiDefault(url, data);
        if (res && res?.status === 200) {
            return res?.data;
        }
    } catch (error) {
        return error;
    }
}
