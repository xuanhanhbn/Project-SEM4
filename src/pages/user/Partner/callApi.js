import { getApiDefault } from '~/utils/api';

export async function getAllPartnerApi() {
    const url = `/partner/get-all-partner?name=&page=0&size=0`;
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
