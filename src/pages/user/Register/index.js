import React, { useState } from 'react';
import './Style.css';
import { inputRegister, inputLogin } from './constants';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// validate register form
const validationRegisterSchema = Yup.object().shape({
    username: Yup.string().required('User name is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().required('Email is required'),
    confirm_password: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

// validate login form
const validationLoginSchema = Yup.object().shape({
    username: Yup.string().required('User name is required'),
    password: Yup.string().required('Password is required'),
});

function RegisterPage() {
    // State
    const [toggled, setToggled] = useState(false);

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

    // xử lý khi click nút login
    const onSubmitLogin = (data) => {
        console.log('dataLogin: ', data);
    };

    // xử lý khi click nút register
    const onSubmitRegister = (data) => {
        console.log('dataRegister: ', data);
    };

    // xử lý chuyển form login <=> register
    const toggleLoginRegister = () => {
        setToggled(!toggled);
    };

    return (
        <div>
            <div id="container" className={toggled ? 'container_lgrs sign-up_lgrs' : 'container_lgrs sign-in_lgrs'}>
                <div className="row_lgrs ">
                    <div className="flex-col_lgrs col_lgrs align-items-center_lgrs sign-up_lgrs">
                        <form
                            onSubmit={handleSubmit(onSubmitRegister)}
                            className="form-wrapper_lgrs align-items-center_lgrs"
                        >
                            <div className="form_lgrs sign-up_lgrs">
                                {/* Render input register */}
                                {inputRegister.map((item) => {
                                    const { field } = item;
                                    const message = errors[field] && errors[field].message;
                                    return (
                                        <div key={item.field}>
                                            <Controller
                                                control={control}
                                                render={({ field: { onChange, value } }) => {
                                                    return (
                                                        <div className="input-group_lgrs">
                                                            {item.icon}
                                                            <input
                                                                type={item.type}
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
                                })}
                                <button type="submit" className="bg-blue-100">
                                    Sign up
                                </button>
                                <p>
                                    <span>Already have an account?</span>
                                    <b onClick={() => toggleLoginRegister()} className="pointer_lgrs">
                                        Sign in here
                                    </b>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="flex-col_lgrs col_lgrs align-items-center_lgrs sign-in_lgrs">
                        <form
                            onSubmit={handleSubmitLogin(onSubmitLogin)}
                            className="form-wrapper_lgrs align-items-center_lgrs"
                        >
                            <div className="form_lgrs sign-in_lgrs">
                                {/* Render input Login */}
                                {inputLogin.map((item) => {
                                    const { field } = item;
                                    const message = errorsLogin[field] && errorsLogin[field].message;
                                    return (
                                        <div key={item.field}>
                                            <Controller
                                                control={controlLogin}
                                                render={({ field: { onChange, value } }) => {
                                                    return (
                                                        <div className="input-group_lgrs">
                                                            {item.icon}
                                                            <input
                                                                type={item.type}
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
                <div className="row_lgrs content-row_lgrs">
                    <div className="flex-col_lgrs col_lgrs align-items-center_lgrs">
                        <div className="text_lgrs sign-in_lgrs">
                            <h2>Welcome</h2>
                        </div>
                        <div className="img_lgrs sign-in_lgrs"></div>
                    </div>
                    <div className="flex-col_lgrs col_lgrs align-items-center_lgrs">
                        <div className="img_lgrs sign-up_lgrs"></div>
                        <div className="text_lgrs sign-up_lgrs">
                            <h2>Join with us</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
