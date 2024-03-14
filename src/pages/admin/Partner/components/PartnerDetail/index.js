import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { Input, Tabs, Upload } from 'antd';
import {
    columns,
    fakeDataTable,
    inputChangePassword,
    inputUpdateProfile,
    linePaymentData,
    optionsChartLine,
    tabItems,
} from './constants';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
// import { useMutation } from '@tanstack/react-query';
// import { beforeUpload, notify } from '~/utils/common';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { yupResolver } from '@hookform/resolvers/yup';
// import TextArea from 'antd/es/input/TextArea';
// import { Link, useLocation } from 'react-router-dom';
// import logo from '~/assets/images/logo/16889553131686049166paypal.png';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import { todayCardData } from './constants';
import { Line } from 'react-chartjs-2';
import TableCommon from '~/components/TableCommon';
import { useLocation } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    // programThumbnailId: Yup.mixed().required('Partner Thumbnail is required'),
    partnerName: Yup.string().required('Company name is required'),
    email: Yup.string()
        .required('Email adress is required')
        .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email invalid'),
    // phone: Yup.string().required('Phone number is required'),
    // address: Yup.string().required('Adress is required'),
    // website: Yup.string().required('Website date is required'),
    description: Yup.string().required('Describe is required'),
    // urlLogo: Yup.string().required('Describe is required'),
    // finishDate: Yup.string().required('Finish date is required'),
    // target: Yup.string().required('Target is required'),
});

// // validate change password form
// const validationChangePasswordSchema = Yup.object().shape({
//     // oldPassword: Yup.string().required('Password is required'),
//     newPassword: Yup.string().required('Password is required'),
//     confirmPassword: Yup.string()
//         .required('Password is required')
//         .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
// });

