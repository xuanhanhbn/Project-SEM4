import React from 'react';

import Palestin_1 from '~/assets/images/campaigns/Palestine-1.png';
import Congo_1 from '~/assets/images/campaigns/WFP_STM_GN__updated_image_gallery_3.png';
import Afga_1 from '~/assets/images/campaigns/afghanistan-2.png';
import { Link } from 'react-router-dom';
import './HomeListCampaigns.css';

export default function HomeListCampaigns() {
    return (
        <div id="listCampaigns">
            <div className="container_wrapper ">
                <div className="wrapper">
                    <Link to="#" className="card">
                        <h1 className="card_title">Give emergency aid in Palestine</h1>
                        {/* <div to="#" className="card_btn ">
                            Read more
                        </div> */}
                        <div className="relative ">
                            <img className="card_image" alt="Palestine" src={Palestin_1} />
                        </div>

                        <div className="my-4">
                            <div className="flex flex-row">
                                <div className="col">
                                    <i className="text-xl fa-sharp fa-thin fa-bullseye-arrow"></i>
                                    <p className="ml-2 text-xs">1000000 $</p>
                                </div>
                                <div className="col_3">
                                    <i className="text-xl fa-light fa-user-group"></i>
                                    <p className="ml-2 text-sm">100000</p>
                                </div>
                            </div>
                            <div className="h-[4px] bg-gray-400 mx-auto mt-2 rounded-sm">
                                <div className="h-[4px] bg-blue-100 w-10/12	 mt-4 rounded-sm"></div>
                            </div>
                            <div className="flex justify-between mx-auto mt-2">
                                <div className="text_1">1000$</div>
                                <div className="text_2">85%</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="#" className="hidden card md:block ">
                        <h1 className="card_title">Help in the Democratic Republic of Congo</h1>
                        {/* <div to="#" className="card_btn">
                            Read more
                        </div> */}
                        <div className="relative ">
                            <img className="card_image" alt="Colors" src={Congo_1} />
                        </div>

                        <div className="my-4">
                            <div className="flex flex-row">
                                <div className="col">
                                    <i className="text-xl fa-sharp fa-thin fa-bullseye-arrow"></i>
                                    <p className="ml-2 text-sm">1000000 $</p>
                                </div>
                                <div className="col_3">
                                    <i className="text-xl fa-light fa-user-group"></i>
                                    <p className="ml-2 text-sm">100000</p>
                                </div>
                            </div>
                            <div className="h-[4px] bg-gray-400 mx-auto mt-2 rounded-sm">
                                <div className="h-[4px] bg-blue-100 w-10/12	 mt-4 rounded-sm"></div>
                            </div>
                            <div className="flex justify-between mx-auto mt-2">
                                <div className="text_1">1000$</div>
                                <div className="text_2">85%</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="#" className="hidden card lg:block ">
                        <h1 className="card_title">
                            Donate emergency support in AfghanistanDonate emergency support in AfghanistanDonate
                            emergency support in AfghanistanDonate emergency support in AfghanistanDonate emergency
                            support in AfghanistanDonate emergency support in Afghanistan
                        </h1>
                        {/* <div to="#" className="card_btn ">
                            Read more
                        </div> */}
                        <div className="relative ">
                            <img className="card_image" src={Afga_1} alt="Colors" />
                        </div>

                        <div className="my-4">
                            <div className="flex flex-row">
                                <div className="col">
                                    <i className="text-xl fa-sharp fa-thin fa-bullseye-arrow"></i>
                                    <p className="ml-2 text-xs">1000000 $</p>
                                </div>
                                <div className="col_3">
                                    <i className="text-xl fa-light fa-user-group"></i>
                                    <p className="ml-2 text-xs">100000</p>
                                </div>
                            </div>
                            <div className="h-[4px] bg-gray-400 mx-auto mt-2 rounded-sm">
                                <div className="h-[4px] bg-blue-100 w-10/12	 mt-4 rounded-sm"></div>
                            </div>
                            <div className="flex justify-between mx-auto mt-2">
                                <div className="text_1">1000$</div>
                                <div className="text_2">85%</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
