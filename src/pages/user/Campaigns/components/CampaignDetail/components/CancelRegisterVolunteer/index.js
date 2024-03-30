/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

function ModalCancelRegisterVolunteer(props) {
    const { open, handleOk, handleCancel, onDonate } = props;
    const navigation = useNavigate();
    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    // xử lý khi click nút donate
    const handleRegister = (e) => {
        e?.preventDefault();
        handleOk('volunteer');
    };

    return (
        <div id="modalRegister Volunteer">
            <Modal footer={false} open={open} okText="Continue" onOk={handleOk} onCancel={handleCancel}>
                {Object.entries(userData).length === 0 ? (
                    <div>
                        <h3 className="text-base font-bold leading-6 text-center md:text-xl">
                            Cancel Register Volunteer
                        </h3>
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
                    <form>
                        <div>
                            <h3 className="text-base font-bold leading-6 text-center md:text-xl">
                                Cancel Register Volunteer
                            </h3>
                        </div>

                        <div className="my-6 ">
                            <p>
                                Dear <strong>{userData.displayName}</strong>, <br />
                                We have received your request to cancel your volunteer registration for our program. We
                                understand and respect your decision. If you have any further questions or need
                                assistance, please feel free to reach out to us. Thank you for your interest in
                                volunteering with us, and we hope to have the opportunity to collaborate with you in the
                                future. <br /> Best regards, <br />
                                GIVE-AID
                            </p>
                        </div>
                        <div className="flex items-center w-full">
                            <div className="w-[50%]">
                                <button
                                    type="submit"
                                    className="bg-orange-100 text-center text-white hover:bg-orange-200 border-orange-100 hover:border-orange-200 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem]"
                                    onClick={(e) => handleRegister(e)}
                                >
                                    Continue
                                </button>
                            </div>
                            <div className="w-[50%]">
                                <button
                                    type="submit"
                                    className="bg-white text-center text-orange-200 border-[1px] border-orange-100  rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem] ml-2"
                                    onClick={() => handleCancel()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}

export default ModalCancelRegisterVolunteer;
