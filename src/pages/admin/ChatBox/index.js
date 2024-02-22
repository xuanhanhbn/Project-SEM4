import React, { useState } from 'react';
import { Input } from 'antd';
import helloChat from '~/assets/images/banner/__How-To-Craft-A-Great-Chatbot-Welcome-Message-01.png';
import { Link } from 'react-router-dom';
import { chatUser } from './constanst';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSearchSchema = Yup.object().shape({
    search: Yup.string().required(''),
});

const validationMessageSchema = Yup.object().shape({
    message: Yup.string().required(''),
});

function ChatBox() {
    //State
    const [isShowChatBox, setIsShowChatBox] = useState(false);
    const [isMessage, setIsMessage] = useState({});

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

    // kiểm tra isMessage
    const keys = Object.keys(isMessage);

    // xử lý mở chatbox
    const hanldeShowChatBox = (data) => {
        setIsShowChatBox(true);
        setIsMessage(data);
    };

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
    const handleSearchUser = (data) => {
        console.log('userName', data);
        setValue('search', '');
    };

    // xử lý gửi tin nhắn
    const handleSendMessage = (data) => {
        console.log('message', data);
        setValueMessage('message', '');
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

                        {chatUser.map((data) => RENDER_ALL_CHAT_USER(data))}
                    </div>
                </div>

                {keys.length === 0 ? (
                    <div className="h-full">
                        <img src={helloChat} alt="" className="w-full h-full rounded-2xl" />
                    </div>
                ) : (
                    <div className="flex-col flex-1 hidden h-full md:flex">
                        <div className={isShowChatBox ? '' : 'hidden'}>
                            <div className="flex w-full h-24 p-6 border-b border-white">
                                <div className="flex items-center w-full ">
                                    <img src={isMessage.avatar} className="w-10 h-10 mr-3 rounded-full " alt="" />
                                    <p className="font-bold">{isMessage.name}</p>
                                </div>
                                <button className="h-auto bg-blue-900 rounded-lg md:hidden hover:bg-blue-101 w-14">
                                    <i className="text-3xl text-white fa-solid fa-caret-left"></i>
                                </button>
                            </div>
                            <div className="flex flex-col flex-1 ">
                                <div className="p-8 overflow-auto h-96">
                                    <div>
                                        <div className="flex items-end mt-6">
                                            <div className="w-10">
                                                <img src={isMessage.avatar} alt="" className="rounded-full w-7 h-w-7" />
                                            </div>
                                            <div>
                                                <div className="max-w-xl px-3 py-2 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left bg-white shadow-2xl rounded-3xl">
                                                    <p className="my-1">
                                                        Good morning 😊 asdasd asdasd asdas asdas asd asdas asdasd
                                                        asdasd asdas asdas asd asdas asdasd asdasd asdas
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 ">
                                            <div className="float-right max-w-xl px-3 py-2 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left shadow-2xl bg-blue-102 rounded-3xl">
                                                <p className="my-1">
                                                    asdasd asdasd asdas asdas asd asdas asdasd asdasd asdas asdas asd
                                                    asdas asdasd asdasd asdas
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form
                                    onSubmit={handleSubmitSendMessage(handleSendMessage)}
                                    className="flex flex-1 pt-3 pb-6 mx-4 mt-4"
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
