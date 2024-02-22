import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';

import './programDetail.css';
import CardImg from '~/assets/images/campaigns/drc2_homecard.jpg';
import { Link } from 'react-router-dom';
import ModalCreateProgram from '../ModalCreateProgram';

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

export default function ProgramDetail() {
    // state
    const [isOpenModalEditProject, setIsOpenModalEditProject] = useState(false);

    // // xử lý open modal edit program
    const showModalEditProgram = () => {
        setIsOpenModalEditProject(true);
    };

    // // xử lý khi click submit edit program
    const handleSubmitModal = () => {
        setIsOpenModalEditProject(false);
        console.log('click ok btn');
    };

    // xử lý khi click đóng modal
    const handleCancelModal = () => {
        setIsOpenModalEditProject(false);
        console.log('click cancel btn');
    };

    return (
        <div id="programDetail">
            <div className="fixed z-50 right-2 bottom-5">
                <Link to="#" onClick={() => showModalEditProgram()} type="button" className="rounded-full view_btn">
                    Edit
                </Link>
            </div>
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
                            </div>
                        </div>
                    </div>
                    <div className=" pt-14">
                        <div className="p-5 text-left bg-white rounded-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold leading-8 ">Overview</h2>
                            </div>

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
                                Food support includes bread, canned chickpeas and beans.
                            </p>
                        </div>
                    </div>
                    <div className="relative pt-10">
                        <ImageGallery
                            showPlayButton={false}
                            showFullscreenButton={false}
                            showNav={false}
                            showBullets={false}
                            items={images || []}
                        />
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
