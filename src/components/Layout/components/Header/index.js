import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import UserAvatar from '../../../../assets/images/avatar/avatar.png';

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
        <nav id="header">
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div id="nav_scroll" className="wrapper_nav">
                    {/* button open menu mobile */}
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                        <button
                            type="button"
                            className="btn_menu_mobile"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={handleOpenMenuMobile}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>

                            <i className="text-gray-200 fa-light fa-bars"></i>
                        </button>
                    </div>

                    <div className="wrapper_logo">
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
                        <div className="hidden sm:ml-6 md:block">
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
                    <div className="user_icon">
                        <div className="relative hidden ml-3 sm:block">
                            {login === true ? (
                                <div className="border-r border-white border-solid">
                                    <div className="cursor-pointer btn_singin">Sign in</div>
                                </div>
                            ) : (
                                <div className="hidden md:block">
                                    <button
                                        type="button"
                                        className="btn_user_menu"
                                        id="user-menu-button"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                        onClick={handleOpenMenuUser}
                                    >
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full" alt="" src={UserAvatar} />
                                    </button>
                                </div>
                            )}

                            {openMenuUser ? (
                                <div
                                    className="user_menu"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex="-1"
                                    onClick={handleClose}
                                >
                                    <Link
                                        to="#"
                                        className="li_user_menu"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-0"
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        to="#"
                                        className="li_user_menu"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-1"
                                    >
                                        History and tax receipts
                                    </Link>
                                    <Link
                                        to="#"
                                        className="li_user_menu"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-2"
                                    >
                                        Sign out
                                    </Link>
                                </div>
                            ) : null}
                        </div>
                        <Link to="/campaigns" id="btn_donate" className="text-center btn_donate_nav">
                            Donate now
                        </Link>
                    </div>
                </div>
            </div>

            {/* menu mobile */}
            {openMenuMobile ? (
                <div id="mobile-menu" className="mobile_menu">
                    <div className="px-2 pt-2 pb-3 space-y-1" onClick={handleClose}>
                        <Link to="/about" className="li_mobile_menu" aria-current="page">
                            About Us
                        </Link>
                        <Link to="/campaigns" className="li_mobile_menu">
                            Fundraising goals
                        </Link>
                        <Link to="/faq" className="li_mobile_menu">
                            FAQs
                        </Link>
                        <Link to="/profile" className="li_mobile_menu">
                            My Profile
                        </Link>
                        <Link to="/" className="li_mobile_menu">
                            Sing Out
                        </Link>
                    </div>
                </div>
            ) : null}
        </nav>
    );
}

export default Header;
