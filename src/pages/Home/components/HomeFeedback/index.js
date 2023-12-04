import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import UserFb_1 from '../../../../assets/images/avatar/mark_ruffalo.png';
import UserFb_2 from '../../../../assets/images/avatar/George_Strombo.png';
import UserFb_3 from '../../../../assets/images/avatar/karoline-herfurth.jpg';
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
                                        Really lg:text-xl" mb-1 text-sm md:h-[3rem] font-semibold leading-5 min-h-[5rem]
                                        md:min-h-full md:line-clamp-2 line-clamp-4 text-ellipsis lg:leading-8 lg:text-xl
                                        mb-1 text-sm md:h-[3rem] font-semibold leading-5 min-h-[5rem] md:min-h-full
                                        md:line-clamp-2 line-clamp-4 text-ellipsis lg:leading-8 lg:text-xl mb-1 text-sm
                                        md:h-[3rem] font-semibold leading-5 min-h-[5rem] md:min-h-full md:line-clamp-2
                                        line-clamp-4 text-ellipsis lg:leading-8 lg:text-xl mb-1 text-sm md:h-[3rem]
                                        font-semibold leading-5 min-h-[5rem] md:min-h-full md:line-clamp-2 line-clamp-4
                                        text-ellipsis lg:leading-8 lg:text-xl mb-1 text-sm md:h-[3rem] font-semibold
                                        leading-5 min-h-[5rem] md:min-h-full md:line-clamp-2 line-clamp-4 text-ellipsis
                                        lg:leading-8 lg:text-xl
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
                                        Really lg:text-xl" mb-1 text-sm md:h-[3rem] font-semibold leading-5 min-h-[5rem]
                                        md:min-h-full md:line-clamp-2 line-clamp-4 text-ellipsis lg:leading-8 lg:text-xl
                                        mb-1 text-sm md:h-[3rem] font-semibold leading-5 min-h-[5rem] md:min-h-full
                                        md:line-clamp-2 line-clamp-4 text-ellipsis lg:leading-8 lg:text-xl mb-1 text-sm
                                        md:h-[3rem] font-semibold leading-5 min-h-[5rem] md:min-h-full md:line-clamp-2
                                        line-clamp-4 text-ellipsis lg:leading-8 lg:text-xl mb-1 text-sm md:h-[3rem]
                                        font-semibold leading-5 min-h-[5rem] md:min-h-full md:line-clamp-2 line-clamp-4
                                        text-ellipsis lg:leading-8 lg:text-xl mb-1 text-sm md:h-[3rem] font-semibold
                                        leading-5 min-h-[5rem] md:min-h-full md:line-clamp-2 line-clamp-4 text-ellipsis
                                        lg:leading-8 lg:text-xl
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
                                <img src={UserFb_3} alt="" className="card_img" />
                            </div>
                            <div className="w-full lg:w-2/4">
                                <div>
                                    <p className="fb_content">
                                        Really lg:text-xl" mb-1 text-sm md:h-[3rem] font-semibold leading-5 min-h-[5rem]
                                        md:min-h-full md:line-clamp-2 line-clamp-4 text-ellipsis lg:leading-8 lg:text-xl
                                        mb-1 text-sm md:h-[3rem] font-semibold leading-5 min-h-[5rem] md:min-h-full
                                        md:line-clamp-2 line-clamp-4 text-ellipsis lg:leading-8 lg:text-xl mb-1 text-sm
                                        md:h-[3rem] font-semibold leading-5 min-h-[5rem] md:min-h-full md:line-clamp-2
                                        line-clamp-4 text-ellipsis lg:leading-8 lg:text-xl mb-1 text-sm md:h-[3rem]
                                        font-semibold leading-5 min-h-[5rem] md:min-h-full md:line-clamp-2 line-clamp-4
                                        text-ellipsis lg:leading-8 lg:text-xl mb-1 text-sm md:h-[3rem] font-semibold
                                        leading-5 min-h-[5rem] md:min-h-full md:line-clamp-2 line-clamp-4 text-ellipsis
                                        lg:leading-8 lg:text-xl
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
            </Carousel>
        </div>
    );
}
