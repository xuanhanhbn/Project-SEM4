/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

function ModalRegisterVolunteer(props) {
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
    const onSubmit = (data) => onDonate(data);

    return (
        <div id="modalRegister Volunteer">
            <Modal footer={false} open={open} okText="Continue" onOk={handleOk} onCancel={handleCancel}>
                {Object.entries(userData).length === 0 ? (
                    <div>
                        <h3 className="text-base font-bold leading-6 text-center md:text-xl">Register Volunteer</h3>
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
                            <h3 className="text-base font-bold leading-6 text-center md:text-xl">Register Volunteer</h3>
                        </div>

                        <div className="my-6 ">
                            <p>
                                Dear <strong>{userData.displayName}</strong>, <br />
                                We are thrilled to inform you that your application to become a volunteer for our
                                charity program has been accepted! Your dedication and willingness to make a difference
                                in the lives of others are truly commendable.
                                <br />
                                As a volunteer, you will have the opportunity to actively participate in various
                                initiatives aimed at improving the well-being of those in need. Whether it's feeding the
                                homeless, providing education to underprivileged children, or offering support to the
                                elderly, your contribution will undoubtedly have a significant impact on the community.
                                <br />
                                We believe that volunteering not only benefits those we serve but also enriches the
                                lives of the volunteers themselves. Through your involvement, you will have the chance
                                to develop new skills, forge meaningful connections, and experience the joy that comes
                                from helping others.
                                <br /> We are excited to welcome you to our team and look forward to working together to
                                create positive change. Thank you for your commitment to making the world a better
                                place.
                                <br />
                                <strong> Best regards</strong>
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="bg-orange-100 text-center hover:text-black hover:bg-orange-200 border-orange-100 hover:border-orange-200 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem]"
                        >
                            Continue
                        </button>
                    </form>
                )}
            </Modal>
        </div>
    );
}

export default ModalRegisterVolunteer;
