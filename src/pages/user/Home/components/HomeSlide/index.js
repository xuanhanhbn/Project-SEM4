import React from 'react';
import './HomeSlide.css';
import { Link, useNavigate } from 'react-router-dom';
import Palestin_1 from '~/assets/images/campaigns/Palestine-1.png';
import { Progress } from 'antd';

export default function HomeSlide(props) {
    const { dataProgram } = props;
    const navigate = useNavigate();

    const handleCaculator = (item) => {
        const target = item?.target || 0;
        const total = item?.totalMoney || 0;
        if (target && total) {
            const result = (total / target) * 100;
            return result;
        }
        return 0;
    };

    const handleReturnDataProgram = () => {
        if (dataProgram && dataProgram?.length > 1) {
            const modifiedArray = dataProgram.slice(1);
            return modifiedArray;
        }
        return [];
    };
    return (
        <div id="homeSlide" className="px-6 ">
            {/* <div className="flex flex-row justify-between mb-2 md:hidden">
                <div className="flex ">
                    <h5 className="font-medium ">Featured goals</h5>
                    <span className="flex justify-center w-6 ml-3 bg-white rounded-full">3</span>
                </div>
                <div>
                    <button className="text-blue-100">See all</button>
                </div>
            </div> */}

            <div id="listCampaigns">
                <div className="container_wrapper ">
                    <div className="wrapper w-[100%]">
                        {handleReturnDataProgram()?.map((item) => (
                            <Link
                                to={`/campaign-detail/${item?.programId}`}
                                // to="#"
                                className="card md:block"
                                key={item?.programId}
                                // onClick={() => navigate('/campaign-detail', { state: { id: item?.programId } })}
                            >
                                <h1 className="card_title">{item?.programName}</h1>
                                <div className="relative ">
                                    <img
                                        className="card_image"
                                        alt={item?.programName}
                                        src={
                                            item && item?.attachment?.length > 0 ? item?.attachment[0]?.url : Palestin_1
                                        }
                                    />
                                </div>

                                <div className="my-4">
                                    <div className="flex flex-row">
                                        <div className="col">
                                            <i className="text-xl fa-sharp fa-thin fa-bullseye-arrow"></i>
                                            <p className="ml-2 text-xs">{item?.target || 0} $</p>
                                        </div>
                                        <div className="col_3">
                                            <i className="text-xl fa-light fa-user-group"></i>
                                            <p className="ml-2 text-sm">{item?.volunteers || 0}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <Progress percent={handleCaculator(item)} showInfo={false} />
                                    </div>
                                    <div className="flex justify-between mx-auto mt-2">
                                        <div className="text_1">{item?.totalMoney || 0} $</div>
                                        <div className="text_2">{handleCaculator(item)} %</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Link to="/campaigns" className="seeall_btn">
                See all
            </Link>
        </div>
    );
}
