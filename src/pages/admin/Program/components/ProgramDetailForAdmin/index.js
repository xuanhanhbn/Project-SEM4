/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { extendProgramApi, onGetDetailProgram } from './callApi';
import { convertTimeStampToDateTime, handleFormatMoney, handleReturnLogoImage, notify } from '~/utils/common';
import { Button, Input, Modal, Progress } from 'antd';
import './index.css';
import Loading from '~/components/Loading';
import { getApiWithBodyDefault } from '~/utils/api';
import ModalEditProgram from '../ModalEditProgram';
import { todayCardData } from './constant';
const { TextArea } = Input;

function ProgramDetailForAdmin() {
    const baseOpenModal = {
        accept: false,
        cancel: false,
        block: false,
        unLock: false,
    };
    const params = useParams();

    const ref = useRef();
    const [dataProgram, setDataProgram] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(baseOpenModal);
    const [isMessage, setIsMessage] = useState('');

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        if (params && params?.programId) {
            async function fetchData() {
                // You can await here
                const response = await handleGetDetail(params?.programId);
                return response;
                // ...
            }
            fetchData();
        }
    }, [params]);

    const { mutate: handleGetDetail, isPending } = useMutation({
        mutationFn: onGetDetailProgram,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                return setDataProgram(res?.data);
            }
            return notify(res?.message, 'error');
        },
    });

    const { mutate: mutationExtendsProgram, isPending: isPendingExtendsProgram } = useMutation({
        mutationFn: extendProgramApi,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                handleGetDetail(params?.programId);
                return setIsOpenModalEdit(false);
            }
            return notify(res?.message, 'error');
        },
    });

    const handleExtendsProgram = (data) => mutationExtendsProgram(data);

    // Hàm xử lý khi nhấn nút Xem thêm hoặc Thu gọn
    const toggleExpanded = () => setIsExpanded(!isExpanded);

    const renderDescription = () => {
        if (isExpanded) {
            return (
                <div>
                    <div dangerouslySetInnerHTML={{ __html: dataProgram?.description }} />
                    <button className="btn-see-more" onClick={toggleExpanded}>
                        Collapse
                    </button>
                </div>
            );
        } else {
            const limitedDescription = dataProgram?.description?.substring(0, 200);
            return (
                <div>
                    <div dangerouslySetInnerHTML={{ __html: limitedDescription }} />
                    <button className="btn-see-more" onClick={toggleExpanded}>
                        See more
                    </button>
                </div>
            );
        }
    };

    const acceptedProgram = async (data) => {
        setIsLoading(true);
        try {
            const url = `program/active-program/${dataProgram?.programId}?reasonRejection=${isMessage}&value=${data}`;
            const res = await getApiWithBodyDefault(url);
            if (res && res.status === 200) {
                setIsLoading(false);
                notify(res?.data, 'success');
                handleCancel();
                return handleGetDetail(params?.programId);
            }
            setIsLoading(false);
        } catch (error) {
            return notify(error, 'error');
        }
    };

    const blockProgram = async (data) => {
        try {
            const url = `program/toggle-lock-program?id=${dataProgram?.programId}&value=${data}`;
            const res = await getApiWithBodyDefault(url);
            if (res && res.status === 200) {
                notify(res?.data, 'success');
                handleCancel();
                return handleGetDetail(params?.programId);
            }
        } catch (error) {
            return notify(error, 'error');
        }
    };
    const handleCancel = () => setIsOpenModal(baseOpenModal);

    const handleOpenModal = (type) => {
        if (type && type === 'accept') {
            return setIsOpenModal((prev) => ({
                ...prev,
                accept: true,
                cancel: false,
                block: false,
            }));
        }
        if (type && type === 'block') {
            return setIsOpenModal((prev) => ({
                ...prev,
                accept: false,
                cancel: false,
                block: true,
            }));
        }
        if (type && type === 'unLock') {
            return setIsOpenModal((prev) => ({
                ...prev,
                accept: false,
                cancel: false,
                block: false,
                unLock: true,
            }));
        }
        if (type && type === 'reject') {
            return setIsOpenModal((prev) => ({
                ...prev,
                accept: false,
                cancel: true,
                block: false,
            }));
        }
        // return setIsOpenModal((prev) => ({
        //     ...prev,
        //     accept: false,
        //     block: false,
        //     cancel: true,
        // }));
    };

    const handleCaculator = () => {
        const target = dataProgram?.target || 0;
        const total = dataProgram?.totalMoney || 0;
        if (target && total) {
            const result = (total / target) * 100;
            if (result >= 100) {
                return 100;
            }
            return result;
        }
        return 0;
    };

    const handleCheckHiden = (type) => {
        if (type && type === 'block') {
            if (dataProgram?.status === 'Active') {
                return 'block';
            }
            return 'hidden';
        }
        if (type && type === 'unLock') {
            if (dataProgram?.status === 'Block') {
                return 'block';
            }
            return 'hidden';
        }
    };

    const handleReturnData = (item) => {
        if (item?.field === 'totalMoney') {
            let tong = 0;
            // Duyệt qua từng phần tử trong mảng và tính tổng
            // Kiểm tra xem thuộc tính "total" có tồn tại không trước khi cộng vào tổng
            if (dataProgram?.hasOwnProperty('totalMoney')) {
                tong += dataProgram?.totalMoney;
            }
            return `${tong !== 0 ? tong?.toLocaleString() : 0} $`;
        }

        if (item?.field === 'totalDonateForPaypal') {
            let tong = 0;
            if (dataProgram?.donations?.length > 0) {
                const filterDonate = dataProgram?.donations?.filter((obj) => obj?.paymentMethod === 'Paypal');
                for (let i = 0; i < filterDonate?.length; i++) {
                    // Kiểm tra xem thuộc tính "total" có tồn tại không trước khi cộng vào tổng
                    if (filterDonate[i].hasOwnProperty('amount')) {
                        tong += filterDonate[i].amount;
                    }
                    return `${tong !== 0 ? tong?.toLocaleString() : 0} $`;
                }
            }
            return '0 $';
        }

        if (item?.field === 'totalDonateForVnPay') {
            let tong = 0;
            if (dataProgram?.donations?.length > 0) {
                const filterDonate = dataProgram?.donations?.filter((obj) => obj?.paymentMethod === 'VNPay');
                for (let i = 0; i < filterDonate?.length; i++) {
                    // Kiểm tra xem thuộc tính "total" có tồn tại không trước khi cộng vào tổng
                    if (filterDonate[i].hasOwnProperty('amount')) {
                        tong += filterDonate[i].amount;
                    }
                    return `${tong !== 0 ? tong?.toLocaleString() : 0} $`;
                }
            }
            return '0 $';
        }

        if (item?.field === 'totalFollowers') {
            return dataProgram?.countVolunteer || 0;
        }
    };

    const RENDER_TODAY_CARD = (data) => {
        return (
            <div className="w-full max-w-full  mb-6 sm:flex-none xl:mb-0 " key={data.id}>
                <div className="relative flex flex-col min-w-0 break-words bg-white shadow-md rounded-2xl bg-clip-border">
                    <div className="flex-auto p-4">
                        <div className="flex flex-row -mx-3">
                            <div className="flex-none w-2/3 max-w-full px-3">
                                <div>
                                    <p className="mb-0 font-sans text-sm font-semibold leading-normal">
                                        {data.cardName}
                                    </p>
                                    <h5 className="mb-0 font-bold">{handleReturnData(data)}</h5>
                                </div>
                            </div>
                            <div className="px-3 text-right basis-1/3">
                                <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                    <div className="text-lg relative top-3.5 text-white">{data.cardIcon}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleCheckHiddenEdit = () => {
        if (dataProgram?.status === 'End') {
            return 'hidden';
        }
        return '';
    };

    return (
        <div id="campaignDetail" ref={ref}>
            <Loading isLoading={isPending || isPendingExtendsProgram || isLoading} />
            <h1 className="mb-12 text-4xl font-bold leading-10 ">{dataProgram?.programName}</h1>
            {/* <div></div> */}
            <div className="grid grid-rows-1 md:flex">
                <div className="lg:w-7/12">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 ">
                            <div className="relative px-4 my-auto z-[1] ">
                                <img
                                    src={handleReturnLogoImage(dataProgram?.attachment)}
                                    alt={dataProgram?.programName}
                                    className="w-full max-h-96 rounded-2xl"
                                />
                            </div>
                            <div className="mt-[-25%] pt-[25%] bg-white border-gray-400 rounded-2xl border-[.0625rem] flex flex-col relative">
                                <div className="p-8 grid md:grid-cols-3 grid-cols-2 gap-4 shrink basis-auto md:px-8 md:pt-9 md:pb-10 ">
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Start date: </span>{' '}
                                        {dataProgram?.startDonateDate}
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">End date:</span> {dataProgram?.endDonateDate}
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Finish date:</span> {dataProgram?.finishDate}
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Target:</span>{' '}
                                        {handleFormatMoney(dataProgram?.target)}
                                    </div>

                                    <div className="flex-col text-start">
                                        <div className="flex items-center">
                                            <span className="font-semibold">Status:</span>
                                            <p
                                                className="ml-1"
                                                style={{
                                                    color: dataProgram?.status === 'Active' ? 'green' : 'red',
                                                    fontWeight: 800,
                                                }}
                                            >
                                                {dataProgram?.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex-col text-start">
                                        <Progress percent={handleCaculator()} />
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-center mb-2">
                                    <div className={`w-[50%] ${handleCheckHiden('block')}`}>
                                        <Button
                                            onClick={() => handleOpenModal('block')}
                                            className="w-[60%]"
                                            size="large"
                                            type="primary"
                                            danger
                                        >
                                            Block
                                        </Button>
                                    </div>

                                    <div className={`w-[50%] ${handleCheckHiden('unLock')}`}>
                                        <Button
                                            onClick={() => handleOpenModal('unLock')}
                                            className="w-[60%]"
                                            size="large"
                                            type="primary"
                                            danger
                                        >
                                            Un BLock
                                        </Button>
                                    </div>

                                    <div className={`w-[50%] ${handleCheckHiddenEdit()}`}>
                                        <Button
                                            onClick={() => setIsOpenModalEdit(true)}
                                            className="w-[60%]"
                                            size="large"
                                            type="default"
                                        >
                                            EDIT
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            dataProgram?.status === 'Active' || dataProgram?.status === 'End'
                                ? 'grid-cols-2 gap-4 mt-10 md:grid'
                                : 'hidden'
                        }
                    >
                        {todayCardData.map((data) => RENDER_TODAY_CARD(data))}
                    </div>

                    <div className="mt-10">
                        <div className="p-5 text-left bg-white rounded-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold leading-8 ">Overview</h2>
                            </div>
                            <p className="mb-6 text-sm font-semibold leading-6">
                                Shared meals will provide emergency food assistance to families in Palestine.
                            </p>
                            <div>
                                <p className="text-sm leading-6 text-gray-100"></p>
                                {renderDescription()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 md:w-5/12 md:pr-4 md:pl-11 md:mt-0">
                    <div className="sticky py-6 bg-white top-24 rounded-2xl">
                        <div className="flex items-center justify-around mb-5">
                            <h3 className="text-2xl font-bold leading-8 ">Program Partner</h3>
                        </div>
                        <div className="grid grid-rows-1 gap-4 px-6 pt-3 text-left">
                            <div>
                                <div className="text-base font-medium">Partner name:</div>
                                <div className="mt-1 text-lg font-semibold text-gray-100">
                                    <Link to={`/admin/partner/detail/${dataProgram?.partner?.partnerId}`}>
                                        {dataProgram?.partner?.partnerName}
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <div className="text-base font-medium">Partner email:</div>
                                <div className="mt-1 text-lg font-semibold text-gray-100">
                                    {dataProgram?.partner?.email}
                                </div>
                            </div>

                            <div>
                                <div className="text-base font-medium">Created At:</div>
                                <div className="mt-1 text-lg font-semibold text-gray-100">
                                    {convertTimeStampToDateTime(dataProgram?.partner?.createdAt)}
                                </div>
                            </div>

                            <div className={dataProgram?.status === 'DeActive' ? '' : 'hidden'}>
                                <div className="text-base font-medium">Request:</div>
                                <div className="mt-1 text-gray-100">
                                    <span className="font-medium text-black">{dataProgram?.partner?.partnerName}</span>{' '}
                                    has submitted a request for approval of the
                                    <span className="font-medium text-black"> {dataProgram?.programName}</span> program.
                                    Respond using the options below.
                                </div>
                                <div className="flex justify-around mt-6">
                                    <Button
                                        onClick={() => handleOpenModal('accept')}
                                        className="w-2/5 text-blue-100 border-blue-100"
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        onClick={() => handleOpenModal('reject')}
                                        type="primary"
                                        className="w-2/5"
                                        danger
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </div>
                            {/* <div></div> */}
                        </div>
                    </div>
                </div>
            </div>

            {isOpenModal && isOpenModal.cancel && (
                <Modal
                    footer={false}
                    title="Refuse Program"
                    open={isOpenModal.cancel}
                    // onOk={refuseProgram}
                    onCancel={handleCancel}
                >
                    <div>
                        <TextArea
                            placeholder="Enter the reason for rejection"
                            allowClear
                            onChange={(e) => setIsMessage(e.target.value)}
                        />
                        <Button
                            disabled={isMessage ? false : true}
                            // onClick={() => refuseProgram()}
                            onClick={() => acceptedProgram('Reject')}
                            type="primary"
                            className="mt-3 "
                            ghost
                        >
                            Send Message
                        </Button>
                    </div>
                </Modal>
            )}

            {isOpenModal && isOpenModal.accept && (
                <Modal
                    title="Accept Program"
                    open={isOpenModal.accept}
                    onOk={() => acceptedProgram('Active')}
                    onCancel={handleCancel}
                    // footerRenderParams={{
                    //     extra: {
                    //         OkBtn: <></>,
                    //     },
                    // }}
                >
                    <p>Program approval confirmation, upon confirmation the program will be activated</p>
                </Modal>
            )}

            {isOpenModal && isOpenModal.block && (
                <Modal
                    title="Block Program"
                    open={isOpenModal.block}
                    classNames="bg-red"
                    onOk={() => blockProgram('Block')}
                    okText="Confirm"
                    onCancel={handleCancel}
                >
                    <p>
                        Before you proceed to block the program, please be aware of the following: <br /> Blocking this
                        program may prevent it from running on your device. Ensure that you understand the consequences
                        of this action before proceeding. If you are certain that you want to block the program, please
                        click "Confirm" below. Otherwise, click "Cancel" to exit.
                    </p>
                </Modal>
            )}

            {isOpenModal && isOpenModal.unLock && (
                <Modal
                    title="Program Access Control"
                    open={isOpenModal.unLock}
                    classNames="bg-red"
                    onOk={() => blockProgram('unLock')}
                    okText="Unblock"
                    onCancel={handleCancel}
                >
                    <p>
                        Before proceeding, please note the following: <br />
                        Unblock the program if you wish to allow it to run again on your device. To confirm blocking
                        this program, click "Cancel". To unblock it, click "Unblock".
                    </p>
                </Modal>
            )}

            {isOpenModalEdit && (
                <ModalEditProgram
                    oldData={dataProgram}
                    isOpen={isOpenModalEdit}
                    onClose={() => setIsOpenModalEdit(false)}
                    onEdit={handleExtendsProgram}
                />
            )}
        </div>
    );
}

export default ProgramDetailForAdmin;
