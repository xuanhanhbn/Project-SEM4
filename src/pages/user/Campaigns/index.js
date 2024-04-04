/* eslint-disable react-hooks/exhaustive-deps */
import CardCustom from '~/components/Cards';
import './Campaigns.css';
import { Link } from 'react-router-dom';
import { getAllPrograms } from './callApi';
import { useMutation } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import { useEffect, useRef, useState } from 'react';

function Campaigns() {
    const ref = useRef();
    const [dataProgram, setDataProgram] = useState([]);

    const mutation = useMutation({
        mutationFn: getAllPrograms,
        onSuccess: (res) => {
            if (res && res?.status === 200 && res?.data?.length > 0) {
                const filterData = res?.data?.filter((item) => item.status === 'Active' || item.status === 'End');
                return setDataProgram(filterData);
            }
            return notify(res?.message, 'error');
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
                        return (
                            <CardCustom
                                key={data.programId}
                                to="/campaign-detail"
                                cardImage={handleReturnLogo(data?.attachment)}
                                targetProgram={data.target}
                                totalMoneyProgram={data.totalMoney}
                                supporteds={data.countVolunteer}
                                cardTitle={data.programName}
                                id={data?.programId}
                                startDonateDate={data?.startDonateDate}
                                status={data?.status}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Campaigns;
