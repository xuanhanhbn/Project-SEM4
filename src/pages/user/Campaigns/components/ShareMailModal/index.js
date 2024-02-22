import React, { useState } from 'react';
import { Modal } from 'antd';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';

function ShareMailModal(props) {
    const { openModal, onSubmitModal, onCancelModal } = props;
    const [emails, setEmails] = useState([]);
    return (
        <div>
            <Modal
                title="Share for everyone"
                footer={false}
                open={openModal}
                onOk={onSubmitModal}
                onCancel={onCancelModal}
            >
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
                    <button
                        onClick={() => console.log('shareMail', emails)}
                        disabled={emails.length === 0 ? true : false}
                        className="bg-orange-100 text-center hover:text-black hover:bg-orange-200 border-orange-100 hover:border-orange-200 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem]"
                    >
                        Continue
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default ShareMailModal;
