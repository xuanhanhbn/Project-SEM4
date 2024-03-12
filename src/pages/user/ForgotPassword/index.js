import { Input } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordApi } from './callApi';
import { notify } from '~/utils/common';

// validate forgot password form
const validationForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email invalid'),
});

function ForgotPasswordPage() {
    const [emailForgotPassword, setEmailForgotPassword] = useState('');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationForgotPasswordSchema),
    });

    const navigation = useNavigate();

    const onSubmit = (data) => {
        console.log('data: ', data);
        setEmailForgotPassword(data);
        mutationForgotPassword(data);
    };

    //call api register
    const { mutate: mutationForgotPassword, isPending } = useMutation({
        mutationFn: forgotPasswordApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                // handleRegisterAccountChatBox();
                navigation('/reset-password', { state: emailForgotPassword });
                console.log('data: ', data);
            }
            return notify(data?.message, 'error');
        },
    });

    return (
        <div>
            <div className="antialiased ">
                <div className="max-w-lg p-8 mx-auto my-10 bg-white shadow rounded-xl shadow-slate-300">
                    <h1 className="text-4xl font-medium">Forgot password</h1>
                    <p className="text-slate-500">Fill up the form to forgot the password</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="my-10">
                        <div className="flex flex-col space-y-5">
                            <label htmlFor="email">
                                <p className="pb-2 font-medium text-slate-700">
                                    Email address <span className="text-red-200">*</span>
                                </p>

                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value } }) => {
                                        return (
                                            <input
                                                name="email"
                                                type="email"
                                                onChange={onChange}
                                                value={value == null ? '' : value}
                                                className="w-full px-3 py-3 border rounded-lg placeholder:text-black border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                                            />
                                        );
                                    }}
                                    name="email"
                                />
                            </label>

                            <div className="my-3 text-red-600">{errors.email?.message}</div>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-indigo-600 border-indigo-500 rounded-lg hover:bg-indigo-500 hover:shadow"
                            >
                                <i className="fa-regular fa-key"></i>

                                <span>Forgot password</span>
                            </button>
                            <p className="text-center">
                                Not registered yet?
                                <Link
                                    to="/sign-up"
                                    className="inline-flex items-center space-x-1 font-medium text-indigo-600"
                                >
                                    <span>Sign up now </span>
                                    <span>
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
