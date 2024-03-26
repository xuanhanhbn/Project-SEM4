import { getApiDefault, postApiDefault } from '~/utils/api';

export async function onFeedbackProgram(data) {
    const url = `feedback/create-feedback?content=${data?.content}&programId=${data?.programId}`;
    try {
        const res = await postApiDefault(url, {});
        return res;
    } catch (error) {
        return error;
    }
}

export async function onEditFeedbackProgram(data) {
    const url = '/feedback/edit-comment';
    try {
        const res = await postApiDefault(url, data);
        return res;
    } catch (error) {
        return error;
    }
}

export async function onRemoveFeedbackProgram(id) {
    const url = `feedback/delete-comment?id=${id}`;
    try {
        const res = await getApiDefault(url);
        return res;
    } catch (error) {
        return error;
    }
}

export async function getAllFeedbackProgram(data) {
    const url = `feedback/get-comment?programId=${data?.programId}&name=&page=1&size=20`;
    try {
        const res = await getApiDefault(url);
        return res;
    } catch (error) {
        return error;
    }
}
