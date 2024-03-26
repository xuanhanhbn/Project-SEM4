import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import UserFb_1 from '~/assets/images/avatar/mark_ruffalo.png';
import UserFb_2 from '~/assets/images/avatar/George_Strombo.png';
import UserFb_3 from '~/assets/images/avatar/Martin_Schultz.avif';
import './Homefeedback.css';

export default function Homefeedback() {
    return (
        <div id="homeFb">
            <Carousel
                additionalTransfrom={0}
                arrows={false}
                // autoPlay
                // autoPlaySpeed={4000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024,
                        },
                        items: 1,
                        partialVisibilityGutter: 40,
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0,
                        },
                        items: 1,
                        partialVisibilityGutter: 30,
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464,
                        },
                        items: 1,
                        partialVisibilityGutter: 30,
                    },
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                <div className="card">
                    <div className="card_content">
                        <div className="absolute right-2 left-4 bottom-8">
                            <div className="mb-6">
                                <img src={UserFb_1} alt="" className="card_img" />
                            </div>
                            <div className="w-full lg:w-2/4">
                                <div>
                                    <p className="fb_content">
                                        Give-AID provides a seamless and user-friendly experience for both volunteers
                                        and those seeking assistance. The platform's intuitive interface makes it easy
                                        to navigate and explore various volunteer opportunities or charity campaigns.
                                        Whether you're a seasoned philanthropist or new to volunteering, Give-AID
                                        welcomes all with open arms, ensuring everyone can contribute to making a
                                        positive impact in their community
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold leading-6 text-gray-100">
                                        Mark Ruffalo - Actor
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card_content">
                        <div className="absolute right-2 left-4 bottom-8">
                            <div className="mb-6">
                                <img src={UserFb_2} alt="" className="card_img" />
                            </div>
                            <div className="w-full lg:w-2/4">
                                <div>
                                    <p className="fb_content">
                                        One of the standout features of Give-AID is its strong community-centric
                                        approach. Through this platform, individuals not only find help or volunteer
                                        opportunities but also become part of a supportive and caring community. It
                                        fosters connections, encourages collaboration, and empowers individuals to make
                                        meaningful changes together. Give-AID isn't just about providing aid; it's about
                                        building lasting relationships and spreading kindness and compassion.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold leading-6 text-gray-100">
                                        Martin Schulz - Ancien président du Parlement européen
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card_content">
                        <div className="absolute right-2 left-4 bottom-8">
                            <div className="mb-6">
                                <img src={UserFb_3} alt="" className="card_img" />
                            </div>
                            <div className="w-full lg:w-2/4">
                                <div>
                                    <p className="fb_content">
                                        Give-AID empowers individuals to be agents of change in their communities. By
                                        offering a diverse range of volunteer opportunities and tools to create charity
                                        campaigns, Give-AID enables users to address various social issues effectively.
                                        Whether it's organizing local initiatives, participating in nationwide
                                        campaigns, or supporting global causes, users have the resources and support
                                        they need to make a difference. With Give-AID, anyone can contribute their time,
                                        skills, or resources to create a brighter and more inclusive world for all.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold leading-6 text-gray-100">
                                        George Stroumboulopoulos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}
