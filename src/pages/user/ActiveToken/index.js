// import React, { useEffect, useRef, useState } from 'react';
// import { getActiveApi } from './callApi';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import './InputCustom.css';
// import { notify } from '~/utils/common';
// import { useParams } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActiveApi } from './callApi';
import { notify } from '~/utils/common';
import { useLocation } from 'react-router-dom';

let currentOTPIndex = 0;

const ActiveAccount = (props) => {
    //State
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);

    const inputRef = useRef(null);
    const { location } = useLocation();

    // Use dataRegister here
    console.log('dataRegister', location);

    const { mutate: mutationGetActive } = useMutation({
        mutationFn: getActiveApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                return notify(data?.data, 'success');
            }
            return notify(data?.message, 'error');
        },
    });

    // xử lý nhập iunput token
    const handleOnChangToken = (e) => {
        const { value } = e.target;
        const newOTP = [...otp];
        newOTP[currentOTPIndex] = value.substring(value.length - 1);

        if (!value) {
            setActiveOTPIndex(currentOTPIndex - 1);
        } else {
            setActiveOTPIndex(currentOTPIndex + 1);
        }
        // const token = newOTP.reduce((acc, curr) => acc + curr, '');

        setOtp(newOTP);
    };

    // xử lý tự động focus input item
    const handleOnKeyDown = (e, index) => {
        currentOTPIndex = index;
        if (e.key === 'Backspace') {
            setActiveOTPIndex(currentOTPIndex - 1);
        }
    };
    const data = {
        code: otp.join(''),
        email: 'duong@gmail.com',
    };
    // xử lý ấn submit confirm button
    const handleSubmitToken = () => {
        mutationGetActive(data);
    };

    // tự động focus input item
    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPIndex]);

    return (
        <div className="py-14">
            <div
                id="input_token"
                className="flex flex-col items-center max-w-xl p-10 m-auto bg-white shadow-2xl rounded-3xl"
            >
                <h1 className="text-2xl font-semibold text-gray-100 ">Account Verification</h1>
                <div className="px-10 text-center">
                    <p className="font-semibold text-gray-500">
                        Enter the verification token you received on your email into the input field below.
                    </p>
                </div>
                {/* render input item */}
                <div className="flex flex-wrap">
                    {otp.map((_, index) => (
                        <div key={index}>
                            <input
                                ref={index === activeOTPIndex ? inputRef : null}
                                type="number"
                                className="input_item spin-button-none"
                                onChange={handleOnChangToken}
                                onKeyDown={(e) => handleOnKeyDown(e, index)}
                                value={otp[index]}
                            />
                            {index !== otp.length - 1 && <span className="w-2 py-0.5 bg-gray-400" />}
                        </div>
                    ))}
                </div>
                {/* check khi nhập full mã otp mới hiển thị button submit */}
                {otp.every((value) => value !== '') ? (
                    <button onClick={() => handleSubmitToken()} className="px-5 py-2 text-white bg-blue-100 rounded-lg">
                        Confirm
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default ActiveAccount;
