import { Link } from 'react-router-dom';
import { GmLogo, ItLogo, MailLogo, TxLogo, YtLogo } from '~/assets/images/logo';
import './Footer.css';

export default function Footer() {
    return (
        <div id="footer">
            <div className="bg-[#fff] text-[.875rem] pt-[2.25rem] mt-auto">
                <div className="max-w-[1140px] mx-auto px-[1rem] w-full ">
                    <div className="pb-[2rem] mx-0 flex flex-wrap">
                        <div className="px-0 basis-1/2 max-w-[50%]">
                            <div className="text-[#687781]  hover:text-[#031c2d]  pt-[.8125rem] flex  font-semibold bg-[#0000] ">
                                <MailLogo />

                                <Link to="/contact">Contact us</Link>
                            </div>
                        </div>
                    </div>
                    <div className="min-h-[5rem] text-[.75rem] mx-0  border-t-[.0625rem] border-[#d9dddf]  shadow-none border-solid flex flex-wrap">
                        <div className="py-[1rem] items-center flex flex-wrap  basis-0 justify-start px-0 grow max-w-full relative w-full text-[.75rem] text-[#031c2d">
                            <Link
                                to="/faq"
                                className="text-[#687781] hover:text-black my-[.5rem] mr-[2.75rem] text-[.875rem] font-normal text-left leading-[1.5]"
                            >
                                FAQs
                            </Link>
                            <Link
                                to="/terms"
                                className="text-[#687781] hover:text-black my-[.5rem] mr-[2.75rem] text-[.875rem] font-normal text-left leading-[1.5]"
                            >
                                Terms of Use
                            </Link>
                            <Link
                                to="/privacy"
                                className="text-[#687781] hover:text-black my-[.5rem] mr-[2.75rem] text-[.875rem] font-normal text-left leading-[1.5]"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                        <div className="flex justify-end items-center px-0 w-auto  max-w-full relative text-[.75rem] ">
                            <div className="logo-icon">
                                <img
                                    className="w-[1rem]"
                                    src={require('../../../../assets/images/logo/fb.png')}
                                    alt=""
                                />
                            </div>
                            <div className="logo-icon">
                                <TxLogo />
                            </div>
                            <div className="logo-icon">
                                <YtLogo />
                            </div>
                            <div className="logo-icon">
                                <ItLogo />
                            </div>
                            <div className="logo-icon">
                                <GmLogo />
                            </div>
                        </div>
                        <div className="flex justify-end ml-[1.5rem] p-0 items-center text-[#687781] text-[.875rem] w-auto max-w-full">
                            ShareTheMeal © 2023
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
