/* eslint-disable no-mixed-operators */
import React, { useState } from 'react';
import './Style.css';
import { inputRegister, inputLogin } from './constants';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputToken from './components/InputTocken';
import { useMutation } from '@tanstack/react-query';
import { registerApi, loginApi } from './callApi';
import { beforeUpload, notify } from '~/utils/common';
import { Input, Spin, Typography, Upload } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '~/firebase';

// validate register form
const validationRegisterSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^(0[3|5|7|8|9]{1})([0-9]{8})$/, 'Phone number invalid'),
    password: Yup.string().required('Password is required'),
    displayName: Yup.string().required('User name is required'),
    email: Yup.string()
        .required('Email is required')
        .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email invalid'),
});

// validate login form
const validationLoginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email invalid'),
    password: Yup.string().required('Password is required'),
});

function RegisterPage() {
    const baseDataLogin = {
        email: '',
        password: '',
    };
    // State
    const [toggledFormLogin, setToggledFormLogin] = useState(false);
    const [istoggleFromToken, setIstoggleFromToken] = useState(false);
    const [dataActive, setDataActive] = useState(false);
    const [dataRegister, setDataRegiser] = useState(null);
    const [dataLogin, setDataLogin] = useState(baseDataLogin);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const navigation = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationRegisterSchema),
    });

    const {
        control: controlLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
    } = useForm({
        resolver: yupResolver(validationLoginSchema),
    });

    // call api login
    const { mutate: mutationLogin } = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            console.log('data:', data);
            if ((data && data?.status === 200) || data?.status === '200') {
                navigation('/');
                handleLoginAccountChatBox();
            }
        },
    });

    // xử lý khi click nút login
    const onSubmitLogin = (data) => {
        setDataLogin((prev) => ({
            ...prev,
            email: data?.email || '',
            password: data?.password || '',
        }));
        mutationLogin(data);
    };

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
        }
        // mutationUploadAvatar({ files: files.originFileObj });
    };

    //call api register
    const { mutate: mutationRegister, isPending } = useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                handleRegisterAccountChatBox();
            }
            return notify(data?.message, 'error');
        },
    });

    const handleLoginAccountChatBox = async () => {
        try {
            await signInWithEmailAndPassword(auth, dataLogin?.email, dataLogin?.password);
        } catch (err) {
            return err;
        }
    };

    const handleRegisterAccountChatBox = async () => {
        console.log('dataRegister: ', dataRegister);
        const displayName = dataRegister?.email || '';
        const email = dataRegister?.email;
        const password = dataRegister?.password;
        const file = '';
        try {
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

    const onSubmitRegister = (data) => {
        console.log('data: ', data);
        setDataActive(data.email);
        setDataRegiser(data);
        // mutationRegister(data);
    };

    // xử lý chuyển form login <=> register
    const toggleLoginRegister = () => {
        setToggledFormLogin(!toggledFormLogin);
    };

    return (
        <div>
            <div
                id="container"
                className={toggledFormLogin ? 'container_lgrs sign-up_lgrs' : 'container_lgrs sign-in_lgrs'}
            >
                <div className="row_lgrs ">
                    <div className="flex-col_lgrs col_lgrs align-items-center_lgrs sign-up_lgrs">
                        <form
                            onSubmit={handleSubmit(onSubmitRegister)}
                            // className={istoggleFromToken ? 'hidden' : 'form-wrapper_lgrs align-items-center_lgrs'}
                            className={istoggleFromToken ? 'hidden' : ''}
                        >
                            <div className="form_lgrs sign-up_lgrs">
                                {inputRegister.map((item) => {
                                    const { field } = item;
                                    const message = errors[field] && errors[field].message;

                                    if (item.type === 'password') {
                                        return (
                                            <div key={item.field}>
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => {
                                                        return (
                                                            <div className="text-left w-80">
                                                                <Typography.Title level={5}>
                                                                    {item.placeholder}
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
                                    } else {
                                        return (
                                            <div key={item.field}>
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => {
                                                        return (
                                                            <div className="text-left w-80">
                                                                <Typography.Title level={5}>
                                                                    {item.placeholder}
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
                                })}
                                <button type="submit" className="bg-blue-100" disabled={isPending}>
                                    {isPending ? <Spin size="large" /> : <div>Sign up</div>}
                                </button>
                                <p>
                                    <span>Already have an account?</span>
                                    <b onClick={() => toggleLoginRegister()} className="pointer_lgrs">
                                        Sign in here
                                    </b>
                                </p>
                            </div>
                        </form>
                        <div className={!istoggleFromToken ? 'hidden' : 'form-wrapper_lgrs align-items-center_lgrs'}>
                            <div className="text-center form_lgrs sign-up_lgrs">
                                <InputToken />
                            </div>
                        </div>
                    </div>
                    <div className="flex-col_lgrs col_lgrs align-items-center_lgrs sign-in_lgrs">
                        <form
                            onSubmit={handleSubmitLogin(onSubmitLogin)}
                            className="form-wrapper_lgrs align-items-center_lgrs"
                        >
                            <div className="form_lgrs sign-in_lgrs">
                                {inputLogin.map((item) => {
                                    const { field } = item;
                                    const message = errorsLogin[field] && errorsLogin[field].message;
                                    if (item.type === 'password') {
                                        return (
                                            <div key={item.field}>
                                                <Controller
                                                    control={controlLogin}
                                                    render={({ field: { onChange, value } }) => {
                                                        return (
                                                            <div className="text-left ">
                                                                <Typography.Title level={5}>
                                                                    {item.placeholder}
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
                                    } else {
                                        return (
                                            <div key={item.field}>
                                                <Controller
                                                    control={controlLogin}
                                                    render={({ field: { onChange, value } }) => {
                                                        return (
                                                            <div className="text-left ">
                                                                <Typography.Title level={5}>
                                                                    {item.placeholder}
                                                                </Typography.Title>
                                                                <Input
                                                                    className="py-4 "
                                                                    novalidate
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
                                })}

                                <button type="submit" className="bg-orange-200">
                                    Sign in
                                </button>
                                <p>
                                    <b>Forgot password?</b>
                                </p>
                                <p>
                                    <span>Don't have an account?</span>
                                    <b onClick={() => toggleLoginRegister()} className="pointer_lgrs">
                                        Sign up here
                                    </b>
                                </p>
                            </div>
                        </form>
                        <div className="form-wrapper_lgrs"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
