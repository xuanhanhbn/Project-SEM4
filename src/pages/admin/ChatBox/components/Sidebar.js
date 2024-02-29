import React from 'react';
import Search from './Search';
import Chats from './Chats';

function Sidebar() {
    return (
        <div className="flex h-full shadow-2xl bg-chat-100 rounded-2xl">
            <div className="w-full h-full py-5 pl-5 pr-8 bg-white shadow-inner md:max-w-xs rounded-2xl">
                <Search />
                <Chats />
            </div>
        </div>
    );
}

export default Sidebar;
