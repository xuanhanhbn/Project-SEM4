import { getApiDefault } from '~/utils/api';

export async function getListProgram() {
    const url = 'program/get-all-programs?search=&page=1&size=3';
    try {
        const res = await getApiDefault(url);
        return res;
    } catch (error) {
        return error;
    }
}
