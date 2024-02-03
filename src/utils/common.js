import { message } from 'antd';
import { toast } from 'react-toastify';

export const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
};

export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
export const notify = (message, type) => {
    if (type === 'info') {
        toast.info(message);
    }
    if (type === 'success') {
        toast.success(message);
    }
    if (type === 'warning') {
        toast.warning(message);
    }
    if (type === 'error') {
        toast.error(message);
    }
    if (!type || type === 'default') {
        toast(message);
    }
};
