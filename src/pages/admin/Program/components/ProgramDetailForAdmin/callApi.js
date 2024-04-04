import { getApiDefault, postApiDefault } from '~/utils/api';

export async function onGetDetailProgram(id) {
    const url = `program/detail-program/${id}`;
    try {
        const res = await getApiDefault(url);
        return res;
    } catch (error) {
        return error;
    }
}

export async function extendProgramApi(data) {
    try {
        const { id, ...rest } = data;
        const url = `/program/extend-program/${id}`;
        const res = await postApiDefault(url, rest);
        return res;
    } catch (error) {
        return error;
    }
}
