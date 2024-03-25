import { postApiDefault } from '~/utils/api';

export async function getListProgram() {
    const url = 'program/list-program-by-status';
    const request = {
        name: 'Active',
        page: 1,
        size: 4,
    };
    try {
        const res = await postApiDefault(url, request);
        return res;
    } catch (error) {
        return error;
    }
}
