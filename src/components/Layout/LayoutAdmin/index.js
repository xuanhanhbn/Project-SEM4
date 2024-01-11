import React from 'react';
import { NavLink } from 'react-router-dom';

const listNav = [
    {
        to: '/admin/program',
        exact: false,
        img: '/home-admin.png',
        title: 'Program',
    },
    {
        to: '/admin/partner',
        exact: false,
        img: '/home-admin.png',
        title: 'Partner',
    },
];

function LayoutAdmin({ children }) {
    return (
        <div className=" bg-gray-400 min-h-[100vh] h-full flex">
            <div className="w-[220px] bg-[#262b3f] flex flex-col items-center pt-6">
                <div className="flex w-full flex-col gap-1 px-[20px]">
                    <NavLink
                        to={'/admin'}
                        exact={true}
                        className="flex items-center w-full gap-3 px-3 py-2 text-white transition duration-300 hover:text-blue-500"
                        activeClassName="bg-[#1a1e2e]"
                    >
                        <img src={'/logo192.png'} alt="logo" className="h-[24px] aspect-square" />
                        Dashboard
                    </NavLink>
                    {listNav.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.to}
                            exact={item.exact}
                            className="flex items-center w-full gap-3 hover:bg-[#303552] px-3 py-2 hover:border-[#5d6177] border-transparent text-white transition duration-300 border rounded-md "
                            activeClassName="bg-[#1a1e2e]"
                        >
                            <img src={item?.img} alt="logo" className="h-[24px] aspect-square" />
                            {item?.title}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="w-full ">
                <div>{children}</div>
            </div>
        </div>
    );
}

export default LayoutAdmin;
