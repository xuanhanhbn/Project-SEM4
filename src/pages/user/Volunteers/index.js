import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { inputVolunteerForm } from './constants';
import { Input, Select } from 'antd';

// validate form đăng ký volunteer
const validationSchema = Yup.object().shape({
    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^(0[3|5|7|8|9]{1})([0-9]{8})$/, 'Phone number invalid'),
    fullName: Yup.string().required('Name is required'),
    programId: Yup.string().required('Program is required'),
    email: Yup.string()
        .required('Email is required')
        .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email invalid'),
});

function VolunteerPage() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // xử lý khi click nút submit
    const onSubmit = (data) => {
        console.log('dataSubmit: ', data);
    };

    const options = [
        {
            value: 'programId1',
            label: 'Jack',
        },
        {
            value: 'programId2',
            label: 'Lucy',
        },
        {
            value: 'programId3',
            label: 'Tom',
        },
    ];

    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const RENDER_INPUT_FORM = (item) => {
        const { field } = item;
        const message = errors[field] && errors[field].message;

        if (item.type === 'select') {
            return (
                <div key={item.id}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Select
                                    showSearch
                                    className="w-full h-10"
                                    placeholder="Select a program"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    filterOption={filterOption}
                                    options={options}
                                />
                            );
                        }}
                        name={item.field}
                    />
                    <div className="mt-0 text-red-600"> {message}</div>
                </div>
            );
        } else {
            return (
                <div key={item.id}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Input
                                    type={item.type}
                                    className="w-full h-10"
                                    onChange={onChange}
                                    value={value == null ? '' : value}
                                    placeholder={`${item.placeholder}*`}
                                />
                            );
                        }}
                        name={item.field}
                    />
                    <div className="mt-0 text-red-600"> {message}</div>
                </div>
            );
        }
    };

    return (
        <div>
            <div className="relative py-4">
                <div className="absolute inset-0 grid w-full grid-cols-2 m-auto h-max -space-x-52 opacity-40 dark:opacity-20">
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-teal-500 to-purple-400 dark:from-blue-700"></div>
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
                </div>

                <div className="py-16 mx-auto sm:px-6 lg:px-8">
                    <div className="relative px-6 pb-24 overflow-hidden text-center isolate sm:rounded-3xl sm:px-16">
                        <h2 className="max-w-2xl mx-auto text-3xl font-bold tracking-wide uppercase font-nudge-extrabold sm:text-4xl">
                            Join our community now
                        </h2>
                        <p className="max-w-xl mx-auto mt-6 text-lg leading-8 text-gray-100">
                            Experience the benefits of our community. No obligations, just join and explore.
                        </p>
                        <div className="flex items-center justify-center mt-8 -space-x-2 overflow-hidden isolate">
                            <img
                                className="relative z-30 inline-block w-10 h-10 rounded-full ring-2 ring-white"
                                src="https://randomuser.me/api/portraits/men/34.jpg"
                                alt=""
                            />
                            <img
                                className="relative z-20 inline-block w-10 h-10 rounded-full ring-2 ring-white"
                                src="https://randomuser.me/api/portraits/women/2.jpg"
                                alt=""
                            />
                            <img
                                className="relative z-10 inline-block w-10 h-10 rounded-full ring-2 ring-white"
                                src="https://randomuser.me/api/portraits/women/3.jpg"
                                alt=""
                            />
                            <img
                                className="relative z-0 inline-block w-10 h-10 rounded-full ring-2 ring-white"
                                src="https://randomuser.me/api/portraits/men/4.jpg"
                                alt=""
                            />
                            <span className="!ml-2 font-bold italic text-teal-500">Join these awesome members</span>
                        </div>
                        <div className="flex items-center justify-center mt-12 gap-x-6">
                            <button
                                type="button"
                                onClick={() => scroll.scrollTo(700)}
                                className="relative inline-flex items-center px-6 py-4 font-semibold text-white bg-teal-600 rounded-lg shadow-sm text-md gap-x-2 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                            >
                                <span className="absolute left-0 w-full text-xs italic text-left text-teal-600 -top-5">
                                    No Obligations
                                </span>
                                Join Now
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center h-full pb-12 md:pb-24">
                <div className="container px-4 mx-auto my-4 lg:px-20">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full p-8 my-4 mr-auto bg-white shadow-2xl md:px-12 lg:w-7/12 lg:pl-20 lg:pr-40 rounded-2xl"
                    >
                        <Link
                            activeClass="active"
                            to="volunteer-form"
                            spy={true}
                            smooth={true}
                            offset={50}
                            duration={500}
                        />
                        <div id="volunteer-form">
                            <div className="flex">
                                <h1 className="text-3xl font-bold uppercase md:text-5xl">
                                    Become a <br /> volunteer
                                </h1>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-5 mt-5">
                            {inputVolunteerForm.map((data) => RENDER_INPUT_FORM(data))}
                        </div>

                        <div className="my-2 mt-3 md:w-1/2">
                            <button className="w-full p-3 text-sm font-bold tracking-wide text-white uppercase bg-blue-500 rounded-lg focus:outline-none focus:shadow-outline">
                                submit now
                            </button>
                        </div>
                    </form>

                    <div className="w-full lg:-mt-[34rem] lg:w-1/2 px-8 py-12 ml-auto bg-blue-500 rounded-2xl">
                        <div className="flex flex-col text-white">
                            <h1 className="my-4 text-4xl font-bold uppercase">Drop in our office</h1>
                            <p className="text-gray-400">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt arcu diam, eu
                                feugiat felis fermentum id. Curabitur vitae nibh viverra, auctor turpis sed, scelerisque
                                ex.
                            </p>

                            <div className="flex w-2/3 my-4 lg:w-1/2">
                                <div className="flex flex-col">
                                    <i className="pt-2 pr-2 fas fa-map-marker-alt" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Main Office</h2>
                                    <p className="text-gray-400">5555 Hanoi, Cau Giay, Ton That Thuyet 73533</p>
                                </div>
                            </div>

                            <div className="flex w-2/3 my-4 lg:w-1/2">
                                <div className="flex flex-col">
                                    <i className="pt-2 pr-2 fas fa-phone-alt" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Call Us</h2>
                                    <p className="text-gray-400">Tel: xxx-xxx-xxx</p>
                                    <p className="text-gray-400">Fax: xxx-xxx-xxx</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VolunteerPage;
