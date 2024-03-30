import { getApiDefault } from '~/utils/api';

export async function getAllProgramApi() {
    const url = `program/list-program-by-status?name=Active&page=1&size=20`;
    try {
        const res = await getApiDefault(url);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
