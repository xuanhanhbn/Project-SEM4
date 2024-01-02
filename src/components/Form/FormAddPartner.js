import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, Upload, message } from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

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

const FormAddPartner = ({ valueEdit }) => {
    const [form] = Form.useForm();

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
                namePartner: valueEdit?.name || '',
                email: valueEdit?.email || '',
                description: valueEdit?.description || '',
                paymentMethod: valueEdit?.paymentMethod || [],
                fileList: valueEdit?.image || [],
            });
        }
        setImageUrl(valueEdit?.image || '');
    }, [valueEdit]);

    return (
        <>
            <Form
                labelCol={{ span: 4 }}
                form={form}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 800 }}
            >
                <Form.Item label="Name" name="namePartner">
                    <Input placeholder="Enter Partner Name" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input placeholder="Enter your Email" />
                </Form.Item>

                <Form.Item label="Payment Method" name="paymentMethod">
                    <Input placeholder="Enter Payment Method" />
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

export default FormAddPartner;
