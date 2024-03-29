import { getApiDefault } from '~/utils/api';

export async function getListProgram() {
    const url = 'program/list-program-by-status?name=Active&page=1&size=4';
    try {
        const res = await getApiDefault(url);
        return res;
    } catch (error) {
        return error;
    }
}
