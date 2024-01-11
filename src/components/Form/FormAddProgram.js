import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, Select, Upload, message } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
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

const FormAddProgram = ({ valueEdit }) => {
    const [form] = Form.useForm();
    const [status, setStatus] = useState('active'); // State cho Select

    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setImageUrl(url);
            });
        }
    };

    useEffect(() => {
        // Cập nhật giá trị mặc định khi `valueEdit` thay đổi
        if (!valueEdit) {
            return;
        } else {
            form.setFieldsValue({
                status: valueEdit?.status || 'active',
                nameProgram: valueEdit?.name || '',
                date:
                    valueEdit?.start_date && valueEdit?.end_date
                        ? [dayjs(valueEdit?.start_date, dateFormat), dayjs(valueEdit?.end_date, dateFormat)]
                        : undefined,
                finishDate: valueEdit?.finish_date ? dayjs(valueEdit?.finish_date, dateFormat) : undefined,
                target: valueEdit?.target || '',
                description: valueEdit?.description || '',
                fileList: valueEdit?.image || [],
            });
        }
        setImageUrl(valueEdit?.image || '');
        setStatus(valueEdit?.status || 'active');
    }, [valueEdit]);

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 800 }}
            >
                <Form.Item label="Status" name="status">
                    <Select value={status} onChange={handleStatusChange}>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="pending">Pending</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Name" name="nameProgram">
                    <Input placeholder="Enter Program Name" />
                </Form.Item>

                <Form.Item label="Date" name="date">
                    <RangePicker format={dateFormat} />
                </Form.Item>

                <Form.Item label="Finish Date" name="finishDate">
                    <DatePicker format={dateFormat} />
                </Form.Item>

                <Form.Item label="Target" name="target">
                    <Input placeholder="Enter Target" name="target" />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <TextArea rows={4} placeholder="Enter Description" />
                </Form.Item>

                <Form.Item label="Upload" name="fileList" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            ' Upload'
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </>
    );
};

export default FormAddProgram;
