/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from 'antd';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import avatar from '~/assets/images/avatar/avatar.png';
import { auth, db, storage } from '~/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { notify } from '~/utils/common';
import { AuthContext } from '~/context/AuthContext';
import { setDoc, doc, onSnapshot, updateDoc, Timestamp, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { ChatContext } from '~/context/ChatContext';
import { v4 as uuid } from 'uuid';
import Message from './Message';

const validationSchema = Yup.object().shape({
    message: Yup.string().required(''),
});

function ChatBoxCustom(props) {
    const { closeChatBox } = props;

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    // console.log('currentUser: ', currentUser);
    // console.log('data: ', data);

    //State
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([
        {
            senderId: '0szWwXUjJDbZo8Og4M11p4gEZ3r1',
            text: 'alo',
            id: 'e4b0c7c1-c923-4a88-8f10-9b1efac669cd',
            date: Timestamp,
        },
        {
            date: Timestamp,
            id: 'de1c3445-69b7-4043-bf26-ab3c2a86fac1',
            senderId: 'ppM6GmVMHegA61VPllEMgcn3yEM2',
            text: 'gi',
        },
        {
            id: 'c2ff1b3f-0f8b-4faa-a2a6-5975368e3b9e',
            text: 'ok hi',
            senderId: '0szWwXUjJDbZo8Og4M11p4gEZ3r1',
            date: Timestamp,
        },
    ]);
    const [img, setImg] = useState(null);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            return doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    // xử lý khi send message
    const handleSendMeage = async () => {
        try {
            if (img) {
                const storageRef = ref(storage, uuid());

                const uploadTask = uploadBytesResumable(storageRef, img);

                uploadTask.on(
                    (error) => {
                        //TODO:Handle Error
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, 'chats', data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                }),
                            });
                        });
                    },
                );
            } else {
                await updateDoc(doc(db, 'chats', data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser?.uid,
                        date: Timestamp.now(),
                    }),
                });
            }

            await updateDoc(doc(db, 'userChats', currentUser?.uid), {
                [data.chatId + '.lastMessage']: {
                    text,
                },
                [data.chatId + '.date']: serverTimestamp(),
            });

            await updateDoc(doc(db, 'userChats', data?.user?.uid), {
                [data.chatId + '.lastMessage']: {
                    text,
                },
                [data.chatId + '.date']: serverTimestamp(),
            });
            setText('');
            setImg(null);
        } catch (error) {
            return error;
        }
    };

    return (
        <div className="h-full bg-white rounded-2xl w-72">
            <div className="flex bg-blue-100 rounded-t-2xl">
                <div className="relative flex items-center justify-center w-16 h-16 bg-white border-4 border-blue-700 rounded-full -top-4 left-6">
                    <img src={data?.user?.photoURL || avatar} alt="" className="w-full rounded-full" />
                </div>
                <div className="flex justify-between flex-1 pl-10 pr-4">
                    <div className="mt-4 font-bold text-white">{data?.user?.displayName}</div>
                    <button onClick={() => closeChatBox()} className="h-2 mt-2">
                        <i className="text-white fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            <div className="w-full p-2 overflow-auto font-semibold text-center bg-white h-80">
                <div>
                    <div className="flex items-end">
                        {/* <div className="w-10">
                            <img src={data?.user?.photoURL || avatar} alt="" className="rounded-full w-7 h-w-7" />
                        </div> */}
                        <div>
                            <div className="max-w-[12rem] w-fit  px-3 py-2 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left bg-gray-700 rounded-3xl">
                                <div>
                                    <p className="my-1">Hello {currentUser?.displayName}! How can we help you?</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="mt-2"> */}
                    {messages && messages?.map((mess) => <Message mess={mess} key={mess?.id} />)}
                    {/* </div> */}
                </div>
            </div>
            <div className="flex items-center justify-between p-2 border-t-[1px]">
                <Input
                    onChange={(e) => setText(e?.target?.value)}
                    value={text}
                    placeholder="Enter message"
                    className="flex-1 p-1 border-none focus:shadow-none focus-within:shadow-none rounded-2xl"
                />
                <button className="w-8 mx-2" onClick={handleSendMeage}>
                    <i className="text-blue-100 fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
}

export default ChatBoxCustom;
