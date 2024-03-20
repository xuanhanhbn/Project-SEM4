/* eslint-disable react-hooks/exhaustive-deps */
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
import { Link, useLocation, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createProgramApi, getPartnerDetailApi } from './callApi';
import { notify } from '~/utils/common';
import Loading from '~/components/Loading';
import { Input, Progress, Space } from 'antd';
import './style.css';
import ModalCreateProgram from '../ModalCreateProgram';
import moment from 'moment';
function PartnerDetailPage(props) {
    // const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState();
    const [dataDetail, setDataDetail] = useState(null);
    const [isOpenModalCreateProgram, setIsOpenModalCreateProgram] = useState(false);
    const { Search } = Input;

    const params = useParams();

    useEffect(() => {
        if (params && params?.partnerId) {
            return mutationGetSearchPartner(params?.partnerId);
        }
    }, [params]);

    const { mutate: mutationGetSearchPartner, isPending } = useMutation({
        mutationFn: getPartnerDetailApi,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                return setDataDetail(res?.data);
            }
            return notify(res?.message, 'error');
        },
    });

    const { mutate: mutationCreateProgram } = useMutation({
        mutationFn: createProgramApi,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                setIsOpenModalCreateProgram(false);
                mutationGetSearchPartner(params?.partnerId);
                return notify('Create Program Success', 'success');
            }
            return notify(res?.message, 'error');
        },
    });

    const handleCreateProgram = (data) => mutationCreateProgram(data);

    const handleCaculator = (item) => {
        const target = item?.target || 0;
        const total = item?.totalMoney || 0;
        if (target && total) {
            const result = (total / target) * 100;
            if (result >= 100) {
                return 100;
            }
            return result;
        }
        return 0;
    };

    // render data table
    const parseData = useCallback((item, field, index) => {
        if (field === 'actions') {
            return (
                <Link to={`/admin/program/detail/${item?.programId}`}>
                    <i className="fa-sharp fa-solid fa-eye"></i>
                </Link>
            );
        }
        if (field === 'status') {
            if (item.status === 'Active') return <div style={{ color: 'green', fontWeight: 800 }}>{item[field]}</div>;
            return <div style={{ color: 'red', fontWeight: 800 }}>{item[field]}</div>;
        }
        if (field === 'completion') {
            return <Progress percent={handleCaculator(item)} />;
        }
        if (field === 'target' || field === 'totalMoney') {
            return `${(item[field] && item[field].toLocaleString()) || 0} $`;
        }
        if (field === 'createdAt') {
            return moment(item[field])?.format('YYYY-MM-DD');
        }

        return item[field];
    }, []);

    return (
        <div id="partner-detail-container">
            <Loading isLoading={isPending} />
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
                                                <span className="font-semibold text-slate-700 sm:ml-2">
                                                    {dataDetail?.paypalAccount}
                                                </span>
                                            </span>
                                            <span className="text-xs leading-tight">
                                                Vnpay Number:
                                                <span className="font-semibold text-slate-700 sm:ml-2">
                                                    {dataDetail?.vnpayAccount}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <img
                                                src={
                                                    dataDetail?.attachment?.length > 0
                                                        ? dataDetail?.attachment[0]?.url
                                                        : ''
                                                }
                                                al
                                                className="w-16"
                                                alt="fb_logo"
                                            />
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

                    {/* {todayCardData.map((data) => RENDER_TODAY_CARD(data))}

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
                                            <Line options={optionsChartLine} data={linePaymentData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    <div className="w-full mt-4">
                        <div className="flex justify-end max-w-full px-3">
                            <Space direction="vertical">
                                <Search placeholder="Search program" allowClear size="large" />
                            </Space>
                            <div>
                                <button
                                    onClick={() => setIsOpenModalCreateProgram(true)}
                                    className="btn-create-program"
                                >
                                    Create Program
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 pl-3 mt-6 ">
                            <TableCommon
                                data={dataDetail?.programs || []}
                                parseFunction={parseData}
                                columns={columns}
                                isShowPaging
                                className="shadow-md rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {isOpenModalCreateProgram && (
                <ModalCreateProgram
                    isOpen={isOpenModalCreateProgram}
                    handleCreate={handleCreateProgram}
                    handleCancelModalCreate={() => setIsOpenModalCreateProgram(false)}
                    type="create"
                />
            )}
        </div>
    );
}

export default PartnerDetailPage;
