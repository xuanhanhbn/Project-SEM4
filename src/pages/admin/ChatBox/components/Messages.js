import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '~/context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '~/firebase';
import MessageAdmin from '../MessageAdmin';
import { AuthContext } from '~/context/AuthContext';

function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <div className="flex-col  flex-1 hidden h-full md:flex">
            <div>
                <div className="flex w-full h-24 p-6 border-b border-white">
                    <div className="flex items-center w-full ">
                        <img src={data?.user?.photoURL} className="w-10 h-10 mr-3 rounded-full " alt="" />
                        <p className="font-bold">{data?.user?.displayName}</p>
                    </div>
                    <button className="h-auto bg-blue-900 rounded-lg md:hidden hover:bg-blue-101 w-14">
                        <i className="text-3xl text-white fa-solid fa-caret-left"></i>
                    </button>
                </div>

                <div className="flex flex-col flex-1 ">
                    <div className="p-8  overflow-auto min-h-[24rem]">
                        <div>
                            <div className="flex items-end mt-6">
                                <div className="w-10">
                                    <img src={data?.user?.photoURL} alt="" className="rounded-full w-7 h-w-7" />
                                </div>
                                {/* FOR USER */}
                                <div className="w-[100%]">
                                    {messages &&
                                        messages?.length > 0 &&
                                        messages
                                            // ?.filter((obj) => obj?.senderId !== currentUser?.uid)
                                            .map((mess) => <MessageAdmin mess={mess} key={mess?.id} />)}
                                </div>
                            </div>

                            {/* FOR ME */}

                            {/* {messages &&
                                messages?.length > 0 &&
                                messages
                                    ?.filter((obj) => obj?.senderId === currentUser?.uid)
                                    .map((mess) => <MessageAdmin mess={mess} key={mess?.id} />)} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
