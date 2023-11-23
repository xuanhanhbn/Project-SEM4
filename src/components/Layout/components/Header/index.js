import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const login = false;

function Header() {
    const [openMenuUser, setOpenMenuUser] = useState(false);
    const [openMenuMobile, setOpenMenuMobile] = useState(false);

    const handleOpenMenuUser = () => {
        setOpenMenuUser(!openMenuUser);
    };

    const handleOpenMenuMobile = () => {
        setOpenMenuMobile(!openMenuMobile);
    };

    const handleClose = () => {
        setOpenMenuMobile(false);
        setOpenMenuUser(false);
    };

    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
            document.getElementById('nav_scroll').style.height = '5.0625rem';
            document.getElementById('header').style.height = '5.0625rem';
            document.getElementById('btn_donate').style.padding = '6px 12px';
        } else {
            document.getElementById('nav_scroll').style.height = '6.0625rem';
            document.getElementById('header').style.height = '6.0625rem';
            document.getElementById('btn_donate').style.padding = '12px 16px 13px';
        }
    }

    return (
        <nav
            id="header"
            className="bg-white transition-[.4s] border-b z-[999] top-0 right-0 fixed w-full border-solid border-[#d9dddf] "
        >
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div
                    id="nav_scroll"
                    className="relative flex transition-[.4s] h-[6.0625rem]  items-center justify-between"
                >
                    {/* button open menu mobile */}
                    <div className="absolute inset-y-0 left-0 flex items-center min-[925px]:hidden">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={handleOpenMenuMobile}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>

                            <svg
                                className="block w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>

                            <svg
                                className="hidden w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center justify-start flex-1 sm:items-stretch ml-[46px]">
                        {/* logo */}
                        <div className="flex items-center flex-shrink-0">
                            <Link to="/">
                                <img
                                    className="w-auto h-8"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Your Company"
                                />
                            </Link>
                        </div>
                        {/* menu */}
                        <div className="hidden sm:ml-6 min-[925px]:block">
                            <div className="flex space-x-4">
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) => (isActive ? 'active' : 'not-active ')}
                                    aria-current="page"
                                >
                                    About Us
                                </NavLink>
                                <NavLink
                                    to="/campaigns"
                                    className={({ isActive }) => (isActive ? 'active' : 'not-active')}
                                >
                                    Fundraising goals
                                </NavLink>
                                <NavLink to="/faq" className={({ isActive }) => (isActive ? 'active' : 'not-active')}>
                                    FAQs
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    {/* User icon || singin */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative hidden ml-3 sm:block">
                            {login === true ? (
                                <div className="border-r border-solid border-[#e5e7eb]">
                                    <div className="text-[#007dbc] hover:text-[#031c2d]  uppercase pt-[0.625rem] pb-[0.6875rem] px-[1.75rem] text-[.875rem] leading-6 relative font-bold">
                                        Sign in
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden min-[925px]:block">
                                    <button
                                        type="button"
                                        className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        id="user-menu-button"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                        onClick={handleOpenMenuUser}
                                    >
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </button>
                                </div>
                            )}

                            {openMenuUser ? (
                                <div
                                    className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex="-1"
                                    onClick={handleClose}
                                >
                                    <Link
                                        to="#"
                                        className="block px-4 py-2 mx-1.5 rounded-lg text-sm text-gray-700 hover:bg-slate-400 hover:text-white"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-0"
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        to="#"
                                        className="block px-4 py-2 text-sm mx-1.5 rounded-lg text-gray-700 hover:bg-slate-400 hover:text-white"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-1"
                                    >
                                        Settings
                                    </Link>
                                    <Link
                                        to="#"
                                        className="block px-4 py-2 text-sm mx-1.5 rounded-lg text-gray-700 hover:bg-slate-400 hover:text-white"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-2"
                                    >
                                        Sign out
                                    </Link>
                                </div>
                            ) : null}
                        </div>
                        <button
                            id="btn_donate"
                            className="mx-[1.5rem] max-[320px]:w-auto transition-[.4s] pt-3 pb-[13px] px-4  w-[12.75rem]  bg-[#febb00] hover:bg-[#fec629] text-[#031c2d] text-[.875rem] font-semibold rounded-[.5rem] border-[#febb00] hover:border-[#fec629]"
                        >
                            Donate now
                        </button>
                    </div>
                </div>
            </div>

            {/* menu mobile */}
            {openMenuMobile ? (
                <div id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1" onClick={handleClose}>
                        <Link
                            to="/about"
                            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-slate-400 hover:text-white"
                            aria-current="page"
                        >
                            About Us
                        </Link>
                        <Link
                            to="/campaigns"
                            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-slate-400 hover:text-white"
                        >
                            Fundraising goals
                        </Link>
                        <Link
                            to="/faq"
                            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-slate-400 hover:text-white"
                        >
                            FAQs
                        </Link>
                        <Link
                            to="/profile"
                            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-slate-400 hover:text-white"
                        >
                            My Profile
                        </Link>
                        <Link
                            to="/"
                            className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-slate-400 hover:text-white"
                        >
                            Sing Out
                        </Link>
                    </div>
                </div>
            ) : null}
        </nav>
    );
}

export default Header;
