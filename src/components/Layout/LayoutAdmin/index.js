import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './layouts.css';
import { sideBarList } from './constants';
import logo from '~/assets/images/logo/WFP_STM_Values_Illustrations_Open (1).jpg';

function LayoutAdmin({ children }) {
    const [isHiddenClass, setisHiddenClass] = useState(false);

    // render sidebar item
    const RENDER_TAB_ITEMS = (item) => {
        if (item.type === 'TAB_ITEM') {
            return (
                <li id="admin_sidebar_item" key={item.id} className="mt-0.5 w-full">
                    <NavLink
                        className={({ isActive }) => (isActive ? 'tab_active shadow-md tab_item' : 'tab_item')}
                        to={item.path}
                        onClick={item.id === 7 ? () => hiddenTabName() : () => setisHiddenClass(false)}
                    >
                        <div className="tab_item_icon">{item.tabIcon}</div>
                        <span className={isHiddenClass ? 'hidden' : ''}>{item.tabName}</span>
                    </NavLink>
                </li>
            );
        }

        if (item.type === 'TABTITLE') {
            return (
                <li id="admin_sidebar_tab_title" key={item.id} className={isHiddenClass ? 'hidden' : 'w-full mt-4'}>
                    <h6 className="sidebar_tab_title">{item.tabName}</h6>
                </li>
            );
        }
    };

    const hiddenTabName = () => {
        setisHiddenClass(true);
    };

    return (
        <div id="adminLayout">
            <aside className={isHiddenClass ? 'm-0 admin_sidebar' : 'admin_sidebar my-4 ml-4'}>
                <div className="h-[5rem]">
                    <Link className="admin_logo" to="/admin">
                        <img src={logo} className="admin_logo_img" alt="" />
                        <span className={isHiddenClass ? 'hidden' : 'admin_logo_name'}> Tên tổ chức</span>
                    </Link>
                </div>

                {/* <hr className="admin_sidebar_line" /> */}

                <div className="admin_sidebar_list">
                    <ul className="flex flex-col pl-0 mb-0">{sideBarList.map((data) => RENDER_TAB_ITEMS(data))}</ul>
                    <ul className="flex flex-col pl-0 mb-0">
                        <li id="admin_sidebar_item" className="mt-0.5 w-full">
                            <NavLink
                                className={({ isActive }) => (isActive ? 'tab_active shadow-md tab_item' : 'tab_item')}
                                to="/"
                                onClick={() => setisHiddenClass(false)}
                            >
                                <div className="tab_item_icon">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </div>
                                <span className={isHiddenClass ? 'hidden' : ''}>Logout</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
            <main className={isHiddenClass ? 'admin_container xl:ml-[6.5rem]' : 'admin_container xl:ml-[17.125rem]'}>
                {children}
            </main>
        </div>
    );
}

export default LayoutAdmin;