function PartnerDetailPage() {
    // const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState();
    const [dataDetail, setDataDetail] = useState(null);
    const [urlLogo, setUrlLogo] = useState(null);

    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    const location = useLocation();
    const data = location?.state;

    // lấy data theo role
    const dataPartnerDetail = (data) => {
        if (userData?.role === 'PARTNER') {
            setDataDetail(userData);
            setUrlLogo(userData.avatarUrl);
        }
        if (userData?.role === 'ADMIN') {
            setDataDetail(data);
            setUrlLogo(data?.attachment[0]?.url);
        }
    };

    console.log('datauer: ', dataDetail);

    useEffect(() => {
        dataPartnerDetail(data);
    }, []);

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // const {
    //     control: controlChangePassword,
    //     handleSubmit: handleChangePassword,
    //     formState: { errors: errorsChangePassword },
    // } = useForm({
    //     resolver: yupResolver(validationChangePasswordSchema),
    // });

    // // handle change upload image logo
    // const handleChange = (info) => {
    //     const files = info.file || {};

    //     if (files.status === 'uploading') {
    //         return;
    //     }

    //     if (files.status === 'done') {
    //         // console.log('files', files.originFileObj);
    //     }
    //     // mutationUploadLogo({ files: files.originFileObj });
    // };

    // // handle change tabs
    // const onChange = (key) => {
    //     // console.log(key);
    // };

    // // handle update partner info
    // const updatePartner = (data) => {
    //     console.log('data: ', data);

    //     // mutationUpdatepartner(dataUpdate);
    // };

    // // handle submit change password
    // const changePassword = (data) => {
    //     console.log('data: ', data);

    //     // mutationUpdatepartner(dataUpdate);
    // };

    // // button upload logo
    // const uploadButton = (
    //     <button
    //         style={{
    //             border: 0,
    //             background: 'none',
    //         }}
    //         type="button"
    //     >
    //         {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //         <div
    //             style={{
    //                 marginTop: 8,
    //             }}
    //         >
    //             Upload
    //         </div>
    //     </button>
    // );

    // // render input create program
    // const RENDER_INPUT_UPDATE_PROFILE = (item) => {
    //     if (item.type === 'INPUT') {
    //         const { field } = item;
    //         const message = errors[field] && errors[field].message;
    //         return (
    //             <div key={item.field} className="flex flex-col col-span-2">
    //                 <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
    //                 <Controller
    //                     control={control}
    //                     render={({ field: { onChange, value } }) => {
    //                         return (
    //                             <Input
    //                                 onChange={onChange}
    //                                 value={value}
    //                                 className="h-10"
    //                                 placeholder={item.placeholder}
    //                             />
    //                         );
    //                     }}
    //                     name={item.field}
    //                 />
    //                 {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
    //             </div>
    //         );
    //     }

    //     if (item.type === 'INPUT_AREA') {
    //         const { field } = item;
    //         const message = errors[field] && errors[field].message;
    //         return (
    //             <div key={item.field} className="flex flex-col col-span-2">
    //                 <label className="mb-2 text-xs font-bold ">{item.lable}:</label>
    //                 <Controller
    //                     control={control}
    //                     render={({ field: { onChange, value } }) => {
    //                         return (
    //                             <TextArea
    //                                 autoSize={{
    //                                     minRows: 3,
    //                                     maxRows: 5,
    //                                 }}
    //                                 onChange={onChange}
    //                                 value={value}
    //                                 placeholder="Short description about partner."
    //                             />
    //                         );
    //                     }}
    //                     name={item.field}
    //                 />
    //                 {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
    //             </div>
    //         );
    //     }

    //     if (item.type === 'INPUT_UPLOAD') {
    //         return (
    //             <div key={item.field} className="flex flex-col col-span-2">
    //                 <>
    //                     <label className="mb-2 text-xs font-bold ">{item.lable}</label>

    //                     <Upload
    //                         name="urlLogo"
    //                         listType="picture-card"
    //                         className="avatar-uploader"
    //                         accept="image/png, image/jpeg,image/jpg"
    //                         showUploadList={false}
    //                         action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
    //                         beforeUpload={beforeUpload}
    //                         onChange={handleChange}
    //                     >
    //                         {imageUrl ? (
    //                             <img
    //                                 src={imageUrl}
    //                                 alt="avatar"
    //                                 // type="file"
    //                                 style={{
    //                                     width: '70%',
    //                                 }}
    //                             />
    //                         ) : (
    //                             uploadButton
    //                         )}
    //                     </Upload>
    //                 </>
    //             </div>
    //         );
    //     }
    // };

    // // render input change password
    // const RENDER_INPUT_CHANGE_PASSWORD = (item) => {
    //     const { field } = item;
    //     const message = errorsChangePassword[field] && errorsChangePassword[field].message;
    //     return (
    //         <div key={item.field} className="flex flex-col col-span-2">
    //             <label className="mb-2 text-xs font-bold ">{item.label}:</label>
    //             <Controller
    //                 control={controlChangePassword}
    //                 render={({ field: { onChange, value } }) => {
    //                     return (
    //                         <Input.Password
    //                             onChange={onChange}
    //                             value={value}
    //                             className="h-10"
    //                             placeholder={item.placeholder}
    //                         />
    //                     );
    //                 }}
    //                 name={item.field}
    //             />
    //             {message && <p style={{ color: 'red', marginTop: 0, marginBottom: 10 }}>{message}</p>}
    //         </div>
    //     );
    // };

    // render thẻ thông số theo ngày
    const RENDER_TODAY_CARD = (data) => {
        return (
            <div id="todayCard" key={data.id}>
                <div className="card_container">
                    <div className="flex-auto p-4">
                        <div className="flex flex-row -mx-3">
                            <div className="flex-none w-2/3 max-w-full px-3">
                                <div>
                                    <p className="mb-0 font-sans text-sm font-semibold leading-normal">
                                        {data.cardName}
                                    </p>
                                    <h5 className="mb-0 font-bold">{data.todayAmount}</h5>
                                </div>
                            </div>
                            <div className="px-3 text-right basis-1/3">
                                <div className="card_icon">
                                    <div className="text-lg relative top-3.5 text-white">{data.cardIcon}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // render data table
    const parseData = useCallback((item, field, index) => {
        if (field === 'completion') {
            return (
                <div id="completion">
                    <div>
                        <div>
                            <span className="text-xs font-semibold leading-tight">60%</span>
                        </div>
                    </div>
                    <div className="flex m-0 overflow-visible text-xs bg-gray-200 rounded-lg">
                        <div className="completion_"></div>
                    </div>
                </div>
            );
        }

        return item[field];
    }, []);
    return (
        <div>
            <div className="w-full px-6 mx-auto">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 mt-6 mb-8 md:flex-none">
                        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-md shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl"></div>
                            <div className="flex-auto p-4 pt-6">
                                <ul className="pl-0 mb-0 rounded-lg md:grid md:grid-cols-2 md:gap-4 ">
                                    <li className="relative flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
                                        <div className="flex flex-col">
                                            <h6 className="mb-4 text-sm leading-normal">Partner info</h6>
                                            <span className="mb-2 text-xs leading-tight">
                                                Company Name:
                                                <span className="font-semibold text-slate-700 sm:ml-2">
                                                    {dataDetail?.partnerName || dataDetail?.displayName}
                                                </span>
                                            </span>
                                            <span className="mb-2 text-xs leading-tight">
                                                Email Address:
                                                <span className="font-semibold text-slate-700 sm:ml-2">
                                                    {dataDetail?.email}
                                                </span>
                                            </span>
                                            <span className="text-xs leading-tight">
                                                Paypal Number:
                                                <span className="font-semibold text-slate-700 sm:ml-2">FRB1235476</span>
                                            </span>
                                            <span className="text-xs leading-tight">
                                                Vnpay Number:
                                                <span className="font-semibold text-slate-700 sm:ml-2">FRB1235476</span>
                                            </span>
                                        </div>
                                        <div className="ml-auto text-right">
                                            {/* logo */}
                                            <img src={urlLogo} className="w-16" alt="fb_logo" />
                                        </div>
                                    </li>
                                    <li className="relative flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
                                        <div className="flex flex-col">
                                            <h6 className="mb-4 text-sm leading-normal">Description</h6>
                                            <span className="mb-2 text-xs leading-tight">
                                                {dataDetail?.description}
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* thẻ tổng hợp theo ngày */}
                    {todayCardData.map((data) => RENDER_TODAY_CARD(data))}

                    <div className="flex-1 w-full mt-12 ">
                        <div className="w-full max-w-full px-3 mt-0 lg:flex-none">
                            <div className="shadow-md h-[400px] relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                                <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-solid rounded-t-2xl">
                                    <h6>Payment methods overview</h6>
                                    <p className="text-sm leading-normal">
                                        <i className="fa fa-arrow-up text-lime-500"></i>
                                        <span className="font-semibold">4% more</span> in 2023
                                    </p>
                                </div>
                                <div className="flex-auto p-4">
                                    <div className="h-full">
                                        {/* bảng so danh lương thanh toán qua 2 phương thức paypal và card */}
                                        <Line options={optionsChartLine} data={linePaymentData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap w-full ">
                        <div className="flex-1 pl-3 mt-6 ">
                            <TableCommon
                                data={fakeDataTable || []}
                                parseFunction={parseData}
                                columns={columns}
                                isShowPaging
                                className="shadow-md rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartnerDetailPage;
