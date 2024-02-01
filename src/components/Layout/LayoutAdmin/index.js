import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './layouts.css';
import { sideBarList } from './constants';

function LayoutAdmin({ children }) {
    // render sidebar item
    const RENDER_TAB_ITEMS = (item) => {
        if (item.type === 'TAB_ITEM') {
            return (
                <li id="admin_sidebar_item" key={item.id} className="mt-0.5 w-full">
                    <NavLink
                        className={({ isActive }) => (isActive ? 'tab_active shadow-md tab_item' : 'tab_item')}
                        to={item.path}
                    >
                        <div className="tab_item_icon">{item.tabIcon}</div>
                        <span
                        // className={
                        //     isAcitve ? 'tab_item_name font-semibold text-blue-200' : 'tab_item_name'
                        // }
                        >
                            {item.tabName}
                        </span>
                    </NavLink>
                </li>
            );
        }

        if (item.type === 'TABTITLE') {
            return (
                <li id="admin_sidebar_tab_title" key={item.id} className="w-full mt-4">
                    <h6 className="sidebar_tab_title">{item.tabName}</h6>
                </li>
            );
        }
    };

    return (
        <div id="adminLayout">
            <aside className="admin_sidebar">
                <div className="h-[5rem]">
                    <Link className="admin_logo" to="/admin">
                        <img src="../assets/img/logo-ct.png" className="admin_logo_img" alt="main_logo" />
                        <span className="admin_logo_name"> Tên tổ chức</span>
                    </Link>
                </div>

                <hr className="admin_sidebar_line" />

                <div className="admin_sidebar_list">
                    <ul className="flex flex-col pl-0 mb-0">{sideBarList.map((data) => RENDER_TAB_ITEMS(data))}</ul>
                </div>
            </aside>
            <main className="admin_container">{children}</main>
        </div>
    );
}

export default LayoutAdmin;
