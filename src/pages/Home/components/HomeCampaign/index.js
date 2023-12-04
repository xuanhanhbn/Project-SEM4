import React from 'react';
import './HomeCampaign.css';
import Palestine11 from '../../../../assets/images/campaigns/palestine11_Homecard.png';

export default function HomeCampaign() {
    return (
        <div id="homeCampaign" className="pt-8 px-9 pb-9">
            <h2 className="title_h2">Take action</h2>
            <h4 className="content_h4">
                Simply browse through our fundraising goals and donate to the causes that matter to you.
            </h4>
            <div className="tag_donate">
                <div className="relative md:w-3/5">
                    <img
                        src={Palestine11}
                        alt=""
                        className="rounded-t-2xl md:h-full md:rounded-l-2xl md:rounded-tr-none"
                    />
                    <button className="sm_donate_btn">Donate now</button>
                    <div className="md_urgent">Urgent</div>
                </div>
                <div className="flex-1">
                    <div className="h-full px-6 pt-12 pb-6 lg:flex-col lg:flex lg:justify-center">
                        <h3 className="mb-0 text-2xl font-bold leading-[1.5] md:mb-4">
                            <span className="text-2xl font-bold leading-6 text-orange-500 md:hidden">Urgent </span>
                            Give emergency aid in Palestine
                        </h3>
                        <p className="hidden text-base text-gray-100 lg:block">
                            Shared meals will provide emergency food assistance to families in Palestine.
                        </p>
                        <div className="hidden mt-4 lg:mt-14 md:block">
                            <button className="border-black lg_btn hover:bg-gray-700">read more</button>
                            <button className="ml-2 bg-orange-200 border-orange-200 lg_btn hover:bg-orange-100 hover:border-orange-100">
                                Donate now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
