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
            }
            return notify(data?.response?.data, 'error');
        },
    });

    const { mutate: getMe } = useMutation({
        mutationFn: getMeApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                setUserData(data?.data);
                if (data?.role === 'ADMIN') {
                    return navigation('/admin/dashboard');
                }
                return navigation('/');
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
        <div>
            <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="w-auto h-10 mx-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-black">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmitLogin(onSubmitLogin)} className="space-y-6" action="#" method="POST">
                        {/* <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-black">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autocomplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label for="password" className="block text-sm font-medium leading-6 text-black">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autocomplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                         */}
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
                                                                {item.placeholder}
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
                                                            {item.placeholder}
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
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={isPending}
                            >
                                {isPending ? <Spin size="large" /> : <div> Sign in</div>}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-sm text-center text-black">
                        Don't have an account?
                        <Link to="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
