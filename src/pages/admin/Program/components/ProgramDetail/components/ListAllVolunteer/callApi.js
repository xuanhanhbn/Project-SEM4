import { getApiDefault } from '~/utils/api';

export async function getAllVolunteer(data) {
    const url = `subprogram/get-all-by-program/${data?.programId}?name=Active&page=1&size=20`;
    try {
        const res = await getApiDefault(url);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
