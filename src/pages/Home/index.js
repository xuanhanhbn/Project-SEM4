import React from 'react';
import './Home.css';
import HomeBanner from '../components/HomeBanner';

function Home() {
    return (
        <div id="homePage" className="mx-auto overflow-hidden bg-white">
            <div>
                <HomeBanner />
            </div>
        </div>
    );
}

export default Home;
