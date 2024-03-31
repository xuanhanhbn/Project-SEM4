import { getApiDefault } from '~/utils/api';

export async function getAllProgramApi(data) {
    const url = `program/list-program-by-status?partnerId=${data?.partnerId}&name=${data?.name}&page=${data?.page}&size=${data?.size}`;
    try {
        const res = await getApiDefault(url);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
