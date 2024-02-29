/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/firebase';

function ChatBox() {
    const handleLoginChat = async () => {
        const email = 'admin3@gmail.com.dmm';
        const password = 'Admin123@';
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            return err;
        }
    };

    useEffect(() => {
        handleLoginChat();
    }, []);

    return (
        <div className="flex h-screen py-2 pr-2 ">
            <div>
                <Sidebar />
            </div>
            <div style={{ flex: 1 }}>
                <Chat />
            </div>
        </div>
    );
}

export default ChatBox;
