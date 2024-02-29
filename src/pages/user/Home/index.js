import React, { memo, useEffect } from 'react';
import './Home.css';
import HomeBanner from './components/HomeBanner';
import HomeCampaign from './components/HomeCampaign';
import HomeSlide from './components/HomeSlide';
import OutImpact from './components/Impact';
import HomeContact from './components/HomeContact';
import HomeConnect from './components/HomeConnect';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { testGet } from './callApi';
// import { notify } from '~/utils/common';

function Home() {
    // const mutation = useMutation({
    //     mutationFn: testGet,
    //     onSuccess: (data) => {
    //         console.log('data: ', data);
    //         return notify('Success', 'success');
    //     },
    // });

    // useEffect(() => {
    //     mutation.mutate();
    // }, []);

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
