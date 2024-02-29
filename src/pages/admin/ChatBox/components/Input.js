import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input as InputMessage } from 'antd';
import { AuthContext } from '~/context/AuthContext';
import { ChatContext } from '~/context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '~/firebase';

const validationMessageSchema = Yup.object().shape({
    message: Yup.string().required(''),
});
function Input() {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    // quản lý form message
    const { control: controlMessage, handleSubmit: handleSubmitSendMessage } = useForm({
        resolver: yupResolver(validationMessageSchema),
    });

    const handleSendMessage = async () => {
        // if (img) {
        //     const storageRef = ref(storage, uuid());

        //     const uploadTask = uploadBytesResumable(storageRef, img);

        //     uploadTask.on(
        //         (error) => {
        //             //TODO:Handle Error
        //         },
        //         () => {
        //             getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        //                 await updateDoc(doc(db, 'chats', data.chatId), {
        //                     messages: arrayUnion({
        //                         id: uuid(),
        //                         text,
        //                         senderId: currentUser.uid,
        //                         date: Timestamp.now(),
        //                         img: downloadURL,
        //                     }),
        //                 });
        //             });
        //         },
        //     );
        // } else {
        //     await updateDoc(doc(db, 'chats', data.chatId), {
        //         messages: arrayUnion({
        //             id: uuid(),
        //             text,
        //             senderId: currentUser?.uid,
        //             date: Timestamp.now(),
        //         }),
        //     });
        // }
        await updateDoc(doc(db, 'chats', data?.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
            }),
        });

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
    };

    const handlePressEnter = () => handleSendMessage();

    return (
        <div className="w-full">
            <form onSubmit={handleSubmitSendMessage(handleSendMessage)} className="flex pt-3 pb-6 mx-4 mt-4 shrink-0">
                <Controller
                    control={controlMessage}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <InputMessage
                                className="p-2 mx-10 bg-white border-none focus-within:shadow-none focus:shadow-none"
                                placeholder="Basic usage"
                                value={text}
                                onChange={(e) => setText(e?.target?.value)}
                                onPressEnter={handlePressEnter}
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
    );
}

export default Input;
