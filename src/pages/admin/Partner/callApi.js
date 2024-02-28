import { getApiDefault } from '~/utils/api';

export async function getAllPartnerApi() {
    const url = 'partner/get-all-partner';
    try {
        const res = await getApiDefault(url);
        if (res && res?.status === 200) {
            return res?.data;
        }
    } catch (error) {
        return error;
    }
}
