import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './HomeConnect.css';
import Mail_connect from '~/assets/images/logo/connect_mail.png';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        // eslint-disable-next-line no-useless-escape
        .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email invalid'),
});

export default function HomeConnect() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: null,
        },
    });

    // xử lý click nút send mail contact

    const onSubmit = (data) => console.log(data);

    return (
        <div id="homeConnect" className="px-6 py-9">
            <div className="flex justify-center">
                <div className="relative w-full lg:w-4/6">
                    <div className="home_container">
                        <div className="relative md:w-[45%] flex items-center justify-center w-full">
                            <img src={Mail_connect} alt="" className="h-24 md:w-full md:h-full" />
                        </div>
                        <div className="home_content">
                            <h4 className="mb-2 text-base font-bold leading-6 md:leading-10 md:text-4xl">
                                Got a taste for fighting hunger?
                            </h4>
                            <p className="mb-8 text-sm leading-6 text-gray-100 md:text-base">
                                Connect with your impact by signing up for our newsletter.
                            </p>
                            <form className="form " onSubmit={handleSubmit(onSubmit)}>
                                <div className="relative text-black">
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, value } }) => {
                                            return (
                                                <input
                                                    placeholder="Enter your mail"
                                                    type="text"
                                                    className="home_input placeholder:text-gray-100"
                                                    onChange={onChange}
                                                    value={value == null ? '' : value}
                                                />
                                            );
                                        }}
                                        name="email"
                                    />
                                    <div className="h-6 my-3 text-red-600">{errors.email?.message}</div>

                                    <button type="submit" className="home_btn">
                                        <i className="text-2xl text-white fa-solid fa-paper-plane-top"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
