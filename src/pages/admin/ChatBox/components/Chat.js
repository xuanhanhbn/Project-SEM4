import React from 'react';
import Messages from './Messages';
import Input from './Input';

function Chat() {
    return (
        <div className="relative h-full bg-chat-100">
            <Messages />
            <div className="absolute justify-center w-full bottom-2">
                <Input />
            </div>
        </div>
    );
}

export default Chat;
