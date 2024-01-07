import React from 'react';
import './Home.css';
import HomeBanner from './components/HomeBanner';
import HomeCampaign from './components/HomeCampaign';
import HomeSlide from './components/HomeSlide';
import OutImpact from './components/Impact';
import HomeContact from './components/HomeContact';
import HomeConnect from './components/HomeConnect';

function Home() {
    return (
        <div id="homePage">
            <div>
                <HomeBanner />
            </div>
            <div>
                <HomeCampaign />
            </div>
            <div>
                <HomeSlide />
            </div>
            <div>
                <OutImpact />
            </div>
            <div>
                <HomeContact />
            </div>
            <HomeConnect />
        </div>
    );
}

export default Home;
