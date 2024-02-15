import baseApiUrlAuth from './baseApiAuth';

export const getApiDefault = (url) =>
    new Promise((resolve, reject) =>
        baseApiUrlAuth
            .get(url)
            .then((res) => resolve(res))
            .catch((err) => reject(err)),
    );

export const postApiDefault = (url, data) =>
    new Promise((resolve, reject) =>
        baseApiUrlAuth
            .post(url, data)
            .then((res) => resolve(res))
            .catch((err) => reject(err)),
    );

export const putApiDefault = (url, data) =>
    new Promise((resolve, reject) =>
        baseApiUrlAuth
            .put(url, data)
            .then((res) => resolve(res))
            .catch((err) => reject(err)),
    );
