import React from 'react';
import './AboutPage.css';
import Card_img_1 from '../../assets/images/campaigns/Cover_Photo_November_12 .jpg';
import Card_img_2 from '../../assets/images/campaigns/DPRK_20120620_WFP-Rein_Skullerud_D3S2561.jpg';
import Logo1 from '../../assets/images/logo/WFP_STM_Values_Illustrations_Open.png';
import Logo2 from '../../assets/images/logo/WFP_STM_Values_Illustrations_Counts.png';
import Logo3 from '../../assets/images/logo/WFP_STM_Values_Illustrations_Together.png';
import { Link } from 'react-router-dom';

function About() {
    return (
        <div id="aboutPage" className="bg-gray-400">
            <div className="w-full px-6 pt-8 mb-12 text-center">
                <div className="max-w-4xl mx-auto ">
                    <h1 className="mb-2 text-4xl font-bold leading-10 text-center md:leading-[3.75rem] md:text-5xl">
                        Our Purpose
                    </h1>
                    <h4 className="mb-4 font-semibold leading-6 text-center text-gray-100 md:text-xl md:mb-6 md:leading-7 ">
                        Empowering people to end global hunger
                    </h4>
                    <p className="mb-8 text-base leading-8 md:text-lg md:mb-12 md:leading-9">
                        We’re here to end global hunger. And we’re guessing you are too. That’s why we were founded in
                        2015 under the United Nations World Food Programme — to make fighting hunger accessible to
                        everyone. Because with just €0.70 and a few taps on your phone, you can share your meal with
                        someone in need.
                    </p>
                </div>
                <div className="mb-6 mx-auto  z-[1] px-4 md:px-12 relative">
                    <img alt="" src={Card_img_1} className=" mx-auto rounded-2xl md:h-96 lg:h-[32.9375rem]" />
                </div>
                <div className="bg-white border-gray-200 rounded-2xl border-[.0625rem] -mt-32 p-[8rem_3rem_2.5rem]">
                    <div className="max-w-4xl mx-auto">
                        <h4 className="mb-4 text-base font-semibold leading-6 text-center text-gray-100 md:text-xl md:leading-7">
                            There’s one thing we’ll never stop believing in
                        </h4>
                        <h3 className="mt-2 mb-6 text-2xl font-bold leading-8 md:text-4xl md:leading-10">
                            Together, we can be the generation that ends global hunger.
                        </h3>
                        <p className="text-sm leading-6 text-gray-100 md:text-base">
                            There are 828 million hungry people in the world. But hunger is entirely solvable. Every
                            day, people around the world are sharing their meal, and the United Nations World Food
                            Programme is on the frontlines ensuring it reaches those most in need. Imagine the
                            collective impact we could have if we all shared the meal.
                        </p>
                    </div>
                </div>
                <div className="mt-12 mb-8">
                    <h2 className="mb-2 text-4xl font-bold leading-10 text-center md:leading-[3.75rem] md:text-5xl">
                        Our Values
                    </h2>
                    <h4 className="font-semibold leading-6 text-center text-gray-100 mb-9 md:text-xl md:mb-6 md:leading-7">
                        A few important things we live by
                    </h4>
                    <div className="flex flex-wrap -mx-4">
                        <div className="relative w-full max-w-full px-4 basis-full md:basis-4/12 md:w-2/6">
                            <div className="bg-white  border-gray-200 rounded-2xl border-[.0625rem] mb-4 p-8 md:h-full md:mb-0 ">
                                <div className="flex items-center mb-4 text-base font-semibold leading-7 text-left text-black md:items-start md:flex-col lg:items-center lg:flex-row md:mb-8 md:text-xl lg:mb-6">
                                    <img alt="" src={Logo1} className="block w-16 h-16 mr-5 md:mb-5 lg:mb-0" />
                                    <span className="grow ">Open and honest</span>
                                </div>
                                <p className="text-left">
                                    We want you to know how your donation is used and the impact you’re having around
                                    the world.
                                </p>
                            </div>
                        </div>
                        <div className="relative w-full max-w-full px-4 basis-full md:basis-4/12 md:w-2/6">
                            <div className="bg-white  border-gray-200 rounded-2xl border-[.0625rem] mb-4 p-8 md:h-full md:mb-0 ">
                                <div className="flex items-center mb-4 text-base font-semibold leading-7 text-left text-black md:items-start md:flex-col lg:items-center lg:flex-row md:mb-8 md:text-xl lg:mb-6">
                                    <img alt="" src={Logo2} className="block w-16 h-16 mr-5 md:mb-5 lg:mb-0" />
                                    <span className="grow ">Every shared meal counts</span>
                                </div>
                                <p className="text-left">
                                    Give what you can — whether it’s one meal or one year of meals — and know that it
                                    makes a difference.
                                </p>
                            </div>
                        </div>
                        <div className="relative w-full max-w-full px-4 basis-full md:basis-4/12 md:w-2/6">
                            <div className="bg-white  border-gray-200 rounded-2xl border-[.0625rem] mb-4 p-8 md:h-full md:mb-0 ">
                                <div className="flex items-center mb-4 text-base font-semibold leading-7 text-left text-black md:items-start md:flex-col lg:items-center lg:flex-row md:mb-8 md:text-xl lg:mb-6">
                                    <img alt="" src={Logo3} className="block w-16 h-16 mr-5 md:mb-5 lg:mb-0" />
                                    <span className="grow ">We’re in it together</span>
                                </div>
                                <p className="text-left">
                                    We want fighting hunger to be inclusive so that anyone, anywhere, can share the
                                    meal.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pb-12 text-center  mx-auto w-full md:mb-24 md:max-w-[45rem] lg:mt-12 lg:max-w-[60rem]">
                    <h2 className="text-center mb-2 md:leading-[3.75rem] text-[2rem] md:text-5xl font-bold leading-10">
                        Our Opportunities
                    </h2>
                    <h4 className="mb-4 font-semibold leading-6 text-center text-gray-100 md:text-xl md:mb-6 md:leading-7 ">
                        Make changing the world your day job
                    </h4>
                    <div className="mt-48 bg-white border-gray-200 rounded-2xl border-[.0625rem] md:mt-[13.75rem] lg:mt-14">
                        <div className="flex flex-wrap mx-0 lg:flex-nowrap">
                            <div className="relative w-full max-w-full px-4 -mt-40 basis-full md:px-12 lg:mt-0 lg:p-0 lg:basis-6/12">
                                <img
                                    alt=""
                                    src={Card_img_2}
                                    className="block rounded-2xl max-w-full -my-[.0625rem] -ml-[.0625rem] lg:h-[16.0625rem] lg:w-[24.125rem] md:h-96 md:w-[36rem] lg:rounded-[1rem_0_0_1rem]"
                                />
                            </div>
                            <div className="relative flex flex-col justify-center max-w-full px-8 pt-6 pb-12 mx-auto text-center w-ful md:pt-10 lg:py-0">
                                <h3 className="mb-0 text-base font-semibold leading-7 md:text-xl lg:mb-2">
                                    Work with us
                                </h3>
                                <p className="mb-6 text-sm leading-6 md:text-base lg:mb-8">
                                    Does this sound like your dream job? For us it is. Join our team and bring your
                                    passion to work every day.
                                </p>
                                <Link
                                    to="#"
                                    className="mx-auto w-48 p-[.75rem_1rem_.8125rem] bg-orange-100 border-orange-100 rounded-lg text-black text-sm font-semibold hover:bg-orange-200 hover:border-orange-200 "
                                >
                                    Explore opportunities
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
