import React, { useState } from 'react';
import { Modal } from 'antd';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

function ShareMailModal(props) {
    const { openModal, onSubmitModal, onCancelModal } = props;
    const [emails, setEmails] = useState([]);
    const navigation = useNavigate();

    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    const handleShareMail = () => {
        return onSubmitModal(emails);
    };
    return (
        <div>
            <Modal
                title="Share for everyone"
                footer={false}
                open={openModal}
                onOk={onSubmitModal}
                onCancel={onCancelModal}
            >
                {Object.entries(userData).length === 0 ? (
                    <div>
                        <div className="mt-2">
                            <p>Please log in to use this feature..</p>
                        </div>
                        <div className="w-[100%] flex items-center justify-center">
                            <button
                                onClick={() => navigation('/login')}
                                className="bg-orange-100 mt-10 border-orange-100 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem] text-white"
                            >
                                LOGIN
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-5">
                        <ReactMultiEmail
                            className="mb-5"
                            placeholder="Input your email"
                            emails={emails}
                            onChange={(_emails) => {
                                setEmails(_emails);
                            }}
                            autoFocus={true}
                            getLabel={(email, index, removeEmail) => {
                                return (
                                    <div data-tag key={index}>
                                        <div data-tag-item>{email}</div>
                                        <span data-tag-handle onClick={() => removeEmail(index)}>
                                            ×
                                        </span>
                                    </div>
                                );
                            }}
                        />
                        <div className="flex items-center w-full">
                            <div className="w-[50%]">
                                <button
                                    onClick={() => handleShareMail()}
                                    disabled={emails.length === 0 ? true : false}
                                    className="bg-orange-100 text-center hover:text-black hover:bg-orange-200 border-orange-100 hover:border-orange-200 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem]"
                                >
                                    Continue
                                </button>
                            </div>
                            <div className="w-[50%]">
                                <button
                                    onClick={() => onCancelModal()}
                                    className="bg-white text-center text-orange-200 border-[1px] border-orange-100 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem] ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default ShareMailModal;
