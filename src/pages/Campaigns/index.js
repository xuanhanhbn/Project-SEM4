import CardCustom from '~/components/Cards';
import Card_img_1 from '../../assets/images/campaigns/Cover_Photo_November_12 .jpg';
import { CampaignsData } from './CampaignsData';
import './Campaigns.css';

function Campaigns() {
    return (
        <div id="campaigns" className="px-4 py-12 bg-gray-400 md:py-24">
            <div>
                <h1 className="mb-2 text-4xl md:leading-[3.75rem] md:text-5xl font-bold leading-10 text-center">
                    Choose where to donate
                </h1>
                <h4 className="text-base font-semibold leading-6 text-center text-gray-100 md:text-3xl md:mb-14 md:leading-7 mb-9 ">
                    The UN World Food Program delivers the meals
                </h4>
            </div>
            <div className="container_wrapper ">
                <div className="flex-wrap wrapper">
                    {CampaignsData.map((data) => {
                        if (data.field === 'true') {
                            return (
                                <div
                                    key={data.cardTitle}
                                    className="max-w-sm flex flex-col p-6 min-h-[457.27px]   border shadow-lg -500 bg-[#e0eff7]"
                                >
                                    <h1 className="h-10 mb-6 text-2xl font-bold text-gray-800 cursor-pointer line-clamp-2 text-ellipsis">
                                        {data.cardTitle}
                                    </h1>
                                    <div className="relative flex-1 p-6 ">
                                        <img
                                            src={Card_img_1}
                                            alt=""
                                            className="absolute h-full rounded-2xl translate-x-[-50%]  top-0 left-1/2"
                                        />
                                        <div className="relative -bottom-48">
                                            <h2 className="text-white z-[1] relative mb-4 leading-6 font-bold text-[1.625rem] ">
                                                Feed families who need it the most
                                            </h2>
                                            <button className="relative border-white text-sm font-semibold rounded-lg p-[.75rem_1rem_.8125rem] bg-white">
                                                Read more
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <CardCustom
                                    key={data.cardTitle}
                                    to={data.to}
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
