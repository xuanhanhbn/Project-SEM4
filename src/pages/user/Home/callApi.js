import { getApiDefault, getApiWithBodyDefault } from '~/utils/api';

export async function getListProgram() {
    const url = 'program/get-all-programs?name=&page=1&size=3';
    try {
        const res = await getApiDefault(url);
        return res;
    } catch (error) {
        return error;
    }
}
