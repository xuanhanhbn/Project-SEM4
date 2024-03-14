import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { inputChangePassword } from './constants';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { changePasswordApi, loginApi } from './callApi';
import { notify } from '~/utils/common';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';

// validate change password form
const validationChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Password is required'),
    newPassword: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .required('Password is required')
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
});

function ChangePassword() {
    const [newPassword, setnewPassword] = useState('');
    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationChangePasswordSchema),
    });

    const navigation = useNavigate();

    // const handleLoginAccountChatBox = async () => {
    //     try {
    //         await signInWithEmailAndPassword(auth, dataLogin?.email, dataLogin?.password);
    //     } catch (err) {
    //         return err;
    //     }
    // };

    // call api login
    const { mutate: mutationLogin } = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                // handleLoginAccountChatBox();
                if (data?.data?.role === 'USER') {
                    return navigation('/');
                }

                if (data?.data?.role === 'PARTNER') {
                    return navigation('/admin/partner/detail');
                }
                return navigation('/admin/dashboard');
            }
            return notify(data?.response?.data, 'error');
        },
    });

    //call api register
    const { mutate: mutationChangePassword, isPending } = useMutation({
        mutationFn: changePasswordApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                const loginData = {
                    email: userData.email,
                    password: newPassword,
                };
                mutationLogin(loginData);
                // navigation('/');
                return notify('Change password success', 'success');
            }
            return notify(data?.response.data, 'error');
        },
    });

    const onSubmit = (data) => {
        setnewPassword(data.newPassword);
        mutationChangePassword(data);
    };
    return (
        <div>
            <div className="antialiased ">
                <div className="max-w-lg p-8 mx-auto my-10 bg-white shadow rounded-xl shadow-slate-300">
                    <h1 className="text-4xl font-medium">Change password</h1>
                    <p className="text-slate-500">Fill up the form to change the password</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="my-10">
                        <div className="flex flex-col space-y-5">
                            {inputChangePassword.map((item) => {
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
                                                        value={value == null ? '' : value}
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

                                <span>Change password</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
