import { getApiDefault, postApiDefault } from '~/utils/api';

export async function getDetailProgram(id) {
    const url = `program/detail-program/${id}`;
    try {
        const res = await getApiDefault(url);
        return res;
    } catch (error) {
        return error;
    }
}

export async function onDonateProgram(data) {
    const url = 'api/v1/donation';
    try {
        const res = await postApiDefault(url, data);
        return res;
    } catch (error) {
        return error;
    }
}
