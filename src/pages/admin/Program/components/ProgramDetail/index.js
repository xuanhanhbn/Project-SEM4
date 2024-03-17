import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';

import './programDetail.css';
import CardImg from '~/assets/images/campaigns/drc2_homecard.jpg';
// import { Link } from 'react-router-dom';
import ModalCreateProgram from '../ModalCreateProgram';
import { Line } from 'react-chartjs-2';
import { linePaymentData, optionsChartLine, todayCardData } from './constants';
// import ChatBoxCustom from './ChatBox';

export default function ProgramDetail() {
    // state
    const [isOpenModalEditProject, setIsOpenModalEditProject] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);

    // const [isOpenChatBox, setisOpenChatBox] = useState(false);

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

    // xử lý mở chat box
    // const handleChangeStateOpenChatBox = async () => {
    //     setisOpenChatBox(!isOpenChatBox);

    //     const combinedId = currentUser?.uid > adminId ? currentUser?.uid + adminId : adminId + currentUser?.uid;
    //     try {
    //         const res = await getDoc(doc(db, 'chats', combinedId));
    //         if (!res.exists()) {
    //             //create a chat in chats collection
    //             await setDoc(doc(db, 'chats', combinedId), { messages: [] });

    //             //create user chats
    //             await updateDoc(doc(db, 'userChats', currentUser?.uid), {
    //                 [combinedId + '.userInfo']: {
    //                     uid: adminId,
    //                     //   displayName: user.displayName,
    //                     //   photoURL: user.photoURL,
    //                 },
    //                 [combinedId + '.date']: serverTimestamp(),
    //             });

    //             await updateDoc(doc(db, 'userChats', adminId), {
    //                 [combinedId + '.userInfo']: {
    //                     uid: currentUser?.uid,
    //                     displayName: currentUser?.displayName,
    //                     photoURL: currentUser?.photoURL,
    //                 },
    //                 [combinedId + '.date']: serverTimestamp(),
    //             });
    //         }
    //     } catch (err) {
    //         return err;
    //     }
    // };

    return (
        <div id="programDetail">
            <div className="fixed z-50 right-2 bottom-5"></div>
            <div>
                <h1 className="mb-12 text-4xl font-bold leading-10 ">Help in the Democratic Republic of the Congo</h1>
            </div>
            <div className="flex flex-nowrap">
                <div className="m-auto lg:w-4/5">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 ">
                            <div className="relative px-4 my-auto z-[1] ">
                                <img src={CardImg} alt="" className="w-full rounded-2xl" />
                            </div>
                            <div className="card">
                                <div className="card_container">
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Start date: </span> 20/10/2022
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">End date:</span> 20/10/2022
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Finish date:</span> 20/10/2022
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Partner:</span> Facebook
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Status:</span> Not start
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
