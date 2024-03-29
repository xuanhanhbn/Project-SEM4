import { message } from 'antd';
import moment from 'moment';
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

export const getBaseUploadCarousel64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export const getBaseUploadLogo = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export const convertTimeStampToDateTime = (date) => {
    if (date) {
        return moment(date)?.format('DD/MM/YYYY HH:mm');
    }
    return '';
};

export const handleReturnLogoImage = (img) => {
    if (Array.isArray(img) && img.length > 0) {
        const filterLogo = img.filter((item) => item.type === 'Logo');
        return filterLogo[0]?.url;
    }
    return '';
};

export const handleFormatMoney = (money) => {
    if (money) {
        return `${money?.toLocaleString()} $`;
    }
    return `0 $`;
};

export const handleCheckStartDonateDate = (startDonateDate) => {
    const now = moment();
    const startDate = moment(startDonateDate)?.format('YYYY-MM-DD');
    if (now.isBefore(startDate)) {
        return true;
    }
    return false;
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
