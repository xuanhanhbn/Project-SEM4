import { DatePicker, Input, Space, Spin, Typography, Upload } from 'antd';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { loginApi, registerApi, uploadAvatarApi } from './callApi';
// import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '~/firebase';
import { inputRegister } from './constants';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { beforeUpload, notify } from '~/utils/common';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import './Signup.css';
import dayjs from 'dayjs';
import moment from 'moment';
import Loading from '~/components/Loading';

// validate register form
const validationRegisterSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^(0[3|5|7|8|9]{1})([0-9]{8})$/, 'Phone number invalid'),
    password: Yup.string().required('Password is required'),
    // bod: Yup.string().required('Date of birth is required'),
    confirmPassword: Yup.string()
        .required('Password is required')
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
    displayName: Yup.string().required('User name is required'),
    // avatarUrl: Yup.string().required('Avatar is required'),
    email: Yup.string()
        .required('Email is required')
        .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email invalid'),
});

function SignUpPage() {
    const baseDataRegisterAccountChatBox = {
        displayName: '',
        email: '',
        password: '',
        files: '',
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [dataRegisterAccountChatBox, setDataRegiserAccountChatBox] = useState(baseDataRegisterAccountChatBox);
    const [dataActive, setDataActive] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationRegisterSchema),
    });

    const navigation = useNavigate();
    // console.log('errors: ', errors);
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

    const { mutate: mutationUploadAvatar, isPending: isPendingUploadImage } = useMutation({
        mutationFn: uploadAvatarApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                // console.log('data: ', data?.data[0]);
                setValue('avatarUrl', data?.data[0]);
                setImageUrl(data?.data[0]);
                // console.log('avatarUrl', imageUrl);
            }
            return notify(data?.message, 'error');
        },
    });

    const handleChange = (info) => {
        const files = info.file || {};

        if (files.status === 'uploading') {
            return;
        }

        if (files.status === 'done') {
            setDataRegiserAccountChatBox((prev) => ({
                ...prev,
                files: files.originFileObj,
            }));
        }
        mutationUploadAvatar({ files: files.originFileObj });
    };

    const handleRegisterAccountChatBox = async () => {
        try {
            const email = dataRegisterAccountChatBox?.email || '';
            const password = dataRegisterAccountChatBox?.password || '';
            const displayName = dataRegisterAccountChatBox?.displayName || '';
            const file = dataRegisterAccountChatBox?.files || '';
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, 'userChats', res.user.uid), {});
                    } catch (err) {
                        return err;
                    }
                });
            });
        } catch (err) {
            return err;
        }
    };

    //call api register
    const { mutate: mutationRegister, isPending } = useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                handleRegisterAccountChatBox();
                navigation('/login');
                return notify(data?.data, 'success');
            }

            return notify(data?.response?.data, 'error');
        },
    });

    // eslint-disable-next-line arrow-body-style
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current > dayjs().endOf('day');
    };

    const onSubmitRegister = (data) => {
        const newDataRequest = {
            ...data,
            bod: data?.bod ? moment(data?.bod).format('YYYY/MM/DD') : '',
        };
        setDataActive(data.email);
        setDataRegiserAccountChatBox((prev) => ({
            ...prev,
            ...data,
        }));
        return mutationRegister(newDataRequest);
    };

    const RENDER_INPUT_SIGN_UP = (item) => {
        const { field } = item;
        const message = errors[field] && errors[field].message;

        if (item.type === 'password') {
            return (
                <div key={item.field}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <div className="text-left ">
                                    <Typography.Title level={5}>
                                        {item.placeholder} <span className="text-red-200">*</span>
                                    </Typography.Title>
                                    <Input.Password
                                        className="py-4 "
                                        type={item.type}
                                        autoComplete="on"
                                        onChange={onChange}
                                        value={value == null ? '' : value}
                                        placeholder={item.placeholder}
                                    />
                                </div>
                            );
                        }}
                        name={item.field}
                    />
                    <div className="mt-0 mb-3 text-red-600"> {message}</div>
                </div>
            );
        } else if (item.type === 'INPUT_UPLOAD') {
            return (
                <div key={item.field}>
                    <>
                        <Typography.Title level={5}>{item.lable}</Typography.Title>
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
        } else if (item.type === 'BIRTH_DATE') {
            return (
                <div key={item.field}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <div className="text-left ">
                                    <Typography.Title level={5}>
                                        {item.placeholder} <span className="text-red-200">*</span>
                                    </Typography.Title>
                                    <Space direction="vertical" className="w-full">
                                        <DatePicker
                                            // format={dateFormat}
                                            disabledDate={disabledDate}
                                            onChange={onChange}
                                            selected={field.value}
                                            className="w-full py-4"
                                        />
                                    </Space>
                                </div>
                            );
                        }}
                        name={item.field}
                    />
                    <div className="mt-0 mb-3 text-red-600"> {message}</div>
                </div>
            );
        } else {
            return (
                <div key={item.field}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <div className="text-left ">
                                    <Typography.Title level={5}>
                                        {item.placeholder} <span className="text-red-200">*</span>
                                    </Typography.Title>
                                    <Input
                                        className="py-4 "
                                        type={item.type}
                                        autoComplete="on"
                                        onChange={onChange}
                                        value={value == null ? '' : value}
                                        placeholder={item.placeholder}
                                    />
                                </div>
                            );
                        }}
                        name={item.field}
                    />
                    <div className="mt-0 mb-3 text-red-600"> {message}</div>
                </div>
            );
        }
    };
    return (
        <div>
            <Loading isLoading={isPendingUploadImage} />
            <div id="signup_page">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-600 md:text-2xl">
                                Create an account
                            </h1>
                            <form onSubmit={handleSubmit(onSubmitRegister)} className="space-y-4 md:space-y-6">
                                <div className="grid-cols-2 gap-4 md:grid">
                                    {inputRegister.map((data) => RENDER_INPUT_SIGN_UP(data))}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {isPending ? <Spin size="large" /> : <div>Create an account</div>}
                                </button>
                                <div className="flex items-center justify-center">
                                    <p className="text-sm font-light text-black mr-1">Already have an account?</p>
                                    <Link
                                        to="/login"
                                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                    >
                                        Login here
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
