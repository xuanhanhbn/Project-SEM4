import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className="flex w-full fixed z-[1030] items-center justify-start border-b-[.0625rem] border-[#d9dddf] p-0 bg-[#fff] shadow-none border-solid ">
            <div className="min-w-[15.75rem]">
                <a href="/" className="w-auto bg-[#007dbc] inline-block">
                    <img
                        src="https://sharethemeal.org/icons/logo-stm-wfp.svg"
                        alt="Share The Meal logo"
                        className="h-[4.25rem] mx-[1.5rem] my-[.875rem] min-h-[4.25rem] w-auto"
                    />
                </a>
            </div>
            <div className="flex flex-wrap justify-center pl-0 mb-0 grow">
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'pt-[0.625rem] pb-[0.6875rem] px-[1.75rem] text-[.875rem] uppercase text-[#031c2d]  leading-6 relative font-bold'
                            : 'pt-[0.625rem] pb-[0.6875rem] px-[1.75rem] text-[.875rem] uppercase text-[#687781]  leading-6 relative font-bold'
                    }
                    to="/about"
                >
                    About us
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'pt-[0.625rem] pb-[0.6875rem] px-[1.75rem] text-[.875rem] uppercase text-[#031c2d]  leading-6 relative font-bold'
                            : 'pt-[0.625rem] pb-[0.6875rem] px-[1.75rem] text-[.875rem] uppercase text-[#687781]  leading-6 relative font-bold'
                    }
                    to="/campaigns"
                >
                    Fundraising goals
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'pt-[0.625rem] pb-[0.6875rem] px-[1.75rem] text-[.875rem] uppercase text-[#031c2d]  leading-6 relative font-bold'
                            : 'pt-[0.625rem] pb-[0.6875rem] px-[1.75rem] text-[.875rem] uppercase text-[#687781]  leading-6 relative font-bold'
                    }
                    to="/faq"
                >
                    FAQs
                </NavLink>
            </div>
            <div className="grow-0 flex items-center justify-end min-w-[21.625rem]  divide-x">
                <div className="mr-[1.25rem] static">
                    <div className="px-[.75rem] py-[0.5rem]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            id="svg150"
                        >
                            <defs id="defs18"></defs>
                            <path
                                id="path25"
                                d="M 10.75 0 C 4.8218224 0 3.5527137e-15 4.8218224 0 10.75 C 1.9067263e-15 16.678178 4.8218224 21.5 10.75 21.5 C 16.678178 21.5 21.5 16.678178 21.5 10.75 C 21.5 4.8218224 16.678178 3.5527137e-15 10.75 0 z M 10.75 1.5 C 15.867517 1.5 20 5.6324826 20 10.75 C 20 15.867517 15.867517 20 10.75 20 C 5.6324826 20 1.5 15.867517 1.5 10.75 C 1.5 5.6324826 5.6324826 1.5 10.75 1.5 z "
                                fill="#031C2D"
                            ></path>
                            <path
                                d="M 11.2778,21.4297 C 9.3159004,20.4244 7.6688004,18.8981 6.5173004,17.0183 c -1.1515,-1.8798 -1.763,-4.0405 -1.7673,-6.245 -0.0043,-2.2044 0.5988,-4.3675 1.743,-6.2518 1.1442,-1.88423 2.7853,-3.4169 4.7432996,-4.4298 l 0.7719,1.49216 C 10.3244,2.45495 8.9130004,3.7731 7.9290004,5.3935 c -0.984,1.6205 -1.5027,3.4807 -1.499,5.3766 0.0037,1.8958 0.5296,3.754 1.5199,5.3706 0.9903,1.6167 2.4067996,2.9293 4.0939996,3.7938 z"
                                fill="#031C2D"
                                id="path142"
                            ></path>
                            <path
                                d="m 10.2222,21.4297 c 1.9619,-1.0053 3.609,-2.5316 4.7605,-4.4114 1.1515,-1.8798 1.763,-4.0405 1.7673,-6.245 C 16.7543,8.5689 16.1512,6.4058 15.007,4.5215 13.8628,2.63727 12.2217,1.1046 10.2637,0.0917 L 9.4918004,1.58386 C 11.1756,2.45495 12.587,3.7731 13.571,5.3935 c 0.984,1.6205 1.5027,3.4807 1.499,5.3766 -0.0037,1.8958 -0.5296,3.754 -1.5199,5.3706 -0.9903,1.6167 -2.4068,2.9293 -4.0939996,3.7938 z"
                                fill="#031C2D"
                                id="path144"
                            ></path>
                            <path
                                id="path33"
                                d="M 0.75 13 L 0.75 14.5 L 20.75 14.5 L 20.75 13 L 0.75 13 z "
                                fill="#031C2D"
                            ></path>
                            <path
                                id="path29"
                                d="M 0.75 7 L 0.75 8.5 L 20.75 8.5 L 20.75 7 L 0.75 7 z "
                                fill="#031C2D"
                            ></path>
                        </svg>
                    </div>
                </div>
                <div className="text-[#007dbc] hover:text-[#031c2d]  uppercase pt-[0.625rem] pb-[0.6875rem] px-[1.75rem] text-[.875rem] leading-6 relative font-bold">
                    Sign in
                </div>
                <div className="">
                    <button
                        type="button"
                        className="ml-[1.5rem] mr-[3rem] w-[12.75rem] pt-[.75rem] pb-[.8125rem] px-[1rem] bg-[#febb00] hover:bg-[#fec629] text-[#031c2d] text-[.875rem] font-semibold rounded-[.5rem] border-[#febb00] hover:border-[#fec629]"
                    >
                        Donate now
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
