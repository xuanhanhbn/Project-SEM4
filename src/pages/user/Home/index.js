/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import './Home.css';
import HomeBanner from './components/HomeBanner';
import HomeCampaign from './components/HomeCampaign';
import HomeSlide from './components/HomeSlide';
import OutImpact from './components/Impact';
import HomeContact from './components/HomeContact';
import HomeConnect from './components/HomeConnect';
import { useMutation } from '@tanstack/react-query';
import { getListProgram } from './callApi';
import { notify } from '~/utils/common';
import Loading from '~/components/Loading';

function Home() {
    const [dataProgram, setDataProgram] = useState([]);

    useEffect(() => {
        getListProgramApi();
    }, []);

    const { mutate: getListProgramApi, isPending } = useMutation({
        mutationFn: getListProgram,
        onSuccess: (data) => {
            if (data && data?.status === 200) {
                return setDataProgram(data.data);
            }
            return notify('error', 'error');
        },
    });

    return (
        <div id="homePage">
            <Loading isLoading={isPending} />
            <div>
                <HomeBanner />
            </div>
            <div className="md:px-10">
                <HomeCampaign dataProgram={dataProgram && dataProgram?.length > 0 ? dataProgram[0] : {}} />
                <HomeSlide dataProgram={dataProgram} />
                <OutImpact />
                <HomeContact />
                <HomeConnect />
            </div>
        </div>
    );
}

export default memo(Home);
