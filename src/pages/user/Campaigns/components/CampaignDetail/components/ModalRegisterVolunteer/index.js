/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
// import './ModalRegisterVolunteer.css';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';

const validationSchema = Yup.object().shape({
    amount: Yup.string().required('Donate value is required'),
});

function ModalRegisterVolunteer(props) {
    const { open, handleOk, handleCancel, onDonate } = props;

    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            paymentMethod: 'Paypal', // Set default payment method
        },
    });

    // STATE
    const [donateValue, setDonateValue] = useState('5');
    const [donateType, setDonateType] = useState('Paypal');

    // set value và type donate mặc định
    useEffect(() => {
        setValue('amount', 5);
    }, []);

    // xử lý khi chọn value donate mặc định
    const getValueDonate = (data) => {
        setDonateValue(data);
    };

    // xử lý khi click nút donate
    const onSubmit = (data) => onDonate(data);

    const dollarUSLocale = Intl.NumberFormat('en-US');

    // reander input, radio, button donate

    return (
        <div id="modalRegister Volunteer">
            <Modal footer={false} open={open} okText="Continue" onOk={handleOk} onCancel={handleCancel}>
                {Object.entries(userData).length === 0 ? (
                    <div>
                        <h3 className="text-base font-bold leading-6 text-center md:text-xl">Register Volunteer</h3>
                        <div className="mt-2">
                            <p>Please log in to use this feature..</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
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
