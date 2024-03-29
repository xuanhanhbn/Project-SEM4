import { postApiDefault } from '~/utils/api';

export async function getAllProgramApi(data) {
    const request = {
        name: 'DeActive',
        page: 1,
        size: 20,
    };
    const url = `program/list-program-by-status`;
    try {
        const res = await postApiDefault(url, request);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}

export async function createProgramApi(data) {
    const url = `/program/create-program`;
    try {
        const res = await postApiDefault(url, data);
        // console.log('res: ', res);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
