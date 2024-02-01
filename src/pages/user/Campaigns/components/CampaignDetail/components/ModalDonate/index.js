import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import './ModalDonate.css';
import { Link } from 'react-router-dom';
import { inputValueDonate } from './data';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    amount: Yup.string().required('Donate value is required'),
});

function ModalDonate(props) {
    const { open, handleOk, handleCancel } = props;

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            paymentMethod: 'PAYPAL', // Set default payment method
        },
    });

    // STATE
    const [donateValue, setDonateValue] = useState('4.9');
    const [donateType, setDonateType] = useState('PAYPAL');

    // set value và type donate mặc định
    useEffect(() => {
        setValue('amount', 4.9);
    }, []);

    // xử lý khi chọn value donate mặc định
    const getValueDonate = (data) => {
        setDonateValue(data);
    };

    // xử lý khi click nút donate
    const onSubmit = (data) => {
        console.log('data: ', data);
    };

    const dollarUSLocale = Intl.NumberFormat('en-US');

    // reander input, radio, button donate
    const RENDER_INPUT = (input) => {
        if (input.type === 'BUTTON') {
            return (
                <div key={input.id} id="buton_donate" className="w-2/6 ">
                    <Link
                        to=""
                        onFocus={() => {
                            getValueDonate(input.value);
                            setValue('amount', input.value);
                        }}
                        className={donateValue === input?.value ? 'active_btn' : 'noactive'}
                    >
                        $ {input.value}
                    </Link>
                </div>
            );
        }

        if (input.type === 'INPUT') {
            return (
                <div id="input_donate" key={input.id} className="w-4/6">
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Input
                                    maxLength={9}
                                    placeholder="Other amount"
                                    className="input"
                                    onChange={(e) => {
                                        onChange(e.target.value.replace(/[^0-9]/g, ''));
                                        setDonateValue(e.target.value.replace(/[^0-9]/g, ''));
                                    }}
                                    value={value}
                                />
                            );
                        }}
                        name="amount"
                    />
                    <div className="h-6 ml-2 text-red-600">{errors.value?.message}</div>
                </div>
            );
        }

        if (input.type === 'RADIO') {
            return (
                <div key={input.id} id="btn_type_donate" className="w-full md:w-1/2 ">
                    <Link
                        to=""
                        className={
                            donateType === input?.value
                                ? 'type_checkout_btn bg-red-100 border-red-200'
                                : 'type_checkout_btn'
                        }
                        // bg-red-100 border-red-200
                        onClick={() => {
                            setDonateType(input.value);
                            setValue('paymentMethod', input.value);
                        }}
                        value={input.value}
                    >
                        <img src={input.icon} alt="" className="w-10 mr-3" />
                        {input.label}
                    </Link>
                </div>
            );
        }
    };

    return (
        <div id="modalDonate">
            <Modal footer={false} open={open} okText="Continue" onOk={handleOk} onCancel={handleCancel}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h3 className="text-base font-bold leading-6 text-center md:text-xl">Donate</h3>
                    </div>
                    <div className="mt-6 text-center">
                        <span className="relative text-4xl font-bold leading-5 text-blue-100 ">
                            $ {dollarUSLocale.format(donateValue)}
                        </span>
                    </div>
                    <div className="my-6 ">
                        <div className="flex flex-wrap m-[-.375rem_-.25rem]">
                            {/* render input and buton donate */}
                            {inputValueDonate.map((input) => RENDER_INPUT(input))}
                        </div>
                    </div>
                    <div></div>
                    <button
                        type="submit"
                        className="bg-orange-100 text-center hover:text-black hover:bg-orange-200 border-orange-100 hover:border-orange-200 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem]"
                    >
                        Continue
                    </button>
                    <div className="mt-4 text-xs leading-5 text-center">
                        <p>
                            <Link className="text-blue-100">How is my donation used?</Link> By donating you are agreeing
                            to our Privacy Policy and Terms of Use.
                        </p>
                        <p>
                            Donations are tax-deductible in several countries. Find out more in our{' '}
                            <Link className="text-blue-100">FAQs</Link>.
                        </p>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ModalDonate;
