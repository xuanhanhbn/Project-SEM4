import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { inputResetPassword } from './constants';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordApi } from './callApi';
import { notify } from '~/utils/common';

// validate login form
const validationResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .required('Password is required')
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
});

function ResetPasswordPage() {
    const location = useLocation();
    const state = location.state;
    // console.log('emailaaa: ', state);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationResetPasswordSchema),
    });
    const navigation = useNavigate();
    //call api register
    const { mutate: mutationResetPassword, isPending } = useMutation({
        mutationFn: resetPasswordApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                navigation('/login');
            }
            return notify(data?.message, 'error');
        },
    });

    const onSubmit = (data) => {
        // console.log('data: ', data);
        data.email = state.email;
        mutationResetPassword(data);
    };
    return (
        <div>
            <div className="antialiased ">
                <div className="max-w-lg p-8 mx-auto my-10 bg-white shadow rounded-xl shadow-slate-300">
                    <h1 className="text-4xl font-medium">Reset password</h1>
                    <p className="text-slate-500">Fill up the form to reset the password</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="my-10">
                        <div className="flex flex-col space-y-5">
                            {inputResetPassword.map((item) => {
                                const { field } = item;
                                const message = errors[field] && errors[field].message;
                                return (
                                    <label key={item.id} htmlFor="password">
                                        <p className="pb-2 font-medium text-slate-700">
                                            {item.label} <span className="text-red-200">*</span>
                                        </p>

                                        <Controller
                                            control={control}
                                            render={({ field: { onChange, value } }) => {
                                                return (
                                                    <input
                                                        name={item.field}
                                                        type="password"
                                                        className="w-full px-3 py-3 border rounded-lg placeholder:text-gray-500 border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                                                        placeholder={item.placeholder}
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                );
                                            }}
                                            name={item.field}
                                        />
                                        {message && (
                                            <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>
                                        )}
                                    </label>
                                );
                            })}

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-indigo-600 border-indigo-500 rounded-lg hover:bg-indigo-500 hover:shadow"
                            >
                                <i className="fa-regular fa-key"></i>

                                <span>Reset password</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
