import React, { useState } from 'react';
import { Modal, Input, Upload } from 'antd';
import { inputCreatePartner } from './constants';
import { beforeUpload, getBase64, getBaseUploadCarousel64, getBaseUploadLogo, notify } from '~/utils/common';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';

import { yupResolver } from '@hookform/resolvers/yup';

import './style.css';
import { createPartnerApi } from './callApi';

const { TextArea } = Input;

const validationSchema = Yup.object().shape({
    // programThumbnailId: Yup.mixed().required('Partner Thumbnail is required'),
    partnerName: Yup.string().required('Company name is required'),
    email: Yup.string().required('Email adress is required'),
    // phone: Yup.string().required('Phone number is required'),
    // address: Yup.string().required('Adress is required'),
    // website: Yup.string().required('Website date is required'),
    description: Yup.string().required('Describe is required'),
    // finishDate: Yup.string().required('Finish date is required'),
    // target: Yup.string().required('Target is required'),
});

function ModalCreatePartner(props) {
    const { isModalOpen, handleOk, handleCancel } = props;

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [dataCreatePartner, setDataCreatePartner] = useState({});

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    //call api create partner
    const { mutate: mutationCreatpartner } = useMutation({
        mutationFn: createPartnerApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                return notify('Success', 'success');
            }
            return notify(data?.message, 'error');
        },
    });

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const handleChange = (info) => {
        const files = info.file || {};
        console.log('files: ', files);
        if (files.status === 'uploading') {
            // setLoading(true);

            return;
        }

        if (files.status === 'done') {
            // Get this url from response in real world.
            getBase64(files.originFileObj, (url) => {
                const blobFromFile = new Blob([files.originFileObj], { type: 'image/jpeg' });
                const formData = new FormData();
                formData.append('files', blobFromFile, files);
                console.log('formData: ', formData);
            });
            // const blobFromFile = new Blob([files.originFileObj], { type: 'image/jpeg' });
            // const formData = new FormData();
            // formData.append('files', blobFromFile, files);
            // console.log('formData: ', formData);
            // setValue('files', files?.originFileObj, { shouldValidate: true });
        }
        setValue('files', files, { shouldValidate: true });
    };
    // console.log(imageUrl);

    const onSubmit = (data) => {
        // console.log('data: ', data);
        // const formData = new FormData();
        // const blobFromFile = new Blob([data?.files], { type: 'image/jpeg' });
        // formData.append('files', blobFromFile);
        // console.log('form: ', formData);
        // const newData = {
        //     ...data,
        // };
        // Gọi API tạo partner với formData
        // mutationCreatpartner(data);
        // console.log(data);
    };

    // render input create program
    const RENDER_INPUT_CREATE_PARTNER = (item) => {
        if (item.type === 'INPUT') {
            const { field } = item;
            const message = errors[field] && errors[field].message;
            return (
                <div key={item.field} className="flex flex-col col-span-2">
                    <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Input
                                    onChange={onChange}
                                    value={value}
                                    className="input-height"
                                    placeholder={item.placeholder}
                                />
                            );
                        }}
                        name={item.field}
                    />
                    {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
                </div>
            );
        }

        if (item.type === 'INPUT_AREA') {
            const { field } = item;
            const message = errors[field] && errors[field].message;
            return (
                <div key={item.field} className="flex flex-col col-span-2">
                    <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <TextArea
                                    autoSize={{
                                        minRows: 3,
                                        maxRows: 5,
                                    }}
                                    onChange={onChange}
                                    value={value}
                                    placeholder="Short description about partner."
                                />
                            );
                        }}
                        name={item.field}
                    />
                    {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
                </div>
            );
        }

        if (item.type === 'INPUT_UPLOAD') {
            return (
                <div key={item.field} className="flex flex-col col-span-2">
                    <>
                        <label className="mb-2 text-xs font-bold ">{item.lable}:</label>

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
                                    // type="file"
                                    style={{
                                        width: '70%',
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </>
                </div>
            );
        }
    };
    return (
        <div>
            <Modal
                style={{ top: 0 }}
                title="Create partner"
                footer={false}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id="create_partner_modal" className="grid grid-cols-2 gap-4 pt-3">
                        {inputCreatePartner.map((item) => RENDER_INPUT_CREATE_PARTNER(item))}
                        <button className="col-span-2 btn_create" type="submit">
                            submit
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ModalCreatePartner;
