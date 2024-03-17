import React, { useEffect, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import './programDetail.css';
import CardImg from '~/assets/images/campaigns/drc2_homecard.jpg';
import ModalCreateProgram from '../ModalCreateProgram';
import { Line } from 'react-chartjs-2';
import { linePaymentData, optionsChartLine, todayCardData } from './constants';
import { useParams } from 'react-router-dom';
import { notify } from '~/utils/common';
import { getApiDefault } from '~/utils/api';
import Loading from '~/components/Loading';

export default function ProgramDetail() {
    const params = useParams();
    // state
    const ref = useRef();
    const [isOpenModalEditProject, setIsOpenModalEditProject] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dataDetail, setDataDetail] = useState({});

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

    const handleGetDetail = async (id) => {
        try {
            setIsLoading(true);
            const url = `program/detail-program/${id}`;
            const res = await getApiDefault(url);
            if (res && res?.status === 200) {
                setIsLoading(false);
                return setDataDetail(res?.data);
            }
            return setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            return notify(error, 'error');
        }
    };

    // // xử lý open modal edit program
    const showModalEditProgram = () => {
        setIsOpenModalEditProject(true);
    };

    // // xử lý khi click submit edit program
    const handleSubmitModal = () => {
        setIsOpenModalEditProject(false);
        // console.log('click ok btn');
    };

    // xử lý khi click đóng modal
    const handleCancelModal = () => {
        setIsOpenModalEditProject(false);
        // console.log('click cancel btn');
    };

    const handleReturnData = (item) => {
        if (item?.field === 'totalMoney') {
            if (dataDetail && dataDetail?.programs?.length > 0) {
                let tong = 0;
                // Duyệt qua từng phần tử trong mảng và tính tổng
                for (let i = 0; i < dataDetail?.programs?.length; i++) {
                    // Kiểm tra xem thuộc tính "total" có tồn tại không trước khi cộng vào tổng
                    if (dataDetail?.programs[i].hasOwnProperty('totalMoney')) {
                        tong += dataDetail?.programs[i].totalMoney;
                    }
                }
                return `${tong} $`;
            }
            return 0;
        }

        if (item?.field === 'totalDonateForPaypal') {
            if (dataDetail && dataDetail?.programs?.length > 0) {
                let tong = 0;
                // Duyệt qua từng phần tử trong mảng và tính tổng
                for (let i = 0; i < dataDetail?.programs?.length; i++) {
                    // Kiểm tra xem thuộc tính "total" có tồn tại không trước khi cộng vào tổng
                    if (dataDetail?.programs[i].hasOwnProperty('donateByPaypal')) {
                        tong += dataDetail?.programs[i].donateByPaypal;
                    }
                }
                return `${tong} $`;
            }
            return 0;
        }

        if (item?.field === 'totalDonateForVnPay') {
            if (dataDetail && dataDetail?.programs?.length > 0) {
                let tong = 0;
                // Duyệt qua từng phần tử trong mảng và tính tổng
                for (let i = 0; i < dataDetail?.programs?.length; i++) {
                    // Kiểm tra xem thuộc tính "total" có tồn tại không trước khi cộng vào tổng
                    if (dataDetail?.programs[i].hasOwnProperty('donateByVNPay')) {
                        tong += dataDetail?.programs[i].donateByVNPay;
                    }
                }
                return `${tong} $`;
            }
            return 0;
        }

        if (item?.field === 'totalFollowers') {
            return 0;
        }
    };

    const handleReturnImage = () => {
        if (dataDetail && dataDetail?.attachment?.length > 0) {
            const url = dataDetail?.attachment?.filter((logo) => logo?.type === 'Logo');
            return url[0]?.url;
        }
        return CardImg;
    };

    // render thẻ thông số theo ngày
    const RENDER_TODAY_CARD = (data) => {
        return (
            <div className="w-full max-w-full px-3 mb-6 sm:flex-none xl:mb-0 " key={data.id}>
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

    return (
        <div id="programDetail" ref={ref}>
            <Loading isLoading={isLoading} />
            <div className="fixed z-50 right-2 bottom-5"></div>
            <div>
                <h1 className="mb-12 text-4xl font-bold leading-10 ">{dataDetail?.programName}</h1>
            </div>
            <div className="flex flex-nowrap">
                <div className="m-auto lg:w-4/5">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 ">
                            <div className="relative px-4 my-auto z-[1] ">
                                <img
                                    src={handleReturnImage()}
                                    alt={dataDetail?.programName}
                                    className="w-full rounded-2xl"
                                />
                            </div>
                            <div className="card">
                                <div className="card_container">
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Start date: </span>{' '}
                                        {dataDetail?.startDonateDate}
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">End date:</span> {dataDetail?.endDonateDate}
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Finish date:</span> {dataDetail?.finishDate}
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Partner:</span>{' '}
                                        {dataDetail?.partner?.partnerName}
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Status:</span> {dataDetail?.status}
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Field:</span> Children
                                    </div>
                                </div>
                                <button
                                    onClick={() => showModalEditProgram()}
                                    className="px-5 py-2 m-4 text-lg font-semibold text-white rounded-lg bg-blue-103"
                                >
                                    Edit Program
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid-cols-2 gap-4 mt-10 md:grid">
                        {todayCardData.map((data) => RENDER_TODAY_CARD(data))}
                    </div>

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
                    </div>
                </div>
            </div>
            {/* modal tạo chương trình mới */}
            {isOpenModalEditProject && (
                <ModalCreateProgram
                    onOpenCreateModal={isOpenModalEditProject}
                    handleSubmitModalCreate={handleSubmitModal}
                    handleCancelModalCreate={handleCancelModal}
                    type="edit"
                />
            )}
        </div>
    );
}
