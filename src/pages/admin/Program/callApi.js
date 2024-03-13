import { getApiDefault } from '~/utils/api';

export async function getAllProgramApi() {
    const url = ``;
    try {
        const res = await getApiDefault(url);
        // console.log('res: ', res);
        if (res && res?.status === 200) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
