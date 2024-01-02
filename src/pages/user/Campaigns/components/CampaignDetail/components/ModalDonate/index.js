import { Input, Modal, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import './ModalDonate.css';
import { Link } from 'react-router-dom';
import { inputValueDonate } from './data';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import ModalTypeDonate from '../ModalTypeDonate';

const validationSchema = Yup.object().shape({
    value: Yup.string().required('Donate value is required'),
});

function ModalDonate(props) {
    const { open, handleOk, handleCancel } = props;

    // state
    // const [isOpenModalType, setIsOpenModalType] = useState(false);
    const [donateValue, setDonateValue] = useState('4.9');

    // xử lý open modal
    // const showModalType = () => {
    //     donateValue && setIsOpenModalType(true);
    // };

    // xử lý khi click submit modal
    // const handleSubmitModalType = () => {
    //     setIsOpenModalType(false);
    //     console.log('click ok btn');
    // };

    // xử lý khi click đóng modal
    // const handleCancelModalType = () => {
    //     setIsOpenModalType(false);
    // };

    //useEffect
    useEffect(() => {
        setValue('value', 4.9);
        setValue('donate_type', 'paypal');
    }, []);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // xử lý khi chọn value donate mặc định
    const getValueDonate = (data) => {
        setDonateValue(data);
    };

    // xử lý khi click nút donate
    const onSubmit = (data) => {
        console.log('data: ', data);
    };

    const dollarUSLocale = Intl.NumberFormat('en-US');

    const renderInput = (input) => {
        if (input.type === 'button') {
            return (
                <div key={input.id} id="buton_donate" className="w-2/6 ">
                    <Link
                        to=""
                        onFocus={() => {
                            getValueDonate(input.value);
                            setValue('value', input.value);
                        }}
                        className={donateValue === input?.value ? 'active_btn' : 'noactive'}
                    >
                        $ {input.value}
                    </Link>
                </div>
            );
        }

        if (input.type === 'input') {
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
                        name="value"
                    />
                    <div className="h-6 ml-2 text-red-600">{errors.value?.message}</div>
                </div>
            );
        }

        if (input.type === 'radio') {
            return (
                <div key={input.id} className="w-4/6">
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Radio.Group onChange={onChange} defaultValue={'paypal'} value={value}>
                                    <Space direction="horizontal">
                                        <Radio value={input.value}>{input.label}</Radio>
                                    </Space>
                                </Radio.Group>
                            );
                        }}
                        name="donate_type"
                    />
                </div>
            );
        }
    };

    return (
        <div id="modal">
            <Modal open={open} okText="Continue" onOk={handleOk} onCancel={handleCancel}>
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
                            {inputValueDonate.map((input) => renderInput(input))}
                        </div>
                    </div>
                    <div></div>
                    <button
                        type="submit"
                        // onClick={showModalType}
                        className="bg-orange-100 text-center hover:text-black hover:bg-orange-200 border-orange-100 hover:border-orange-200 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem]"
                    >
                        Continue
                    </button>
                </form>
            </Modal>

            {/* mở modal donate type */}
            {/* {isOpenModalType && (
                <ModalTypeDonate
                    openModalType={isOpenModalType}
                    handleSubmitModalType={handleSubmitModalType}
                    handleCancelModalType={handleCancelModalType}
                    donateValue={donateValue}
                />
            )} */}
        </div>
    );
}

export default ModalDonate;
