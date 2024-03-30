import { getApiDefault, postApiDefault } from '~/utils/api';

export async function getAllVolunteer(data) {
    const url = `subprogram/get-all-by-program/${data?.programId}?name=${data?.name}&page=1&size=20`;
    try {
        const res = await getApiDefault(url);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}

export async function acceptVolunteer(data) {
    const url = `subprogram/approve-volunteer`;
    try {
        const res = await postApiDefault(url, data);
        if (res) {
            return res;
        }
    } catch (error) {
        return error;
    }
}
