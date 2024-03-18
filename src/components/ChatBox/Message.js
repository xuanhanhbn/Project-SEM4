import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '~/context/AuthContext';
import dfAvatar from '~/assets/images/avatar/default-avatar.jpg';

export default function Message(props) {
    const { mess } = props;
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mess]);

    const handleCheckUIDAndReturnClassName = () => {
        if (mess && mess?.senderId !== currentUser?.uid) {
            return 'max-w-[12rem] w-fit  px-3 py-2 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left bg-gray-700 rounded-3xl';
        }
        return 'w-fit bg-blue-100 text-white float-right max-w-[12rem] px-3 py-2 mb-1 overflow-x-hidden overflow-y-hidden font-normal text-left shadow-2xl  rounded-3xl break-words';
    };
    return (
        <div style={{ clear: 'inline-end' }} ref={ref}>
            <div className={handleCheckUIDAndReturnClassName()}>
                {/* <div>
                    {mess && mess?.senderId !== currentUser?.uid ? null : (
                        <img src={dfAvatar} alt="" className="rounded-full  mr- w-7 h-w-7" />
                    )}
                </div> */}
                <div>
                    <p className="my-1 overflow-hidden whitespace-nowrap text-ellipsis ">{mess?.text}</p>
                </div>
            </div>
        </div>
    );
}
