import React from 'react';
import './HomeBanner.css';

export default function HomeBanner() {
    return (
        <div id="home_banner" className="overflow-hidden">
            <div className=" bg_banner banner">
                <svg
                    width="375"
                    height="94"
                    viewBox="0 0 375 94"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm_svg"
                >
                    <path
                        d="M69.9463 50.9394C24.3076 45.346 6.44895 15.648 0 0V93.5H375V50.9394C364.913 74.5779 321.054 107.704 240.099 80.4043C139.397 46.4447 126.995 57.931 69.9463 50.9394Z"
                        fill="white"
                    ></path>
                </svg>

                <svg
                    width="301"
                    height="720"
                    viewBox="0 0 301 720"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md_svg "
                >
                    <path
                        d="M191.954 235.317C179.197 99.2446 256.764 22.7456 301 0H0V720H12.4386C23.7549 630.69 34.0423 585.533 82.393 524.822C128.626 466.771 207.899 405.408 191.954 235.317Z"
                        fill="white"
                    ></path>
                </svg>
            </div>
            <div className="wrapper_content">
                <div className="home_content ">
                    <h1 className="home_h1 ">Fight hunger with the ShareTheMeal app</h1>
                </div>
                <div className="home_h3">
                    <h3>
                        With just a few taps on your phone you can donate to someone in need and the United Nations
                        World Food Programme will deliver the meals. Help us end hunger by downloading the ShareTheMeal
                        app today.
                    </h3>
                </div>
            </div>
        </div>
    );
}
