import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from 'antd';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
    const fakeDataChat = {
        displayName: 'Admin',
        email: 'admin3@gmail.com',
        password: 'Admin123@',
        image: 'https://didongviet.vn/dchannel/wp-content/uploads/2023/08/hinh-nen-3d-hinh-nen-iphone-dep-3d-didongviet@2x-576x1024.jpg',
    };

    //State
    const [isStartChat, setIsStartChat] = useState(false);
    const [messages, setMessages] = useState([]);
    // const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const {
        handleSubmit,
        control,
        setValue,
        // formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data()?.messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    // console.log(messages);
    // lưu trạng thái lần đầu và duy nhất khi bắt đầu đoạn chat
    // useEffect(() => {
    //     const isStartChatFromLocalStorage = localStorage.getItem('isStartChat');
    //     if (isStartChatFromLocalStorage === 'true') {
    //         setIsStartChat(true);
    //     }
    // }, []);

    const account = 'duongtm';
    const name = 'Dương';

    // xử lý khi click button chatbox
    const handleStartChat = async () => {
        setIsStartChat(true);
        const displayName = fakeDataChat.displayName;
        const email = fakeDataChat.email;
        const password = fakeDataChat?.password;
        const image = fakeDataChat.image;
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, image).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, 'userChats', res.user.uid), {});
                    } catch (err) {
                        console.log(err);
                    }
                });
            });
        } catch (error) {
            return notify(error, 'error');
        }
    };

    // xử lý khi send message
    const handleSendMeage = async (getText) => {
        const text = getText?.message;
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
        // setText('');
        setImg(null);
        setValue('message', '');
    };

    // console.log('messages: ', messages);

    return (
        <div className="h-full bg-white rounded-2xl w-72">
            <div className="flex bg-blue-100 rounded-t-2xl">
                <div className="relative flex items-center justify-center w-16 h-16 bg-white border-4 border-blue-700 rounded-full -top-4 left-6">
                    <img src={avatar} alt="" className="w-full rounded-full" />
                </div>
                <div className="flex justify-between flex-1 pl-10 pr-4">
                    <div className="mt-4 font-bold text-white">Admin</div>
                    <button onClick={closeChatBox} className="h-2 mt-2">
                        <i className="text-white fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            <div className="w-full p-2 overflow-auto font-semibold text-center bg-white h-80">
                <div className={!isStartChat && !currentUser ? 'mt-20' : 'hidden'}>
                    <div>Hi {name}!</div>
                    <div>Thank you for contacting us.</div>
                    <br />
                    <div>Click to send.</div>
                    <div>
                        <button
                            onClick={() => handleStartChat()}
                            className="p-2 px-6 mt-2 font-medium text-blue-500 transition-transform bg-white shadow-2xl hover:-translate-y-1 rounded-3xl shadow-slate-400"
                        >
                            Start
                        </button>
                    </div>
                </div>

                <div className={!isStartChat && !currentUser ? 'hidden' : ''}>
                    <div className="flex items-end">
                        <div className="w-10">
                            <img src={avatar} alt="" className="rounded-full w-7 h-w-7" />
                        </div>
                        <div>
                            <div className="max-w-[12rem]  px-3 py-2 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left bg-gray-700 rounded-3xl">
                                <div>
                                    <p className="my-1">Hello {name}! How can we help you?</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        {messages && messages?.map((mess) => <Message mess={mess} key={mess?.id} />)}
                    </div>
                </div>
            </div>
            <form
                onSubmit={handleSubmit(handleSendMeage)}
                className={
                    !isStartChat && !currentUser ? 'hidden' : 'flex items-center justify-between p-2 border-t-[1px]'
                }
            >
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <Input
                                onChange={onChange}
                                value={value}
                                placeholder="Enter message"
                                className="flex-1 p-1 border-none focus:shadow-none focus-within:shadow-none rounded-2xl"
                            />
                        );
                    }}
                    name="message"
                />
                <button className="w-8 mx-2">
                    <i className="text-blue-100 fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
}

export default ChatBoxCustom;
