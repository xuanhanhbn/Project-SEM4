import { Input, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { inputLogin } from './constants';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { getMeApi, loginApi } from './callApi';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '~/firebase';
import { notify } from '~/utils/common';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import './Login.css';

// validate login form
const validationLoginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email invalid'),
    password: Yup.string().required('Password is required'),
});

function LoginPage() {
    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    const baseDataLogin = {
        email: '',
        password: '',
    };
    const [dataLogin, setDataLogin] = useState(baseDataLogin);

    const navigation = useNavigate();
    const {
        control: controlLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
    } = useForm({
        resolver: yupResolver(validationLoginSchema),
    });

    const handleLoginAccountChatBox = async () => {
        try {
            await signInWithEmailAndPassword(auth, dataLogin?.email, dataLogin?.password);
        } catch (err) {
            return err;
        }
    };

    // call api login
    const { mutate: mutationLogin, isPending } = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                localStorage.setItem('loginPage', JSON.stringify(data?.data));
                // navigation('/');
                getMe();
                handleLoginAccountChatBox();
                return notify('Login Success', 'success');
            }
            return notify(data?.response?.data, 'error');
        },
    });

    const { mutate: getMe } = useMutation({
        mutationFn: getMeApi,
        onSuccess: (data) => {
            if (data && data?.status == 200) {
                setUserData(data?.data);
                if (data?.data?.role === 'USER') {
                    return navigation('/');
                }

                if (data?.data?.role === 'PARTNER' && !data?.data.updateAt) {
                    return navigation('/admin/change-password');
                }
                return navigation('/admin/dashboard');
            }
            return notify('error', 'error');
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

    return (
        <div id="login_page">
            <div>
                <div className="flex flex-col items-center justify-center px-6 py-20 mx-auto ">
                    {/* <Link
                        to="/"
                        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    >
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="logo"
                        />
                    </Link> */}
                    <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form
                                onSubmit={handleSubmitLogin(onSubmitLogin)}
                                className="space-y-4 md:space-y-6"
                                action="#"
                            >
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
                                                                <div className="flex justify-between">
                                                                    <Typography.Title level={5}>
                                                                        {item.placeholder}{' '}
                                                                        <span className="text-red-200">*</span>
                                                                    </Typography.Title>
                                                                    <div className="text-sm">
                                                                        <Link
                                                                            to="/forgot-password"
                                                                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                                                                        >
                                                                            Forgot password?
                                                                        </Link>
                                                                    </div>
                                                                </div>
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
                                                                    {item.placeholder}{' '}
                                                                    <span className="text-red-200">*</span>
                                                                </Typography.Title>

                                                                <Input
                                                                    className="py-4 "
                                                                    noValidate
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
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {isPending ? <Spin size="large" /> : <div>Sign in</div>}
                                </button>
                                <p className="mt-10 text-sm text-center text-black">
                                    Don't have an account?
                                    <Link
                                        to="/sign-up"
                                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                    >
                                        Sign up here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
