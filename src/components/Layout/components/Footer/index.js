import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <div id="footer">
            <div className="bg-white text-[.875rem] pt-9 mt-auto">
                <div className="w-full px-4 mx-auto ">
                    <div className="flex flex-wrap pb-8 mx-0">
                        <div className="px-0 basis-1/2 max-w-[50%]">
                            <div className="text-gray-100  hover:text-black  pt-[.8125rem] flex  font-semibold  ">
                                <i className="mt-[10px] mr-1 hover:text-black text-gray-100 fa-light fa-envelope fa-xl "></i>

                                <Link to="/contact">Contact us</Link>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper_footer_menu">
                        <div className="menu_footer">
                            <Link to="/faq" className="li_menu_footer">
                                FAQs
                            </Link>
                            <Link to="/terms" className="li_menu_footer">
                                Terms of Use
                            </Link>
                            <Link to="/privacy" className="li_menu_footer">
                                Privacy Policy
                            </Link>
                        </div>
                        <div className="list_contact ">
                            <div className="logo-icon">
                                <i className="text-white fa-xl fa-brands fa-facebook"></i>
                            </div>
                            <div className="logo-icon">
                                <i className="text-white fa-brands fa-twitter fa-xl"></i>
                            </div>
                            <div className="logo-icon">
                                <i className="text-white fa-brands fa-youtube fa-xl"></i>
                            </div>
                            <div className="logo-icon">
                                <i className="text-white fa-brands fa-instagram fa-xl"></i>
                            </div>
                            <div className="logo-icon">
                                <i className="text-white fa-light fa-envelope fa-xl"></i>
                            </div>
                        </div>
                        <div className="footer_name_uuu">ShareTheMeal © 2023</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
