import CardCustom from '~/components/Cards';
import Card_img_1 from '~/assets/images/campaigns/Cover_Photo_November_12 .jpg';
import { CampaignsData } from './constants';
import './Campaigns.css';

function Campaigns() {
    return (
        <div id="campaigns">
            <div>
                <h1 className="campaign_title">Choose where to donate</h1>
                <h4 className="campaign_content ">The UN World Food Program delivers the meals</h4>
            </div>
            <div className="container_wrapper ">
                <div className="flex-wrap wrapper">
                    {CampaignsData.map((data) => {
                        if (data.field === 'true') {
                            return (
                                <div key={data.cardTitle} className="tag_campaign">
                                    <h1 className="tag_title">{data.cardTitle}</h1>
                                    <div className="relative flex-1 p-6 ">
                                        <img
                                            src={Card_img_1}
                                            alt=""
                                            className="absolute h-full rounded-2xl translate-x-[-50%] top-0 left-1/2"
                                        />
                                        <div className="relative -bottom-40 md:-bottom-64">
                                            <h2 className="text-white z-[1] relative mb-4 leading-6 font-bold text-[1.625rem]">
                                                Feed families who need it the most
                                            </h2>
                                            <button className="btn_read">Read more</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <CardCustom
                                    key={data.cardTitle}
                                    to="/campaign-detail"
                                    cardImage={Card_img_1}
                                    target={data.target}
                                    supporteds={data.supporteds}
                                    progressValue={data.progressValue}
                                    progressPercentage={data.progressPercentage}
                                    cardTitle={data.cardTitle}
                                    status={data.status}
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
