import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';

import './CampaignDetail.css';
import './style.css';
import CardImg from '~/assets/images/campaigns/drc2_homecard.jpg';
import Img from '~/assets/images/logo/Screenshot .png';
import { Link } from 'react-router-dom';
import ModalDonate from './components/ModalDonate';
import Avatar from '~/assets/images/avatar/avatar.png';

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

export default function CampaignDetail() {
    // state
    const [isOpenModal, setIsOpenModal] = useState(false);

    // xử lý open modal
    const showModal = () => {
        setIsOpenModal(true);
    };

    // xử lý khi click submit modal
    const handleSubmitModal = () => {
        setIsOpenModal(false);
        console.log('click ok btn');
    };

    // xử lý khi click đóng modal
    const handleCancelModal = () => {
        setIsOpenModal(false);
        console.log('click cancel btn');
    };

    return (
        <div id="campaignDetail">
            <div>
                <h1 className="mb-12 text-4xl font-bold leading-10 ">Help in the Democratic Republic of the Congo</h1>
            </div>
            <div className="flex flex-nowrap">
                <div className="lg:w-7/12">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 ">
                            <div className="relative px-4 my-auto z-[1] ">
                                <img src={CardImg} alt="" className="w-full rounded-2xl" />
                            </div>
                            <div className="card">
                                <div className="card_container ">
                                    <div className="flex -mx-4 flex-nowrap ">
                                        <div className="pr-1 max-w-[50%] basis-1/2 w-full pl-4 relative ">
                                            <div className="card_header">
                                                <i className="text-base fa-sharp fa-thin fa-bullseye-arrow"></i>
                                                <p className="ml-2 text-xs">500,000 $</p>
                                            </div>
                                        </div>
                                        <div className="pl-1 max-w-[50%] basis-1/2 w-full pr-4 relative ">
                                            <div className="flex w-full text-xs text-gray-100 md:text-base">
                                                <i className="text-base fa-light fa-user-group"></i>
                                                <p className="ml-2 text-xs line-clamp-1 text-ellipsis whitespace-nowrap">
                                                    500,000 supporteds
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="h-1 mx-auto mt-2 bg-gray-400 rounded-sm">
                                            <div className="w-10/12 h-1 mt-4 bg-blue-100 rounded-sm"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mx-auto mt-2">
                                        <div className="text-sm font-semibold leading-6 text-blue-100">100.000</div>
                                        <div className="text-sm font-semibold leading-6 text-blue-100">15%</div>
                                    </div>
                                    <button onClick={showModal} className="btn">
                                        Donate now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" pt-14">
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
                                    <button className="btn_share">
                                        <i className=" fa-light fa-share"></i> 567
                                    </button>
                                </div>
                            </div>
                            <p className="mb-6 text-sm font-semibold leading-6">
                                Shared meals will provide emergency food assistance to families in Palestine.
                            </p>
                            <p className="text-sm leading-6 text-gray-100">
                                With conflict escalating in October 2023, Palestine is facing an urgent humanitarian
                                crisis. 1.8 million people are now food insecure, many of whom have lost their homes and
                                are seeking safety in shelters. <br />
                                <br />
                                Despite challenging conditions, the World Food Programme (WFP) is on the ground
                                providing life-saving aid to people in Palestine and those in shelters. Regular cash and
                                food programmes are also continuing every day where possible. <br />
                                <br />
                                So far, a total of 522,000 Palestinians have been assisted since the start of this
                                crisis with an aim to ramp up and support 800,000 people in Gaza and the West Bank area.
                                Food support includes bread, canned chickpeas and beans.{' '}
                            </p>
                            <div className="flex mt-4 md:hidden">
                                <button className="btn_share">
                                    <i className=" fa-light fa-bell-on"></i> 1.2k
                                </button>
                                <button className="btn_share">
                                    <i className=" fa-light fa-comment"></i> 234
                                </button>
                                <button className="btn_share">
                                    <i className=" fa-light fa-share"></i> 567
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative pt-10">
                        <ImageGallery
                            showPlayButton={false}
                            showFullscreenButton={false}
                            showNav={false}
                            showBullets={false}
                            items={images}
                        />
                    </div>
                    <div className="mt-12 text-center">
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
                <div className="hidden w-5/12 pr-4 pl-11 lg:block">
                    <div className="sticky py-6 bg-white top-24 rounded-2xl">
                        <div className="mb-5">
                            <h3 className="text-2xl font-bold leading-8 ">List Donate</h3>
                        </div>
                        <div className="flex items-center px-4">
                            <div className="mx-2 ">
                                <img className="w-12 rounded-full" src={Avatar} alt="" />
                            </div>
                            <div className="w-full mx-2 text-left">
                                <div className="text-lg font-semibold leading-6 text-gray-100">Nguyen Van A</div>
                                <div className="flex justify-between">
                                    <p className="text-xs leading-6 text-gray-100 ">20.10.2022</p>
                                    <span className="text-base font-semibold leading-6 text-blue-100">$ 22,000</span>
                                </div>
                                <div className="bg-slate-400 h-[.5px]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Open modal */}
            {isOpenModal && (
                <ModalDonate open={isOpenModal} handleOk={handleSubmitModal} handleCancel={handleCancelModal} />
            )}
        </div>
    );
}
