import React from 'react';
import logo from '~/assets/images/logo/black-logo.png';
import logoPartner from '~/assets/images/logo/tải xuống.png';

function PartnerDetailPage() {
    return (
        <div className="p-10 bg-white">
            <div className="text-[8rem] relative font-black text-[#a0aec033] ">
                PARTNERS
                <div className="absolute flex items-center text-5xl font-extrabold text-black left-20 top-16 ">
                    <img alt="" src={logo} className="w-16 mr-2" />
                    <span className="mr-4">Partner of </span>
                    <span className="font-serif italic font-medium"> Give-AID</span>
                </div>
            </div>
            {/* <div className="p-20">
                <div className="flex p-6 bg-gray-400">
                    <div className="w-32 h-32 p-4">
                        <img alt="" src={logoPartner} className="w-full h-full" />
                    </div>
                    <div className="w-2 mr-8 h-28 "></div>
                    <div>
                        <div className="text-3xl font-bold">Facebook</div>
                        <div>meta@facebook.com</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default PartnerDetailPage;
