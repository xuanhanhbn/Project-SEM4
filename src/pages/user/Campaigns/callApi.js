import { getApiDefault } from '~/utils/api';

export async function getAllPrograms() {
    const url = 'posts?userId=1';
    try {
        const res = await getApiDefault(url);
        if (res && res?.status === 200) {
            return res?.data;
        }
    } catch (error) {
        return error;
    }
}
