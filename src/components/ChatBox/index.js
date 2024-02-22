import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from 'antd';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import avatar from '~/assets/images/avatar/avatar.png';

const validationSchema = Yup.object().shape({
    message: Yup.string().required(''),
});

function ChatBoxCustom(props) {
    const { closeChatBox } = props;

    //State
    const [isStartChat, setIsStartChat] = useState(false);
    // const [messages, setMessages] = useState([
    //     {
    //         createdAt: new Date(Date.now()),
    //         messageId: '1',
    //         senderId: '1',
    //         profilePicture: '',
    //         type: 'text',
    //         text: 'Hello, how are you?',
    //     },
    // ]);

    const {
        handleSubmit,
        control,
        setValue,
        // formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // lưu trạng thái lần đầu và duy nhất khi bắt đầu đoạn chat
    useEffect(() => {
        const isStartChatFromLocalStorage = localStorage.getItem('isStartChat');
        if (isStartChatFromLocalStorage === 'true') {
            setIsStartChat(true);
        }
    }, []);

    // fake data
    // const role = 'user';
    const account = 'duongtm';
    const name = 'Dương';

    // xử lý khi click button chatbox
    const handleStartChat = () => {
        setIsStartChat(true);
        localStorage.setItem('isStartChat', 'true');
        console.log('name', name);
        console.log('account', account);
    };

    // xử lý khi send message
    const handleSendMeage = (data) => {
        console.log(data);
        setValue('message', '');
    };

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
                <div className={isStartChat === false ? 'mt-20' : 'hidden'}>
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
                <div className={isStartChat === false ? 'hidden' : ''}>
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
                        <div className="float-right max-w-[12rem] px-3 py-2  mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left text-white bg-blue-500 rounded-3xl">
                            asdas asd asdas asdasd asdasd asdas
                        </div>
                    </div>
                </div>
            </div>
            <form
                onSubmit={handleSubmit(handleSendMeage)}
                className={isStartChat === false ? 'hidden' : 'flex items-center justify-between p-2 border-t-[1px]'}
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
