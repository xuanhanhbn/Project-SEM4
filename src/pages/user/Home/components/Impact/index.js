import React from 'react';
import './OutImpact.css';
import { Link } from 'react-router-dom';
import MapMobile from '~/assets/images/banner/Impact_Map_Mobile.png';

export default function OutImpact() {
    return (
        <div id="impact" className="px-6 pt-8 ">
            <h2 className="title_h2">Our impact to date</h2>
            <h4 className="content_h4">
                ShareTheMeal donations not only provide life-saving food in emergencies but also facilitate school
                feeding, nutrition support, cash transfers and resilience programmes all over the world.
            </h4>
            {/* <div className="font-bold text-center text-blue-100">
                <i className="ml-2 fa-solid fa-angle-right "></i>
            </div> */}
            <div className="flex my-5">
                <div className="md:w-3/5">
                    <div className="w-full ">
                        <img src={MapMobile} alt="" className="rounded-t-2xl md:rounded-tr-none" />
                    </div>
                    <div className="flex-1 bg-white rounded-b-2xl md:rounded-br-none">
                        <div className="p-4">
                            <div className="flex flex-wrap justify-between w-full mb-4">
                                <div className="">
                                    <p className="text-xl font-bold leading-6">
                                        <span>204,059,496</span> meals
                                    </p>
                                    <p className="text-xs text-gray-100">shared</p>
                                </div>
                                <div className="flex-1 text-right text-blue-600 ">
                                    <p className="text-xl font-bold leading-6"> + 177,253</p>
                                    <p className="text-sm">in the last day</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-between w-full mb-4">
                                <div className="">
                                    <p className="text-xl font-bold leading-6">
                                        <span>1,463,235</span> supporters
                                    </p>
                                    <p className="text-xs text-gray-100">fighting hunger</p>
                                </div>
                                <div className="flex-1 text-right text-blue-600">
                                    <p className="text-xl font-bold leading-6"> + 5,438</p>
                                    <p className="text-sm">in the last day</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between w-full ">
                                <div className="">
                                    <p className="text-xl font-bold leading-6">
                                        <span>119</span> goals
                                    </p>
                                    <p className="text-xs text-gray-100">complated</p>
                                </div>
                                <div className="flex-1 text-right text-blue-600">
                                    <p className="text-xl font-bold leading-6"> + 2</p>
                                    <p className="text-sm">in the last 90 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden w-2/5 p-9 md:block bg-dark-300 rounded-r-xl">
                    <div className="flex flex-col justify-center h-full">
                        <h2 className="mb-4 text-4xl font-bold leading-9 text-white">Our impact to date</h2>
                        <p className="text-white">
                            ShareTheMeal donations not only provide life-saving food in emergencies but also facilitate
                            school feeding, nutrition support, cash transfers and resilience programmes all over the
                            world.
                        </p>
                        <div className="mt-4 font-bold text-center text-blue-800">
                            <Link to="/about" className="hover:decoration-solid">
                                Learn more
                            </Link>
                            <i className="ml-2 fa-solid fa-angle-right "></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
