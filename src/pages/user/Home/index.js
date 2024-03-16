import React, { memo, useEffect } from 'react';
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

function Home() {
    useEffect(() => {
        getListProgramApi();
    }, []);

    const { mutate: getListProgramApi } = useMutation({
        mutationFn: getListProgram,
        onSuccess: (data) => {
            console.log('data: ', data);
            if (data && data?.status === 200) {
            }
            return notify('error', 'error');
        },
    });

    return (
        <div id="homePage">
            <div>
                <HomeBanner />
            </div>
            <div className="md:px-10">
                <HomeCampaign />
                <HomeSlide />
                <OutImpact />
                <HomeContact />
                <HomeConnect />
            </div>
        </div>
    );
}

export default memo(Home);
