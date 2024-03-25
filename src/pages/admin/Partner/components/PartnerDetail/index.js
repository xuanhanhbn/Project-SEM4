/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
//
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createProgramApi, getPartnerDetailApi } from './callApi';
import { notify } from '~/utils/common';
import Loading from '~/components/Loading';
import { Input, Space } from 'antd';
import './style.css';
import ModalCreateProgram from '../ModalCreateProgram';
import { Tabs } from 'antd';
import ActiveProgram from './components/ActiveProgram';
import DeActiveProgram from './components/DeActiveProgram';

function PartnerDetailPage(props) {
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

    const items = [
        {
            key: '1',
            label: 'List All Proram',
            children: <ActiveProgram dataDetail={dataDetail} />,
        },

        {
            key: '3',
            label: 'Program rejected',
            children: <DeActiveProgram />,
        },
    ];

    const onChange = (key) => {
        console.log(key);
    };

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
                        <div className="flex-1 pl-3 mt-6 mb-10">
                            <Tabs onChange={onChange} type="card" items={items} />
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
