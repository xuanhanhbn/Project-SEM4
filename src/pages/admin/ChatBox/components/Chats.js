import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '~/context/AuthContext';
import { ChatContext } from '~/context/ChatContext';
import { Timestamp, arrayUnion, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '~/firebase';
import { Divider } from 'antd';

function Chats() {
    const [chats, setChats] = useState({});
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [newMessage, setNewMessage] = useState(false);

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

    const handleUpdateMessage = async () => {
        try {
            await updateDoc(doc(db, 'userChats', currentUser?.uid), {
                [data.chatId + '.newMessage']: { newMessage },
            });

            await updateDoc(doc(db, 'userChats', data?.user?.uid), {
                [data.chatId + '.newMessage']: { newMessage },
            });
        } catch (error) {
            return error;
        }
    };

    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
        handleUpdateMessage();
    };
    return (
        <div className="my-5">
            {Object?.keys(chats)?.length > 0 ? (
                Object.entries(chats)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((chat) => (
                        <div key={chat[0]} className="hover:bg-slate-100 rounded">
                            <Link
                                onClick={() => handleSelect(chat[1].userInfo)}
                                to="#"
                                className="flex items-center justify-between w-full"
                            >
                                <div className="w-[80%] flex items-center">
                                    <img src={chat[1].userInfo.photoURL} className="mr-3 rounded-full w-9 h-9" alt="" />
                                    <div>
                                        <span
                                            className="truncate w-[130px] text-sm font-bold"
                                            style={{ color: '#000' }}
                                        >
                                            {chat[1].userInfo.displayName}
                                        </span>
                                        <p
                                            className={
                                                chat[1].newMessage?.newMessage
                                                    ? 'truncate w-[130px] text-sm font-bold'
                                                    : 'truncate w-[130px] text-sm '
                                            }
                                        >
                                            {chat[1].lastMessage?.text}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    {chat[1].newMessage?.newMessage ? (
                                        <i style={{ color: '#385898' }} className="fa-solid fa-circle"></i>
                                    ) : (
                                        ''
                                    )}
                                </div>
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
