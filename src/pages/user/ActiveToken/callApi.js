import { getApiNoAuth } from '~/utils/api';

export async function getActiveApi(data) {
    const url = `/auth/active`;
    try {
        const res = await getApiNoAuth(url, data);
        if (res && res?.status === 200) {
            return res?.data;
        }
    } catch (error) {
        return error;
    }
}
