import React, { useContext, useEffect, useState } from 'react';
import { Input } from 'antd';
import helloChat from '~/assets/images/banner/__How-To-Craft-A-Great-Chatbot-Welcome-Message-01.png';
import { Link } from 'react-router-dom';
import { chatUser } from './constanst';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '~/firebase';
import { notify } from '~/utils/common';
import { ChatContext } from '~/context/ChatContext';
import {
    collection,
    query,
    where,
    getDocs,
    arrayUnion,
    doc,
    updateDoc,
    serverTimestamp,
    onSnapshot,
    Timestamp,
} from 'firebase/firestore';
import { AuthContext } from '~/context/AuthContext';
import MessageAdmin from './MessageAdmin';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import Button from '~/components/Button';

const validationSearchSchema = Yup.object().shape({
    search: Yup.string().required(''),
});

const validationMessageSchema = Yup.object().shape({
    message: Yup.string().required(''),
});

function ChatBox() {
    const { data, dispatch } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);

    //State
    const [isShowChatBox, setIsShowChatBox] = useState(false);
    const [err, setErr] = useState(false);
    const [user, setUser] = useState({});
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [img, setImg] = useState(null);
    const [resize, setResize] = useState('');

    // quản lý form search
    const { handleSubmit, control, setValue } = useForm({
        resolver: yupResolver(validationSearchSchema),
    });

    // quản lý form message
    const {
        control: controlMessage,
        handleSubmit: handleSubmitSendMessage,
        setValue: setValueMessage,
    } = useForm({
        resolver: yupResolver(validationMessageSchema),
    });

    useEffect(() => {
        handleLoginChatBox();
    }, []);

    // useEffect(() => {
    //     const getChats = () => {
    //         const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
    //             setChats(doc.data());
    //         });

    //         return () => {
    //             unsub();
    //         };
    //     };

    //     currentUser.uid && getChats();
    // }, [currentUser.uid]);

    const handleGetHistoryChat = () => {
        onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => dispatch({ type: 'CHANGE_USER', payload: chat[1]?.userInfo }));
    };

    console.log('messages: ', messages);

    // Login vào account chatbox
    const handleLoginChatBox = async () => {
        const email = 'admin2@gmail.com';
        const password = 'Admin123@';
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            return notify(err, 'error');
        }
    };

    // xử lý mở chatbox
    const hanldeShowChatBox = () => {
        // await Object.entries(chats)
        //     ?.sort((a, b) => b[1].date - a[1].date)
        //     .map((chat) => dispatch({ type: 'CHANGE_USER', payload: chat[1]?.userInfo }));

        // await onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
        //     doc.exists() && setMessages(doc.data().messages);
        // });
        setIsShowChatBox(true);
    };

    useEffect(() => {
        window.addEventListener('resize', function () {
            const width = window.innerWidth;
            // Xử lý độ rộng màn hình mới
            setResize(width);
        });
    });

    console.log('resize', resize);

    // render all user chat
    const RENDER_ALL_CHAT_USER = (item) => {
        return (
            <div key={item.id} className="mb-3">
                <Link onClick={() => hanldeShowChatBox(item)} to="#" className="flex items-center">
                    <img src={item.avatar} className="mr-3 rounded-full w-9 h-9" alt="" />
                    <p className="">{item.name}</p>
                </Link>
            </div>
        );
    };

    // xử lý tìm kiếm user chat
    const handleSearchUser = async (data) => {
        try {
            const q = query(collection(db, 'users'), where('displayName', '==', data?.search));
            const querySnapshot = await getDocs(q);
            if (querySnapshot && querySnapshot?._snapshot?.docChanges?.length > 0) {
                querySnapshot.forEach((doc) => {
                    setUser(doc.data());
                });
                return setErr(false);
            }
            setErr(true);
            return setUser({});
        } catch (err) {
            setErr(true);
            return notify(err, 'error');
        }
    };

    // xử lý gửi tin nhắn
    const handleSendMessage = async (mess) => {
        const text = mess?.message || '';
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
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });

        setImg(null);
    };
    return (
        <div className="h-screen py-2 pr-2 ">
            <div className="flex h-full shadow-2xl bg-chat-100 rounded-2xl">
                <div className="w-full h-full py-5 pl-5 pr-8 bg-white shadow-inner md:max-w-xs rounded-2xl">
                    <form onSubmit={handleSubmit(handleSearchUser)}>
                        <div className="text-3xl font-semibold">Chats</div>
                        <div className="flex mt-4 bg-gray-800 rounded-md">
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <Input
                                            className="p-2 bg-gray-800 border-none focus-within:shadow-none focus:shadow-none"
                                            placeholder="Basic usage"
                                            value={value}
                                            onChange={onChange}
                                        />
                                    );
                                }}
                                name="search"
                            />

                            <button className="w-10 h-auto rounded-tr-lg rounded-br-lg hover:bg-gray-900">
                                <i className="fa-regular fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </form>
                    <div>
                        <div className="mb-3 text-xs font-medium leading-5 mt-7">DIRECT MESSAGES</div>
                        {/* {err && <span>User not found!</span>}
                        {Object.keys(user)?.length > 0 && (
                            <div className="mb-3">
                                <Button onClick={() => hanldeShowChatBox()} className="flex items-center">
                                    <img src={user.photoURL} className="mr-3 rounded-full w-9 h-9" alt="" />
                                    <p className="">{user.displayName}</p>
                                </Button>
                            </div>
                        )} */}
                        {chatUser.map((data) => RENDER_ALL_CHAT_USER(data))}
                    </div>
                </div>

                {!isShowChatBox ? (
                    <div className="h-full">
                        <img src={helloChat} alt="" className="w-full h-full rounded-2xl" />
                    </div>
                ) : (
                    <div className="flex-col flex-1 hidden h-full md:flex">
                        <div className={isShowChatBox ? '' : 'hidden'}>
                            <div className="flex w-full h-24 p-6 border-b border-white">
                                <div className="flex items-center w-full ">
                                    <img src={user?.photoURL} className="w-10 h-10 mr-3 rounded-full " alt="" />
                                    <p className="font-bold">{user?.displayName}</p>
                                </div>
                                <button className="h-auto bg-blue-900 rounded-lg md:hidden hover:bg-blue-101 w-14">
                                    <i className="text-3xl text-white fa-solid fa-caret-left"></i>
                                </button>
                            </div>

                            <div className="flex flex-col flex-1 ">
                                <div className="p-8 overflow-auto min-h-[24rem]">
                                    <div>
                                        <div className="flex items-end mt-6">
                                            <div className="w-10">
                                                <img src={user?.photoURL} alt="" className="rounded-full w-7 h-w-7" />
                                            </div>
                                            {/* FOR USER */}
                                            <div>
                                                <div className="max-w-xl px-3 py-2 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left break-words bg-white shadow-2xl rounded-3xl">
                                                    asdasd
                                                </div>
                                                {/* {messages &&
                                                    messages?.length > 0 &&
                                                    messages
                                                        ?.filter((obj) => obj?.senderId !== currentUser?.uid)
                                                        .map((mess) => <MessageAdmin mess={mess} key={mess?.id} />)} */}
                                            </div>
                                        </div>

                                        {/* FOR ME */}
                                        <div className="float-right max-w-xl px-3 py-2 mt-6 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left break-words shadow-2xl bg-blue-102 rounded-3xl">
                                            asdad
                                        </div>
                                        {/* {messages &&
                                            messages?.length > 0 &&
                                            messages
                                                ?.filter((obj) => obj?.senderId === currentUser?.uid)
                                                .map((mess) => <MessageAdmin mess={mess} key={mess?.id} />)} */}
                                    </div>
                                </div>

                                <form
                                    onSubmit={handleSubmitSendMessage(handleSendMessage)}
                                    className="flex pt-3 pb-6 mx-4 mt-4 shrink-0"
                                >
                                    <Controller
                                        control={controlMessage}
                                        render={({ field: { onChange, value } }) => {
                                            return (
                                                <Input
                                                    className="p-2 mx-10 bg-white border-none focus-within:shadow-none focus:shadow-none"
                                                    placeholder="Basic usage"
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            );
                                        }}
                                        name="message"
                                    />
                                    <button className="h-auto bg-blue-900 rounded-lg hover:bg-blue-101 w-14">
                                        <i className="text-white fa-solid fa-paper-plane-top"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatBox;
