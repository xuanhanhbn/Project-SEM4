import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { ChatContext } from '~/context/ChatContext';

export default function MessageAdmin(props) {
    const { mess } = props;
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mess]);

    const handleCheckUIDAndReturnClassName = () => {
        if (mess && mess?.senderId === currentUser?.uid) {
            return 'float-right w-fit max-w-xl px-3 py-2 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-right shadow-2xl bg-blue-102 rounded-3xl break-words';
        }
        return 'max-w-xl w-fit px-3 py-2 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left bg-white shadow-2xl rounded-3xl break-words';
    };

    return (
        <div style={{ clear: 'inline-end' }} ref={ref} className={handleCheckUIDAndReturnClassName()}>
            <p className="my-1">{mess?.text}</p>
        </div>
    );
}
