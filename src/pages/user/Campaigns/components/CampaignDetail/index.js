/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import './CampaignDetail.css';
import './style.css';
import CardImg from '~/assets/images/campaigns/drc2_homecard.jpg';
import Img from '~/assets/images/logo/Screenshot .png';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import ModalDonate from './components/ModalDonate';
import dfAvatar from '~/assets/images/avatar/default-avatar.jpg';
import ShareMailModal from '../ShareMailModal';
import { AuthContext } from '~/context/AuthContext';
import { ChatContext } from '~/context/ChatContext';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '~/firebase';
import ChatBoxCustom from '~/components/ChatBox';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import { useMutation } from '@tanstack/react-query';
import { getDetailProgram, onDonateProgram } from './callApi';
import { notify } from '~/utils/common';
import Loading from '~/components/Loading';
import { Collapse, Progress } from 'antd';
import moment from 'moment';
import { exchangeRateMoney } from '~/utils/constant';
import { Tabs } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const TabPane = Tabs.TabPane;

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/250/150/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
];

export default function CampaignDetail(props) {
    const baseDataRequestDonate = {
        amount: 0,
        description: '',
        paymentMethod: 'Paypal',
        programId: 0,
        userId: 0,
    };
    const params = useParams();

    const programId = params?.programId;
    const status = 'cc';

    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    // state
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalShareMail, setIsOpenModalShareMail] = useState(false);
    // State
    const [isOpenChatBox, setisOpenChatBox] = useState(false);
    const [chats, setChats] = useState({});
    const [user, setUser] = useState(null);
    const [dataDetail, setDataDetail] = useState({});
    const [dataRequestDonate, setDataRequestDonate] = useState(baseDataRequestDonate);
    const [listImage, setListImage] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const ref = useRef();
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    const indexOfSecondPeriod = dataDetail?.description?.indexOf('.', dataDetail?.description?.indexOf('.') + 1);

    const hiddenText = dataDetail?.description?.slice(0, indexOfSecondPeriod + 1);
    const longText = dataDetail?.description?.slice(indexOfSecondPeriod + 2);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // useEffect(() => {
    //     handleSearchUser();
    // }, []);
    // const getChats = () => {
    //     const unsub = onSnapshot(doc(db, 'userChats', currentUser?.uid), (doc) => {
    //         setChats(doc.data());
    //     });
    //     return unsub;
    // };

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser?.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };
        currentUser?.uid && getChats();
    }, [currentUser]);

    useEffect(() => {
        if (programId) {
            getDetailProgramApi(programId);
        }
    }, [programId]);

    const { mutate: getDetailProgramApi, isPending } = useMutation({
        mutationFn: getDetailProgram,
        onSuccess: (res) => {
            // console.log('res: ', res);
            if (res && res?.status === 200) {
                if (res && res?.data?.attachment?.length > 0) {
                    const listImage = res?.data?.attachment?.filter((obj) => obj.type !== 'Logo');
                    const convertedArray = listImage.map((item) => {
                        return {
                            original: item.url,
                            thumbnail: item.url,
                        };
                    });
                    setListImage(convertedArray);
                }
                const emailPartner = res?.data?.partner?.email;
                handleSearchUser(emailPartner);
                return setDataDetail(res?.data);
            }
            return notify('error', 'error');
        },
    });

    const { mutate: donateProgram, isPending: isPendingDonate } = useMutation({
        mutationFn: onDonateProgram,
        onSuccess: (data) => {
            if (data && data?.status === 200) {
                const url = data?.data?.url;
                return window.open(url, '_blank');
            }
            return notify('error', 'error');
        },
    });

    const handleSearchUser = async (emailPartner) => {
        const q = query(collection(db, 'users'), where('email', '==', emailPartner));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (doc && doc?.data()) {
                    // getChats();
                    return setUser(doc.data());
                }
            });
        } catch (err) {
            return err;
        }
    };

    useEffect(() => {
        if (Object.keys(chats)?.length && isOpenChatBox) {
            Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => dispatch({ type: 'CHANGE_USER', payload: chat[1]?.userInfo }));
        }
    }, [isOpenChatBox]);

    // xử lý mở chat box
    const handleChangeStateOpenChatBox = async () => {
        setisOpenChatBox(!isOpenChatBox);

        const combinedId = currentUser?.uid > user?.uid ? currentUser?.uid + user?.uid : user?.uid + currentUser?.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, 'userChats', currentUser?.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user?.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', user?.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser?.uid,
                        displayName: currentUser?.displayName,
                        photoURL: currentUser?.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {
            return err;
        }
    };

    // xử lý open modal
    const showModal = () => setIsOpenModal(true);

    // xử lý open modal share mail
    const showModalShareMail = () => {
        setIsOpenModalShareMail(true);
    };

    // xử lý khi click submit modal
    const handleSubmitModal = () => {
        setIsOpenModal(false);
    };

    // xử lý khi click submit modal share mail
    const handleSubmitModalShareMail = () => {
        setIsOpenModalShareMail(false);
    };

    // xử lý khi click đóng modal
    const handleCancelModal = () => {
        setIsOpenModal(false);
    };

    // xử lý khi click đóng modal share mail
    const handleCancelModalShareMail = () => setIsOpenModalShareMail(false);

    const handleCaculator = () => {
        const target = dataDetail?.target || 0;
        const total = dataDetail?.totalMoney || 0;
        if (target && total) {
            const result = (total / target) * 100;
            if (result >= 100) {
                return 100;
            }
            return result;
        }
        return 0;
    };

    const handleDonate = (data) => {
        const newDataRequest = {
            ...dataRequestDonate,
            amount: data?.paymentMethod === 'VNPay' ? data?.amount * exchangeRateMoney : data?.amount,
            description: `Donate in ${programId}`,
            paymentMethod: data?.paymentMethod,
            programId: programId,
            userId: userData?.userId,
        };
        setDataRequestDonate(newDataRequest);
        return donateProgram(newDataRequest);
    };
    return (
        <div id="campaignDetail" ref={ref}>
            <Loading isLoading={isPending || isPendingDonate} />
            <h1 className="mb-12 text-4xl font-bold leading-10 ">{dataDetail?.programName}</h1>
            {/* <div></div> */}
            <div className="flex flex-wrap">
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
                    <div className="flex flex-wrap order-1 col-start-1 -mx-4">
                        <div className="w-full px-4 ">
                            <div className="relative px-4 my-auto z-[1] ">
                                <img
                                    src={
                                        dataDetail && dataDetail?.attachment?.length > 0
                                            ? dataDetail?.attachment[0]?.url
                                            : CardImg
                                    }
                                    alt={dataDetail?.programName}
                                    className="w-full max-h-96 rounded-2xl"
                                />
                            </div>
                            <div className="card">
                                <div className="card_container ">
                                    <div className="flex -mx-4 flex-nowrap ">
                                        <div className="pr-1 max-w-[50%] basis-1/2 w-full pl-4 relative ">
                                            <div className="card_header">
                                                <i className="text-base fa-sharp fa-thin fa-bullseye-arrow"></i>
                                                <p className="ml-2 text-xs">{dataDetail?.target || 0} $</p>
                                            </div>
                                        </div>
                                        <div className="pl-1 max-w-[50%] basis-1/2 w-full pr-4 relative ">
                                            <div className="flex justify-end w-full text-xs text-gray-100 md:text-base">
                                                <i className="text-base fa-light fa-user-group"></i>
                                                <p className="ml-2 text-xs line-clamp-1 text-ellipsis whitespace-nowrap">
                                                    {dataDetail?.volunteers || 0} supporteds
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <Progress percent={handleCaculator()} showInfo={false} />
                                    </div>
                                    <div className="flex justify-between mx-auto mt-2">
                                        <div className="text_1">{dataDetail?.totalMoney || 0} $</div>
                                        <div className="text_2">{handleCaculator()} %</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-3 h-[500px] z-50 col-start-2 mt-6 md:order-1 md:mt-0 md:sticky md:top-20 lg:block">
                        <div className="h-full px-4 py-6 bg-white rounded-2xl">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="List Donate" key="1">
                                    {dataDetail &&
                                        dataDetail?.donations?.length > 0 &&
                                        dataDetail?.donations?.map((item) => (
                                            <div className="flex items-center px-4" key={item?.donationId}>
                                                <div className="mx-2 ">
                                                    <img
                                                        className="w-12 rounded-full"
                                                        src={item?.user?.avatarUrl?.url}
                                                        alt={item?.user?.avatarUrl?.url}
                                                    />
                                                </div>
                                                <div className="w-full mx-2 text-left">
                                                    <div className="text-lg font-semibold leading-6 text-gray-100">
                                                        {item?.user?.displayName}
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="text-xs leading-6 text-gray-100 ">
                                                            {item?.createdAt
                                                                ? moment(item?.createdAt)?.format('YYYY-MM-DD')
                                                                : ''}
                                                        </p>
                                                        <span className="text-base font-semibold leading-6 text-blue-100">
                                                            $ {item?.amount}
                                                        </span>
                                                    </div>
                                                    <div className="bg-slate-400 h-[.5px]"></div>
                                                </div>
                                            </div>
                                        ))}
                                </TabPane>
                                <TabPane tab="Comments" className="" key="2">
                                    <div className="h-[25rem] flex flex-col justify-between">
                                        <div className="flex-grow p-3 mb-3 overflow-auto text-left comment-box">
                                            <div className="mb-5 comment-item">
                                                <div className="flex user-info">
                                                    <img src={dfAvatar} alt="" className="mr-3 rounded-full w-7 h-7" />
                                                    <p className="font-bold">User name</p>
                                                </div>
                                                <div className="pl-10">
                                                    <div className="p-3 break-all border shadow-inner comment rounded-xl">
                                                        .
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-5 comment-item">
                                                <div className="flex user-info">
                                                    <img src={dfAvatar} alt="" className="mr-3 rounded-full w-7 h-7" />
                                                    <p className="font-bold">User name</p>
                                                </div>
                                                <div className="pl-10">
                                                    <div className="p-3 break-all border shadow-inner comment rounded-xl">
                                                        đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây
                                                        là văn bản đây là văn bản đây là văn bản đây là văn bản
                                                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-5 comment-item">
                                                <div className="flex user-info">
                                                    <img src={dfAvatar} alt="" className="mr-3 rounded-full w-7 h-7" />
                                                    <p className="font-bold">User name</p>
                                                </div>
                                                <div className="pl-10">
                                                    <div className="p-3 break-all border shadow-inner comment rounded-xl">
                                                        đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây
                                                        là văn bản đây là văn bản đây là văn bản đây là văn bản
                                                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-5 comment-item">
                                                <div className="flex user-info">
                                                    <img src={dfAvatar} alt="" className="mr-3 rounded-full w-7 h-7" />
                                                    <p className="font-bold">User name</p>
                                                </div>
                                                <div className="pl-10">
                                                    <div className="p-3 break-all border shadow-inner comment rounded-xl">
                                                        đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây
                                                        là văn bản đây là văn bản đây là văn bản đây là văn bản
                                                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-5 comment-item">
                                                <div className="flex user-info">
                                                    <img src={dfAvatar} alt="" className="mr-3 rounded-full w-7 h-7" />
                                                    <p className="font-bold">User name</p>
                                                </div>
                                                <div className="pl-10">
                                                    <div className="p-3 break-all border shadow-inner comment rounded-xl">
                                                        đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây
                                                        là văn bản đây là văn bản đây là văn bản đây là văn bản
                                                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full bg-white ">
                                            <div>
                                                <TextArea
                                                    placeholder="Add your comment..."
                                                    className="p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-full"
                                                ></TextArea>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <div className="order-2 col-start-1 mt-10">
                        <div className="p-5 text-left bg-white rounded-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold leading-8 ">Overview</h2>
                                <div className="hidden md:block">
                                    <button className="btn_share">
                                        <i className=" fa-light fa-bell-on"></i> 1.2k
                                    </button>
                                    <button className="btn_share">
                                        <i className=" fa-light fa-comment"></i> 234
                                    </button>
                                    <button onClick={showModalShareMail} className="btn_share">
                                        <i className=" fa-light fa-share"></i> 567
                                    </button>
                                </div>
                            </div>
                            <p className="mb-6 text-sm font-semibold leading-6">
                                Shared meals will provide emergency food assistance to families in Palestine.
                            </p>
                            {/* <p className="text-sm leading-6 text-gray-100">{dataDetail?.description || ''}</p> */}
                            <div>
                                <p className="text-sm leading-6 text-gray-100"></p>

                                <div className="content">
                                    <p className="text-sm leading-6 text-gray-100">
                                        {hiddenText}
                                        <span className={`long-text ${isExpanded ? 'expanded' : ''}`}>{longText}</span>
                                    </p>
                                </div>
                                <button
                                    className="flex justify-start w-full text-blue-500 moreless-button hover:text-blue-700"
                                    onClick={() => setIsExpanded((prev) => !prev)}
                                >
                                    Read more
                                </button>

                                {/* <button
                                    className="inline-block py-3 mt-2 "
                                    onClick={() => setReadMore((prev) => !prev)}
                                >
                                    Read more
                                </button> */}
                            </div>
                            <button disabled={status === 'done' ? true : false} onClick={showModal} className="btn">
                                Donate now
                            </button>
                            <div className="flex mt-4 md:hidden">
                                <button className="btn_share">
                                    <i className=" fa-light fa-bell-on"></i> 1.2k
                                </button>
                                <button className="btn_share">
                                    <i className=" fa-light fa-comment"></i> 234
                                </button>
                                <button onClick={showModalShareMail} className="btn_share">
                                    <i className=" fa-light fa-share"></i> 567
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative order-4 pt-10">
                        <ImageGallery
                            showPlayButton={false}
                            showFullscreenButton={false}
                            showNav={false}
                            showBullets={false}
                            items={listImage}
                        />
                    </div>
                    <div className="order-5 col-start-1 mt-12 text-center">
                        <img src={Img} alt="" className="w-24 mx-auto mb-3" />
                        <h3 className="mb-3 text-3xl font-bold leading-8 md:text-4xl md:leading-9">How can we help?</h3>
                        <p className="md:text-base">
                            <Link to="#" className="text-sm text-blue-100 md:text-base">
                                Contact us
                            </Link>{' '}
                            with any payment-related questions.
                        </p>
                    </div>
                </div>
            </div>

            <div className={userData ? '' : 'hidden'}>
                <button
                    onClick={() => handleChangeStateOpenChatBox()}
                    className={
                        isOpenChatBox === true
                            ? 'hidden'
                            : 'z-[999] fixed right-4 bottom-12 rounded-full w-10 h-10 bg-sky-400 items-center  flex justify-center'
                    }
                >
                    <span className="absolute z-10 inline-flex w-8 h-8 rounded-full opacity-75 animate-ping bg-sky-400"></span>
                    <i className="z-20 text-white fa-brands fa-facebook-messenger"></i>
                </button>
            </div>

            {/* Open modal */}
            {isOpenModal && (
                <ModalDonate
                    open={isOpenModal}
                    handleOk={handleSubmitModal}
                    handleCancel={handleCancelModal}
                    onDonate={handleDonate}
                />
            )}

            {/* open modal share mail */}

            {isOpenModalShareMail && (
                <ShareMailModal
                    openModal={isOpenModalShareMail}
                    onSubmitModal={handleSubmitModalShareMail}
                    onCancelModal={handleCancelModalShareMail}
                />
            )}

            {isOpenChatBox && (
                <div className="z-[999] fixed right-4 bottom-2 shadow-2xl rounded-2xl">
                    <ChatBoxCustom closeChatBox={() => handleChangeStateOpenChatBox()} />
                </div>
            )}
        </div>
    );
}
