import { getApiDefault } from '~/utils/api';

export async function getAllPartnerApi(id) {
    const url = `/partner/get-partner?id=${id}`;
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
