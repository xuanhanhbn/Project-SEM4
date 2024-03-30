import React from 'react';
import './HomeSlide.css';
import { Link } from 'react-router-dom';
import Palestin_1 from '~/assets/images/campaigns/Palestine-1.png';
import { Progress } from 'antd';
import { handleReturnLogoImage } from '~/utils/common';
import ImageWithBanner from '~/components/ImageWithBanner';

export default function HomeSlide(props) {
    const { dataProgram } = props;

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
                                    {/* <ImageWithBanner
                                        imageUrl={handleReturnLogoImage(item?.attachment) || Palestin_1}
                                        bannerText="Chỗ này là trạng thái"
                                    /> */}
                                    <img
                                        className="card_image"
                                        alt={item?.programName}
                                        src={handleReturnLogoImage(item?.attachment) || Palestin_1}
                                    />
                                </div>

                                <div className="my-4">
                                    <div className="flex flex-row">
                                        <div className="col">
                                            <i className="text-xl fa-sharp fa-thin fa-bullseye-arrow"></i>
                                            <p className="ml-2 text-xs">
                                                {item?.target ? item?.target.toLocaleString() : 0} $
                                            </p>
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
