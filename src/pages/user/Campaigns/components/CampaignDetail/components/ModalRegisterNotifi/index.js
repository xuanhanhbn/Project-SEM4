/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

function ModalRegisterNotifi(props) {
    const { open, handleOk, handleCancel } = props;
    const navigation = useNavigate();

    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    // xử lý khi click nút register
    const handleRegister = (e) => {
        e?.preventDefault();
        handleOk('subscribe');
    };

    return (
        <div id="modalRegister Notifi">
            <Modal footer={false} open={open} okText="Continue" onOk={handleOk} onCancel={handleCancel}>
                {Object.entries(userData).length === 0 ? (
                    <div>
                        <h3 className="text-base font-bold leading-6 text-center md:text-xl">Register Notifi</h3>
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
                                Register Notification
                            </h3>
                        </div>

                        <div className="my-6 ">
                            <p>
                                By opting in to receive notifications, you'll stay up-to-date with all the latest
                                updates, news, and events related to our programs.
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
                                    className="bg-white text-center text-orange-200 border-[1px] ml-2 border-orange-200 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem]"
                                    onClick={(e) => handleCancel(e)}
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

export default ModalRegisterNotifi;
