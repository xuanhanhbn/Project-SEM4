/* eslint-disable react-hooks/exhaustive-deps */
import CardCustom from '~/components/Cards';
import './Campaigns.css';
import { Link } from 'react-router-dom';
import { getAllPrograms } from './callApi';
import { useMutation } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

function Campaigns() {
    const ref = useRef();
    const [dataProgram, setDataProgram] = useState([]);
    const mutation = useMutation({
        mutationFn: getAllPrograms,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                return setDataProgram(data?.data);
            }
            return notify(data?.message, 'error');
        },
    });

    useEffect(() => {
        mutation.mutate();
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const handleReturnLogo = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            const filterLogo = data.filter((item) => item.type === 'Logo');
            return filterLogo[0]?.url;
        }
        return '';
    };
    return (
        <div id="campaigns" ref={ref}>
            <div>
                <h1 className="campaign_title">Choose where to donate</h1>
                <h4 className="campaign_content ">The UN World Food Program delivers the meals</h4>
            </div>
            <div className="container_wrapper ">
                <div className="flex-wrap wrapper">
                    {dataProgram?.map((data) => {
                        if (data.field) {
                            return (
                                <div key={data.programId} className="tag_campaign">
                                    <h1 className="tag_title">{data.cardTitle}</h1>
                                    <div className="relative flex-1 p-6 ">
                                        <img
                                            src={handleReturnLogo(data?.attachment)}
                                            alt={data?.programName}
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
                                    key={data.programId}
                                    to="/campaign-detail"
                                    cardImage={handleReturnLogo(data?.attachment)}
                                    target={data.target}
                                    supporteds={data.supporteds}
                                    progressValue={data.progressValue}
                                    progressPercentage={data.progressPercentage}
                                    cardTitle={data.programName}
                                    id={data?.programId}
                                    startDonateDate={data?.startDonateDate}
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
