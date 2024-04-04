import { getApiDefault } from '~/utils/api';

export async function getDashboard(data) {
    const url = `/dashboard/get?year=${data?.year}`;
    try {
        const res = await getApiDefault(url);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
