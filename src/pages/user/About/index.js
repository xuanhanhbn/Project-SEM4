import React, { useEffect } from 'react';
import './AboutPage.css';
import Card_img_1 from '~/assets/images/campaigns/Cover_Photo_November_12 .jpg';
import Card_img_2 from '~/assets/images/campaigns/DPRK_20120620_WFP-Rein_Skullerud_D3S2561.jpg';
import Logo1 from '~/assets/images/logo/WFP_STM_Values_Illustrations_Open.png';
import Logo2 from '~/assets/images/logo/WFP_STM_Values_Illustrations_Counts.png';
import Logo3 from '~/assets/images/logo/WFP_STM_Values_Illustrations_Together.png';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

function About() {
    // cuộn về đầu trang khi chuyển tab
    const scrollToTop = () => {
        scroll.scrollToTop();
    };
    return (
        <div id="aboutPage">
            <div className="aboutPage_container">
                <div className="max-w-4xl mx-auto ">
                    <h1 className="page_title">Our Purpose</h1>
                    <h4 className="page_sub_title">Empowering people to end global hunger</h4>
                    <p className="page_description">
                        We’re here to end global hunger. And we’re guessing you are too. That’s why we were founded in
                        2015 under the United Nations World Food Programme — to make fighting hunger accessible to
                        everyone. Because with just €0.70 and a few taps on your phone, you can share your meal with
                        someone in need.
                    </p>
                </div>
                <div className="mb-6 mx-auto  z-[1] px-4 md:px-12 relative">
                    <img alt="" src={Card_img_1} className=" mx-auto rounded-2xl md:h-96 lg:h-[32.9375rem]" />
                </div>
                <div className="box_campaign">
                    <div className="max-w-4xl mx-auto">
                        <h4 className="box_campaign_title">There’s one thing we’ll never stop believing in</h4>
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
                    <h2 className="page_title">Our Values</h2>
                    <h4 className="page_sub_title">A few important things we live by</h4>
                    <div className="flex flex-wrap -mx-4">
                        <div className="our_container">
                            <div className="our_wrapper ">
                                <div className="ourValue-box">
                                    <img alt="" src={Logo1} className="block w-16 h-16 mr-5 md:mb-5 lg:mb-0" />
                                    <span className="grow ">Open and honest</span>
                                </div>
                                <p className="text-left">
                                    We want you to know how your donation is used and the impact you’re having around
                                    the world.
                                </p>
                            </div>
                        </div>
                        <div className="our_container">
                            <div className="our_wrapper ">
                                <div className="ourValue-box">
                                    <img alt="" src={Logo2} className="block w-16 h-16 mr-5 md:mb-5 lg:mb-0" />
                                    <span className="grow ">Every shared meal counts</span>
                                </div>
                                <p className="text-left">
                                    Give what you can — whether it’s one meal or one year of meals — and know that it
                                    makes a difference.
                                </p>
                            </div>
                        </div>
                        <div className="our_container">
                            <div className="our_wrapper ">
                                <div className="ourValue-box">
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
                <div className="page_ft">
                    <h2 className="page_title">Our Opportunities</h2>
                    <h4 className="page_sub_title">Make changing the world your day job</h4>
                    <div className="page_ft_container">
                        <div className="flex flex-wrap mx-0 lg:flex-nowrap">
                            <div className="page_ft_img">
                                <img alt="" src={Card_img_2} className="img_ft" />
                            </div>
                            <div className="page_ftbd">
                                <h3 className="mb-0 text-base font-semibold leading-7 md:text-xl lg:mb-2">
                                    Work with us
                                </h3>
                                <p className="mb-6 text-sm leading-6 md:text-base lg:mb-8">
                                    Does this sound like your dream job? For us it is. Join our team and bring your
                                    passion to work every day.
                                </p>
                                <Link onClick={scrollToTop} to="/volunteers" className="btn">
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
