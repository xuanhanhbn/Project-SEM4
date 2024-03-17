import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '~/context/AuthContext';

export default function Message(props) {
    const { mess } = props;
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mess]);

    const handleCheckUIDAndReturnClassName = () => {
        if (mess && mess?.senderId !== currentUser?.uid) {
            return 'max-w-xs px-3 py-2 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left bg-gray-700 rounded-3xl break-words';
        }
        return 'float-right max-w-xs px-3 py-2 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left shadow-2xl bg-blue-102 rounded-3xl break-words';
    };

    return (
        <div style={{ clear: 'inline-end' }} ref={ref} className={handleCheckUIDAndReturnClassName()}>
            {mess?.text}
        </div>
    );
}
