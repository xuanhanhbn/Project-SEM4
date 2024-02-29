import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '~/context/AuthContext';
import { ChatContext } from '~/context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '~/firebase';
import { Divider } from 'antd';

function Chats() {
    const [chats, setChats] = useState({});

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser?.uid), (doc) => {
                if (doc && doc?.data()) {
                    return setChats(doc.data());
                }
            });

            return () => {
                unsub();
            };
        };

        currentUser?.uid && getChats();
    }, [currentUser?.uid]);

    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
    };

    return (
        <div className="my-5">
            {Object?.keys(chats)?.length > 0 ? (
                Object.entries(chats)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((chat) => (
                        <div key={chat[0]}>
                            <Link onClick={() => handleSelect(chat[1].userInfo)} to="#" className="flex items-center">
                                <img src={chat[1].userInfo.photoURL} className="mr-3 rounded-full w-9 h-9" alt="" />
                                <p className="" style={{ color: '#000' }}>
                                    {chat[1].userInfo.displayName}
                                </p>
                            </Link>
                            <Divider />
                        </div>
                    ))
            ) : (
                <></>
            )}
        </div>
    );
}

export default Chats;
