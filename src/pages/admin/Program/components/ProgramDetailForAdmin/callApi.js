import { getApiDefault } from '~/utils/api';

export async function onGetDetailProgram(id) {
    const url = `program/detail-program/${id}`;
    try {
        const res = await getApiDefault(url);
        return res;
    } catch (error) {
        return error;
    }
}
