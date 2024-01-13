import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './layouts.css';
import { sideBarList } from './constants';

function LayoutAdmin({ children }) {
    //State
    const [activeLink, setActiveLink] = useState('');

    // bắt sự kiện active khi click
    const handleLinkClick = (id) => {
        setActiveLink(id);
    };

    // render sidebar item
    const renderTabItems = (item) => {
        if (item.type === 'TABITEM') {
            return (
                <li
                    id="admin_sidebar_item"
                    key={item.id}
                    class="mt-0.5 w-full"
                    onClick={() => handleLinkClick(item.id)}
                >
                    <Link class={activeLink === item.id ? 'tab_active shadow-md tab_item' : 'tab_item'} to={item.path}>
                        <div class="tab_item_icon">{item.tabIcon}</div>
                        <span
                            class={
                                activeLink === item.id ? 'tab_item_name font-semibold text-blue-200' : 'tab_item_name'
                            }
                        >
                            {item.tabName}
                        </span>
                    </Link>
                </li>
            );
        }

        if (item.type === 'TABTITLE') {
            return (
                <li id="admin_sidebar_tab_title" key={item.id} class="w-full mt-4">
                    <h6 class="sidebar_tab_title">{item.tabName}</h6>
                </li>
            );
        }
    };

    return (
        <div id="adminLayout">
            <aside class="admin_sidebar">
                <div class="h-[5rem]">
                    <Link class="admin_logo" to="/admin">
                        <img src="../assets/img/logo-ct.png" class="admin_logo_img" alt="main_logo" />
                        <span class="admin_logo_name"> Tên tổ chức</span>
                    </Link>
                </div>

                <hr class="admin_sidebar_line" />

                <div class="admin_sidebar_list">
                    <ul class="flex flex-col pl-0 mb-0">{sideBarList.map((data) => renderTabItems(data))}</ul>
                </div>
            </aside>
            <main class="admin_container">{children}</main>
        </div>
    );
}

export default LayoutAdmin;
