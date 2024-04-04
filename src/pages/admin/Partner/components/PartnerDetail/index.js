/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
//
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createProgramApi, getPartnerDetailApi } from './callApi';
import { handleReturnLogoImage, notify } from '~/utils/common';
import Loading from '~/components/Loading';
import { Input, Space } from 'antd';
import './style.css';
import ModalCreateProgram from '../ModalCreateProgram';
import { Tabs } from 'antd';
import ActiveProgram from './components/ActiveProgram';
import DeActiveProgram from './components/DeActiveProgram';
import ListProgramRejected from './components/ProgramRejected';
import ListProgramFinished from './components/ProgramFinished';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';

function PartnerDetailPage(props) {
    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

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
            key: '2',
            label: 'List Proram Pending',
            children: <DeActiveProgram dataDetail={dataDetail} />,
        },
        {
            key: '3',
            label: 'List Program Rejected',
            children: <ListProgramRejected dataDetail={dataDetail} />,
        },
        {
            key: '4',
            label: 'List Program Finished',
            children: <ListProgramFinished dataDetail={dataDetail} />,
        },
    ];

    const onChange = (key) => {
        return key;
    };

    return (
        <div id="partner-detail-container">
            <Loading isLoading={isPending} />
            <div className="w-full px-6 mx-auto">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 mt-6 mb-8 md:flex-none">
                        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-md shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl"></div>
                            <div className="w-full flex items-center justify-center">Partner Info</div>
                            <div className="flex-auto p-4 pt-6">
                                <ul className="pl-0 mb-0 rounded-lg md:grid md:grid-cols-1 md:gap-4 ">
                                    <li className="relative flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
                                        <div className="w-full flex flex-col">
                                            <span className="mb-2 text-base leading-tight">
                                                Company Name:
                                                <span className="font-semibold text-slate-700 sm:ml-2">
                                                    {dataDetail?.partnerName || dataDetail?.displayName}
                                                </span>
                                            </span>

                                            <span className="mb-2 text-base leading-tight">
                                                Email Address:
                                                <span className="font-semibold text-slate-700 sm:ml-2">
                                                    {dataDetail?.email}
                                                </span>
                                            </span>

                                            <span className="mb-2 text-base leading-tight">
                                                Paypal Number:
                                                <span className="font-semibold text-slate-700 sm:ml-2">
                                                    {dataDetail?.paypalAccount || '-'}
                                                </span>
                                            </span>

                                            <span className="mb-2 text-base leading-tight">
                                                Vnpay Number:
                                                <span className="font-semibold text-slate-700 sm:ml-2">
                                                    {dataDetail?.vnpayAccount || '-'}
                                                </span>
                                            </span>

                                            <span className="mb-2 text-base leading-tight">
                                                Description:
                                                <span className="font-semibold text-slate-700 sm:ml-2">
                                                    {dataDetail?.description}
                                                </span>
                                            </span>

                                            <span className="text-base leading-tight">
                                                Status:
                                                <span
                                                    className="font-semibold text-slate-700 sm:ml-2"
                                                    style={{
                                                        fontWeight: 800,
                                                        color: dataDetail?.status === 'Active' ? 'green' : 'red',
                                                    }}
                                                >
                                                    {dataDetail?.status}
                                                </span>
                                            </span>
                                        </div>
                                        <div className=" w-full flex items-center justify-end">
                                            <img
                                                src={handleReturnLogoImage(dataDetail?.attachment)}
                                                className="w-2/5 rounded-lg"
                                                alt="fb_logo"
                                            />
                                        </div>
                                    </li>
                                    {/* <li className="relative flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
                                        <div className="flex flex-col">
                                            <h6 className="mb-4 text-base leading-normal">Description</h6>
                                            <span className="mb-2 text-base leading-tight">
                                                {dataDetail?.description}
                                            </span>
                                        </div>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-4">
                        <div className="flex justify-end max-w-full px-3">
                            <Space direction="vertical">
                                <Search placeholder="Search program" allowClear size="large" />
                            </Space>
                            <div className={userData?.role === 'PARTNER' ? '' : 'hidden'}>
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
