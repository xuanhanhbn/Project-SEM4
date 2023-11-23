import React from 'react';
import ImageBanner from '../../../assets/images/banner/bn-1.png';
import { IconBanner_1, Icon_Banner_N2 } from '~/assets/images/logo';

export default function HomeBanner() {
    return (
        <div className="flex flex-col w-full md:flex-row-reverse md:min-h-[640px]">
            <div className="w-full md:w-2/4 lg:w-11/12 bg_banner min-h-[400px]  "></div>
            <div className="flex flex-col items-center md:w-2/4">
                <div className="flex items-center w-full px-4 text-center lg:w-auto ">
                    <h1 className="mb-2 mt-6 frelative font-semibold w-full leading-10 text-[2rem] text-dark-200">
                        Fight hunger with the ShareTheMeal app
                    </h1>
                </div>
                <div className="text-center font-normal leading-7 mb-6 text-[1rem] text-gray-100">
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
