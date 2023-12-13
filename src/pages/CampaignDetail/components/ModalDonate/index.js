import { Modal } from 'antd';
import React, { useState } from 'react';
import './ModalDonate.css';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { inputValueDonate } from './data';

function ModalDonate(props) {
    const { open, handleOk, handleCancel } = props;
    const [donateValue, setDonateValue] = useState('0');

    return (
        <div id="modal">
            <Modal open={open} okText="Continue" onOk={handleOk} onCancel={handleCancel}>
                <form>
                    <div>
                        <h3 className="text-base font-bold leading-6 text-center md:text-xl">Donate</h3>
                    </div>
                    <div className="mt-6 text-center">
                        <span className="relative text-4xl font-bold leading-5 text-blue-100 ">$ {donateValue}</span>
                    </div>
                    <div className="my-6 ">
                        <div className="flex flex-wrap m-[-.375rem_-.25rem]">
                            <div className="w-2/6 ">
                                <Link
                                    to=""
                                    className="m-[.375rem_.25rem] block focus:bg-blue-400 focus:text-white rounded-lg border-[.0625rem]  text-base leading-[2.875rem] min-h-[3rem] text-center "
                                >
                                    $ 4.90
                                </Link>
                            </div>
                            <div className="w-2/6 ">
                                <Link
                                    to=""
                                    params={{ testvalue: '4.90' }}
                                    className="m-[.375rem_.25rem] block focus:bg-blue-400 focus:text-white rounded-lg border-[.0625rem]  text-base leading-[2.875rem] min-h-[3rem] text-center "
                                >
                                    $ 4.90
                                </Link>
                            </div>
                            <div className="w-2/6 ">
                                <Link
                                    to=""
                                    className="m-[.375rem_.25rem] block focus:bg-blue-400 focus:text-white rounded-lg border-[.0625rem]  text-base leading-[2.875rem] min-h-[3rem] text-center "
                                >
                                    $ 4.90
                                </Link>
                            </div>
                            <div className="w-2/6 ">
                                <Link
                                    to=""
                                    className="m-[.375rem_.25rem] block focus:bg-blue-400 focus:text-white rounded-lg border-[.0625rem]  text-base leading-[2.875rem] min-h-[3rem] text-center "
                                >
                                    $ 4.90
                                </Link>
                            </div>
                            <div className="w-4/6">
                                <input
                                    placeholder="Other amount"
                                    maxLength="11"
                                    className="m-[.375rem_.25rem] placeholder:text-gray-100 bg-gray-400 border-gray-400 rounded-lg leading-[3rem] text-base text-black font-normal py-3 px-6 w-full h-12 "
                                />
                            </div>
                        </div>
                    </div>
                    <Link
                        type="submit"
                        className="bg-orange-100 text-center hover:text-black hover:bg-orange-200 border-orange-100 hover:border-orange-200 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem]"
                    >
                        Continue
                    </Link>
                </form>
            </Modal>
        </div>
    );
}

export default ModalDonate;
