import { postApiDefault, postApiImageDefault } from '~/utils/api';

export async function uploadImageApi(data) {
    const url = '/attachment/upload';
    try {
        const res = await postApiImageDefault(url, data);
        return res;
    } catch (error) {
        return error;
    }
}

export async function finishedProgram(data) {
    const url = `program/finish-program/${data?.id}`;
    try {
        const requestImage = { url: data?.url };
        const res = await postApiDefault(url, requestImage);
        return res;
    } catch (error) {
        return error;
    }
}
