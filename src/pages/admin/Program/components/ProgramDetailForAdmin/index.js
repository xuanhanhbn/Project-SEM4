/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { onGetDetailProgram } from './callApi';
import { notify } from '~/utils/common';
import moment from 'moment';
import CardImg from '~/assets/images/campaigns/drc2_homecard.jpg';
import { Button, Input, Modal } from 'antd';
import './index.css';
import Loading from '~/components/Loading';
import { getApiWithBodyDefault } from '~/utils/api';
const { TextArea } = Input;

function ProgramDetailForAdmin() {
    const baseOpenModal = {
        accept: false,
        cancel: false,
    };
    const params = useParams();
    const navigation = useNavigate();

    const ref = useRef();
    const [dataProgram, setDataProgram] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);
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

    // Hàm xử lý khi nhấn nút Xem thêm hoặc Thu gọn
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

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
        try {
            const url = `program/active-program/${dataProgram?.programId}?reasonRejection=${isMessage}&value=${data}`;
            const res = await getApiWithBodyDefault(url);
            if (res && res.status === 200) {
                notify(res?.data, 'success');
                handleCancel();
                return navigation('admin/program');
                // return mutationGetAllProgram();
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
            }));
        }
        return setIsOpenModal((prev) => ({
            ...prev,
            accept: false,
            cancel: true,
        }));
    };

    // const indexOfSecondPeriod = dataProgram?.description?.indexOf('.', dataProgram?.description?.indexOf('.') + 1);

    // const hiddenText = dataProgram?.description?.slice(0, indexOfSecondPeriod + 1);
    // const longText = dataProgram?.description?.slice(indexOfSecondPeriod + 2);

    // console.log('dataProgram: ', dataProgram);

    return (
        <div id="campaignDetail" ref={ref}>
            <Loading isLoading={isPending} />
            <h1 className="mb-12 text-4xl font-bold leading-10 ">{dataProgram?.programName}</h1>
            {/* <div></div> */}
            <div className="grid grid-rows-1 md:flex">
                <div className="lg:w-7/12">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 ">
                            <div className="relative px-4 my-auto z-[1] ">
                                <img
                                    src={
                                        dataProgram && dataProgram?.attachment?.length > 0
                                            ? dataProgram?.attachment[0]?.url
                                            : CardImg
                                    }
                                    alt={dataProgram?.programName}
                                    className="w-full max-h-96 rounded-2xl"
                                />
                            </div>
                            <div className="mt-[-25%] pt-[25%] bg-white border-gray-400 rounded-2xl border-[.0625rem] flex flex-col relative">
                                <div className="p-5 grid md:grid-cols-3 grid-cols-2 gap-4 shrink basis-auto md:px-16 md:pt-9 md:pb-10 lg:px-[4rem]">
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
                                        <span className="font-semibold">Target:</span> {dataProgram?.target}
                                    </div>

                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Field:</span> Children
                                    </div>
                                    <div
                                        className={`flex-col p-3 text-sm font-semibold text-white bg-blue-500 text-start ${
                                            dataProgram?.recruitCollaborators ? '' : 'hidden'
                                        }`}
                                    >
                                        {dataProgram?.recruitCollaborators ? 'Recruit Collaborators' : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                    {dataProgram?.partner?.partnerName}
                                </div>
                            </div>
                            <div>
                                <div className="text-base font-medium">Partner email:</div>
                                <div className="mt-1 text-lg font-semibold text-gray-100">
                                    {dataProgram?.partner?.email}
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
                                        Accept{' '}
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
        </div>
    );
}

export default ProgramDetailForAdmin;
