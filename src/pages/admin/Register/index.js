import React from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string().required('Confirm password is required'),
});

function RegisterPage() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleLogin = (data) => {
        console.log('data', data);
    };

    return (
        <div className="flex items-center h-screen">
            <div className="relative w-full max-w-md px-6 pt-10 pb-8 mx-auto bg-white shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div className="w-full">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-black">Sign in</h1>
                        <p className="mt-2 text-gray-500">Create your account</p>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="relative mt-6">
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value } }) => {
                                        return (
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                onChange={onChange}
                                                value={value}
                                                placeholder="Email Address"
                                                className="w-full px-0 py-1 mt-1 border-b-2 border-gray-300 peer placeholder:text-gray-900 focus:border-gray-500 focus:outline-none"
                                            />
                                        );
                                    }}
                                    name="email"
                                />
                                {/* {!errors ? (
                                    <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>Email is required</p>
                                ) : null} */}

                                <label
                                    htmlFor="email"
                                    className="absolute top-0 left-0 text-sm text-black transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-black"
                                >
                                    Email Address
                                </label>
                            </div>
                            <div className="relative mt-6">
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value } }) => {
                                        return (
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                onChange={onChange}
                                                value={value}
                                                placeholder="Password"
                                                className="w-full px-0 py-1 mt-1 border-b-2 border-gray-300 peer placeholder:text-gray-900 focus:border-gray-500 focus:outline-none"
                                            />
                                        );
                                    }}
                                    name="password"
                                />

                                <label
                                    htmlFor="password"
                                    className="absolute top-0 left-0 text-sm text-black transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-black"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="relative mt-6">
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, value } }) => {
                                        return (
                                            <input
                                                type="password"
                                                name="confirm_password"
                                                id="password"
                                                onChange={onChange}
                                                value={value}
                                                placeholder="Confirm password"
                                                className="w-full px-0 py-1 mt-1 border-b-2 border-gray-300 peer placeholder:text-gray-900 focus:border-gray-500 focus:outline-none"
                                            />
                                        );
                                    }}
                                    name="confirm_password"
                                />

                                <label
                                    htmlFor="password"
                                    className="absolute top-0 left-0 text-sm text-black transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-black"
                                >
                                    Confirm password
                                </label>
                            </div>
                            <div className="my-6">
                                <button
                                    // type="submit"
                                    className="w-full px-3 py-4 text-white bg-black rounded-md focus:bg-gray-600 focus:outline-none"
                                >
                                    Sign up
                                </button>
                            </div>
                            <p className="text-sm text-center text-gray-500">
                                Don&#x27;t have an account yet?
                                <Link
                                    to="/"
                                    className="font-semibold text-blue-500 hover:underline focus:text-blue-100 focus:outline-none"
                                >
                                    Sign in
                                </Link>
                                .
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
