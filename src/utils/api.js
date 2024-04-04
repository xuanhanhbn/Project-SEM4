import FileSaver from 'file-saver';
import baseApiUrlAuth from './baseApiAuth';
import baseApiUrlNoAuth from './baseApiNoAuth';
import baseApiUploadImage from './baseApiUpload';

export const getApiDefault = (url) =>
    new Promise((resolve, reject) =>
        baseApiUrlAuth
            .get(url)
            .then((res) => resolve(res))
            .catch((err) => reject(err)),
    );

export const getApiWithBodyDefault = (url, data) =>
    new Promise((resolve, reject) =>
        baseApiUrlAuth
            .get(url, data)
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

export const postApiImageDefault = (url, data) =>
    new Promise((resolve, reject) =>
        baseApiUploadImage
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

export const postApiNoAuth = (url, data) =>
    new Promise((resolve, reject) =>
        baseApiUrlNoAuth
            .post(url, data)
            .then((res) => resolve(res))
            .catch((err) => reject(err)),
    );

export const getApiNoAuth = (url) =>
    new Promise((resolve, reject) =>
        baseApiUrlNoAuth
            .get(url)
            .then((res) => resolve(res))
            .catch((err) => reject(err)),
    );

// DOWNLOAD FILE
export const downloadFileDefault = (downloadFileUrl, name) =>
    new Promise((resolve, reject) =>
        baseApiUrlAuth
            .get(`${downloadFileUrl}`, { responseType: 'blob' })
            .then((res) => {
                console.log('name: ', name);
                const blob = new Blob([res.data], { type: res.headers['content-type'] });
                FileSaver.saveAs(blob, res.headers.filename);
                resolve(res);
            })
            .catch((err) => reject(err)),
    );
