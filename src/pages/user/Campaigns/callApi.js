import { getApiDefault } from '~/utils/api';

export async function getAllPrograms() {
    const url = '/program/get-all-programs?name=&page=0&size=0';
    try {
        const res = await getApiDefault(url);
        if (res && res?.status === 200) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
