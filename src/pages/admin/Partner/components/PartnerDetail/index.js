import React, { useEffect, useMemo, useState } from 'react';
import { Input, Tabs, Upload } from 'antd';
import { inputChangePassword, inputUpdateProfile, tabItems } from './constants';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { beforeUpload, notify } from '~/utils/common';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { yupResolver } from '@hookform/resolvers/yup';
import TextArea from 'antd/es/input/TextArea';

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

// validate change password form
const validationChangePasswordSchema = Yup.object().shape({
    // oldPassword: Yup.string().required('Password is required'),
    newPassword: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .required('Password is required')
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
});

function PartnerDetailPage() {
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

    const {
        control: controlChangePassword,
        handleSubmit: handleChangePassword,
        formState: { errors: errorsChangePassword },
    } = useForm({
        resolver: yupResolver(validationChangePasswordSchema),
    });

    // handle change upload image logo
    const handleChange = (info) => {
        const files = info.file || {};

        if (files.status === 'uploading') {
            return;
        }

        if (files.status === 'done') {
            // console.log('files', files.originFileObj);
        }
        // mutationUploadLogo({ files: files.originFileObj });
    };

    // handle change tabs
    const onChange = (key) => {
        // console.log(key);
    };

    // handle update partner info
    const updatePartner = (data) => {
        console.log('data: ', data);

        // mutationUpdatepartner(dataUpdate);
    };

    // handle submit change password
    const changePassword = (data) => {
        console.log('data: ', data);

        // mutationUpdatepartner(dataUpdate);
    };

    // button upload logo
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

    // render input create program
    const RENDER_INPUT_UPDATE_PROFILE = (item) => {
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
                                    className="h-10"
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

    // render input change password
    const RENDER_INPUT_CHANGE_PASSWORD = (item) => {
        const { field } = item;
        const message = errorsChangePassword[field] && errorsChangePassword[field].message;
        return (
            <div key={item.field} className="flex flex-col col-span-2">
                <label className="mb-2 text-xs font-bold ">{item.label}:</label>
                <Controller
                    control={controlChangePassword}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <Input.Password
                                onChange={onChange}
                                value={value}
                                className="h-10"
                                placeholder={item.placeholder}
                            />
                        );
                    }}
                    name={item.field}
                />
                {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
            </div>
        );
    };

    // render tab items
    const RENDER_TAB_ITEMS = (item) => {
        if (item.label === 'Personal info') {
            return {
                key: item.id,
                label: (
                    <div>
                        {item.icon} {item.label}
                    </div>
                ),
                children: (
                    <form onSubmit={handleChange(updatePartner)} className="flex flex-col max-w-4xl">
                        <div className="grid grid-cols-2 gap-4 pt-3 ">
                            {inputUpdateProfile.map((item) => RENDER_INPUT_UPDATE_PROFILE(item))}
                        </div>
                        <button
                            className="inline-block px-8 py-2 m-auto text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer w-72 border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500"
                            type="submit"
                        >
                            submit
                        </button>
                    </form>
                ),
            };
        } else {
            return {
                key: item.id,
                label: (
                    <div className="">
                        {item.icon} {item.label}
                    </div>
                ),
                children: (
                    <form onSubmit={handleChangePassword(changePassword)} className="flex flex-col max-w-4xl">
                        <div className="grid grid-cols-2 gap-4 pt-3 ">
                            {inputChangePassword.map((item) => RENDER_INPUT_CHANGE_PASSWORD(item))}
                        </div>
                        <div className="mt-10 text-orange-700">
                            <i className="mr-2 fa-solid fa-triangle-exclamation"></i> Password must be minimum 6+
                        </div>
                        <button
                            className="inline-block px-8 py-2 m-auto mt-5 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer w-72 border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500"
                            type="submit"
                        >
                            submit
                        </button>
                    </form>
                ),
            };
        }
    };
    return (
        <div className="px-5 py-8 bg-white shadow-xl rounded-2xl">
            <Tabs defaultActiveKey="1" items={tabItems.map((item) => RENDER_TAB_ITEMS(item))} onChange={onChange} />
        </div>
    );
}

export default PartnerDetailPage;
