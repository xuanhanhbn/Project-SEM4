import CardCustom from '~/components/Cards';
import Card_img_1 from '~/assets/images/campaigns/Cover_Photo_November_12 .jpg';
import { CampaignsData } from './constants';
import './Campaigns.css';
import { Link } from 'react-router-dom';
import { getAllPrograms } from './callApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import { useEffect, useState } from 'react';

function Campaigns() {
    const [dataProgram, setDataProgram] = useState([]);
    const mutation = useMutation({
        mutationFn: getAllPrograms,
        onSuccess: (data) => {
            console.log('data: ', data);
            if ((data && data?.status === 200) || data?.status === '200') {
                return setDataProgram(data?.data);
            }
            return notify(data?.message, 'error');
        },
    });

    useEffect(() => {
        mutation.mutate();
    }, []);
    return (
        <div id="campaigns">
            <div>
                <h1 className="campaign_title">Choose where to donate</h1>
                <h4 className="campaign_content ">The UN World Food Program delivers the meals</h4>
            </div>
            <div className="container_wrapper ">
                <div className="flex-wrap wrapper">
                    {dataProgram?.map((data) => {
                        let urlLogo = String;
                        data.attachment.map((e) => {
                            if (e.type === 'Logo') {
                                return (urlLogo = e.url);
                            }
                        });

                        if (data.field === 'true') {
                            return (
                                <div key={data.cardTitle} className="tag_campaign">
                                    <h1 className="tag_title">{data.cardTitle}</h1>
                                    <div className="relative flex-1 p-6 ">
                                        <img
                                            src={urlLogo}
                                            alt=""
                                            className="absolute h-full rounded-2xl translate-x-[-50%] top-0 left-1/2"
                                        />
                                        <div className="relative -bottom-40 md:-bottom-52">
                                            <h2 className="text-white z-[1] relative mb-4 leading-6 font-bold text-[1.625rem]">
                                                {data?.programName}
                                            </h2>
                                            <Link to="/campaign-detail" className="btn_read">
                                                Read more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <CardCustom
                                    key={data.cardTitle}
                                    to="/campaign-detail"
                                    cardImage={urlLogo}
                                    target={data.target}
                                    supporteds={data.supporteds}
                                    progressValue={data.progressValue}
                                    progressPercentage={data.progressPercentage}
                                    cardTitle={data.programName}
                                    id={data?.programId}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default Campaigns;
