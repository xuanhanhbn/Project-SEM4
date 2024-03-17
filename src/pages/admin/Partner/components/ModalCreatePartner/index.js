/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal, Input, Upload } from 'antd';
import { inputCreatePartner } from './constants';
import { beforeUpload, notify } from '~/utils/common';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';

import { yupResolver } from '@hookform/resolvers/yup';

import './style.css';
import { createPartnerApi, updatePartnerApi, uploadPartnerLogoApi } from './callApi';
import { useLocation } from 'react-router-dom';
import { getAllPartnerApi } from '../../callApi';
import Loading from '~/components/Loading';

const { TextArea } = Input;

const validationSchema = Yup.object().shape({
    // programThumbnailId: Yup.mixed().required('Partner Thumbnail is required'),
    partnerName: Yup.string().required('Company name is required'),
    email: Yup.string()
        .required('Email adress is required')
        .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email invalid'),
    // phone: Yup.string().required('Phone number is required'),
    // address: Yup.string().required('Adress is required'),
    // website: Yup.string().required('Website date is required'),
    description: Yup.string().required('Describe is required'),
    // urlLogo: Yup.string().required('Describe is required'),
    // finishDate: Yup.string().required('Finish date is required'),
    // target: Yup.string().required('Target is required'),
});

function ModalCreatePartner(props) {
    const { isModalOpen, handleOk, handleCancel, type, setDataRegiserAccountChatBox } = props;

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const location = useLocation();
    const state = location.state;
    // console.log('state: ', state);

    const urlLogo = state?.attachment;

    useEffect(() => {
        if (type === 'update') {
            setValue('partnerName', state.partnerName);
            setValue('email', state.email);
            setValue('description', state.description);
        }
        if (urlLogo?.length === 0) {
            return;
        } else {
            const url = urlLogo ? urlLogo[0].url : null;
            setImageUrl(url);
        }
    }, [state]);

    //call api upload partner
    const { mutate: mutationUpdatepartner } = useMutation({
        mutationFn: updatePartnerApi,
        onSuccess: (data) => {
            // console.log('data: ',data);
            if ((data && data?.status === 200) || data?.status === '200') {
                // return notify('Success', 'success');
                handleCancel();
            }
            return notify(data?.message, 'error');
        },
    });

    //call api upload logo
    const { mutate: mutationUploadLogo, isPending: isPendingUploadImg } = useMutation({
        mutationFn: uploadPartnerLogoApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                setValue('urlLogo', data?.data[0]);

                setImageUrl(data?.data[0]);
                // console.log(imageUrl);
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

        if (files.status === 'uploading') {
            return;
        }

        if (files.status === 'done') {
            // console.log('files', files.originFileObj);
            setDataRegiserAccountChatBox((prev) => ({
                ...prev,
                files: files.originFileObj,
            }));
        }
        mutationUploadLogo({ files: files.originFileObj });
    };

    const onSubmit = (data) => {
        setDataRegiserAccountChatBox((prev) => ({
            ...prev,
            displayName: data?.partnerName,
            email: data?.email,
            password: '12345678',
        }));
        return handleOk(data);
    };

    const updatePartner = (data) => {
        const dataUpdate = {
            updatePartnerDto: data,
            id: state.partnerId,
        };
        console.log('data: ', dataUpdate);

        mutationUpdatepartner(dataUpdate);
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
                        <label className="mb-2 text-xs font-bold ">{item.lable}</label>

                        <Upload
                            name="urlLogo"
                            listType="picture-card"
                            className="avatar-uploader"
                            accept="image/png, image/jpeg,image/jpg"
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
            <Loading isLoading={isPendingUploadImg} />
            <Modal
                style={{ top: 0 }}
                title="Create partner"
                footer={false}
                open={isModalOpen}
                onOk={onSubmit}
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
