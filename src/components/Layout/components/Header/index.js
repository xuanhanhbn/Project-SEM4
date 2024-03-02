import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import { Link, animateScroll as scroll } from 'react-scroll';
import './Header.css';
import UserAvatar from '../../../../assets/images/avatar/avatar.png';
import { animateScroll as scroll } from 'react-scroll';
import { auth } from '~/firebase';
import { signOut } from 'firebase/auth';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import { useMutation } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import { logoutApi } from './callApi';

function Header() {
    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    //State
    const [openMenuUser, setOpenMenuUser] = useState(false);
    const [openMenuMobile, setOpenMenuMobile] = useState(false);

    // cuộn về đầu trang khi chuyển tab
    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    // xử lý mở menu khi click vào avatar header
    const handleOpenMenuUser = () => {
        setOpenMenuUser(!openMenuUser);
    };

    // xử lý mở menu dạng mobile
    const handleOpenMenuMobile = () => {
        setOpenMenuMobile(!openMenuMobile);
    };

    // xử lý đóng menu
    const handleClose = () => {
        setOpenMenuMobile(false);
        setOpenMenuUser(false);
    };

    const handleSignOut = () => {
        mutationLogout();
    };

    const { mutate: mutationLogout } = useMutation({
        mutationFn: logoutApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                localStorage.removeItem('loginPage');
                setUserData(null);
                signOut(auth);
                return notify('Logout Success', 'success');
            }
            return notify(data?.response?.data, 'error');
        },
    });

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
                            onClick={() => handleOpenMenuMobile()}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>

                            <i className="text-gray-200 fa-light fa-bars"></i>
                        </button>
                    </div>

                    <div className="wrapper_logo ">
                        {/* logo */}
                        <div className="flex items-center justify-center h-full bg-blue-400 w-36">
                            <Link onClick={scrollToTop} className="" to="/">
                                {/* <img className="" src={logo} alt="Your Company" /> */}
                            </Link>
                        </div>
                        {/* menu */}
                        <div className="hidden sm:ml-6 md:block">
                            <div className="flex space-x-4">
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) => (isActive ? 'active ' : 'not-active ')}
                                    aria-current="page"
                                    onClick={scrollToTop}
                                >
                                    About Us
                                </NavLink>
                                <NavLink
                                    to="/campaigns"
                                    onClick={scrollToTop}
                                    className={({ isActive }) => (isActive ? 'active ' : 'not-active')}
                                >
                                    Fundraising goals
                                </NavLink>
                                <NavLink
                                    onClick={scrollToTop}
                                    to="/faq"
                                    className={({ isActive }) => (isActive ? 'active ' : 'not-active')}
                                >
                                    FAQs
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    {/* User icon || singin */}
                    <div className="user_icon">
                        <div className="relative hidden ml-3 sm:block">
                            {Object.keys(userData)?.length < 1 ? (
                                <div className="border-r border-white border-solid">
                                    <Link to="/login" className="cursor-pointer btn_singin">
                                        Sign in
                                    </Link>
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
                                        to="/change-password"
                                        className="li_user_menu"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-1"
                                    >
                                        Change password
                                    </Link>
                                    <Link
                                        to="#"
                                        className="li_user_menu"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-2"
                                        onClick={() => handleSignOut()}
                                    >
                                        Log out
                                    </Link>
                                </div>
                            ) : null}
                        </div>
                        {/* <Link to="/campaigns" id="btn_donate" className="text-center btn_donate_nav">
                            Donate now
                        </Link> */}
                    </div>
                </div>
            </div>

            {/* menu mobile */}
            {openMenuMobile ? (
                <div id="mobile-menu" className="mobile_menu ">
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
