import React from 'react';
import Messages from './Messages';
import Input from './Input';

function Chat() {
    return (
        <div className="bg-chat-100 h-full relative">
            <Messages />
            <div className="absolute bottom-[50px] justify-center w-full">
                <Input />
            </div>
        </div>
    );
}

export default Chat;
