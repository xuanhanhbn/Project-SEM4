import { getApiDefault, postApiDefault } from '~/utils/api';

export async function getAllProgramApi(data) {
    const url = `program/list-program-by-status?name=Finished&page=1&size=20`;
    try {
        const res = await getApiDefault(url);
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
