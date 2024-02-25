import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { ChatContext } from '~/context/ChatContext';

export default function Message(props) {
    const { mess } = props;
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mess]);

    const handleCheckUIDAndReturnClassName = () => {
        if (mess && mess?.senderId === currentUser?.uid) {
            return 'float-right max-w-[12rem] px-3 py-2  mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left text-white bg-blue-500 rounded-3xl break-words ';
        }
    };

    return (
        <div
            style={{ clear: 'inline-end' }}
            ref={ref}
            className="float-right max-w-[12rem] px-3 py-2  mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left text-white bg-blue-500 rounded-3xl break-words 	"
        >
            {mess?.text}
        </div>
    );
}
