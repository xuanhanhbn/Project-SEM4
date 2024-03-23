import React from 'react';
import './HomeCampaign.css';
import Palestine11 from '~/assets/images/campaigns/palestine11_Homecard.png';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeCampaign(props) {
    const { dataProgram } = props;

    const renderDescription = () => {
        const limitedDescription = dataProgram?.description?.substring(0, 200);
        return <div dangerouslySetInnerHTML={{ __html: limitedDescription }} />;
    };
    return (
        <div id="homeCampaign" className="pt-8 px-9 pb-9">
            <h2 className="title_h2">Take action</h2>
            <h4 className="content_h4">
                Simply browse through our fundraising goals and donate to the causes that matter to you.
            </h4>
            <div className="tag_donate">
                <div className="relative md:w-3/5">
                    <img
                        src={
                            dataProgram && dataProgram?.attachment?.length > 0
                                ? dataProgram?.attachment[0]?.url
                                : Palestine11
                        }
                        alt={dataProgram?.programName}
                        className="rounded-t-2xl md:h-full md:rounded-l-2xl md:rounded-tr-none"
                    />
                    <button className="sm_donate_btn">Donate now</button>
                    <div className="md_urgent">Urgent</div>
                </div>
                <div className="flex-1">
                    <div className="h-full px-6 pt-12 pb-6 lg:flex-col lg:flex lg:justify-center">
                        <h3 className="mb-0 text-2xl font-bold leading-[1.5] md:mb-4">
                            <span className="text-2xl font-bold leading-6 text-orange-500 md:hidden">Urgent </span>
                            {dataProgram?.programName || ''}
                        </h3>
                        <p className="hidden text-base lg:block">{renderDescription()}</p>
                        <div className="hidden mt-4 lg:mt-14 md:block">
                            <Link
                                to={`/campaign-detail/${dataProgram?.programId}`}
                                className="border-black lg_btn hover:bg-gray-700"
                            >
                                Read more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
