import React from 'react';

import './Billing.css';
import masterCard from '~/assets/images/logo/mastercard.png';
import visaCard from '~/assets/images/logo/visa.png';
import bgCard from '~/assets/images/logo/curved14.jpg';
import { paymentMethodData } from './constants';

function BillingPage() {
    // render thẻ hiển thị tổng tiền nhận qua paypal và card theo tháng
    const RENDER_METHOD_CARD = (item) => {
        return (
            <div id="payment_method" key={item.id}>
                <div className="box_payment_method">
                    <div className="payment_mt_header">
                        <div className="payment_method_icon">{item.icon}</div>
                    </div>
                    <div className="flex-auto p-4 pt-0 text-center">
                        <h6 className="mb-0 text-center">{item.methodName}</h6>
                        <span className="text-xs leading-tight">{item.methodTitle}</span>
                        <hr className="line_card" />
                        <h5 className="mb-0">${item.amount}</h5>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div id="billing_page">
            <div className="w-full px-6 py-6 mx-auto">
                {/* <!-- content --> */}

                <div className="flex flex-wrap -mx-3">
                    <div className="max-w-full px-3 lg:w-7/12 lg:flex-none">
                        <div className="flex flex-wrap -mx-3">
                            {/* <div className="w-full max-w-full px-3 mb-4 xl:mb-0 xl:w-1/2 xl:flex-none">
                                <div className="create_card">
                                    <div
                                        style={{
                                            backgroundImage: `url(${bgCard})`,
                                        }}
                                        className="relative overflow-hidden rounded-2xl"
                                    >
                                        <div className="relative z-10 flex-auto p-4">
                                            <i className="p-2 text-white fas fa-wifi"></i>
                                            <h5 className="pb-2 mt-6 mb-12 text-white">4562 1122 4594 7852</h5>
                                            <div className="flex">
                                                <div className="flex">
                                                    <div className="mr-6">
                                                        <p className="mb-0 text-sm leading-normal text-white opacity-80">
                                                            Card Holder
                                                        </p>
                                                        <h6 className="mb-0 text-white">Jack Peterson</h6>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 text-sm leading-normal text-white opacity-80">
                                                            Expires
                                                        </p>
                                                        <h6 className="mb-0 text-white">11/22</h6>
                                                    </div>
                                                </div>
                                                <div className="flex items-end justify-end w-1/5 ml-auto">
                                                    <img className="w-3/5 mt-2" src={masterCard} alt="logo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="w-full max-w-full px-3 xl:flex-none">
                                <div className="flex flex-wrap -mx-3">
                                    {paymentMethodData.map((data) => RENDER_METHOD_CARD(data))}
                                </div>
                            </div>
                            {/* <div className="max-w-full px-3 mb-4 lg:mb-0 lg:w-full lg:flex-none">
                                <div className="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 border-transparent border-solid shadow-md shadow-soft-xl rounded-2xl bg-clip-border">
                                    <div className="p-4 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                        <div className="flex flex-wrap -mx-3">
                                            <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                                                <h6 className="mb-0">Payment Method</h6>
                                            </div>
                                            <div className="flex-none w-1/2 max-w-full px-3 text-right">
                                                <button className="inline-block px-6 py-3 text-xs font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-gray-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25">
                                                    <i className="fas fa-plus"> </i>&nbsp;&nbsp;Add New Card
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap -mx-3">
                                            <div className="max-w-full px-3 mb-6 md:mb-0 md:w-1/2 md:flex-none">
                                                <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none rounded-xl border-slate-100 bg-clip-border">
                                                    <img className="h-6 mb-0 mr-4" src={masterCard} alt="logo" />
                                                    <h6 className="mb-0">
                                                        ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852
                                                    </h6>
                                                    <i
                                                        className="ml-auto cursor-pointer fas fa-pencil-alt text-slate-700"
                                                        data-target="tooltip_trigger"
                                                        data-placement="top"
                                                    ></i>
                                                    <div
                                                        data-target="tooltip"
                                                        className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                                                    >
                                                        Edit Card
                                                        <div
                                                            className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                                            data-popper-arrow
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                                                <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none rounded-xl border-slate-100 bg-clip-border">
                                                    <img className="h-6 mb-0 mr-4" src={visaCard} alt="logo" />
                                                    <h6 className="mb-0">
                                                        ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;5248
                                                    </h6>
                                                    <i
                                                        className="ml-auto cursor-pointer fas fa-pencil-alt text-slate-700"
                                                        data-target="tooltip_trigger"
                                                        data-placement="top"
                                                    ></i>
                                                    <div
                                                        data-target="tooltip"
                                                        className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                                                    >
                                                        Edit Card
                                                        <div
                                                            className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                                            data-popper-arrow
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
                        <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-md shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="p-4 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                <div className="flex flex-wrap -mx-3">
                                    <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                                        <h6 className="mb-0">Project competed</h6>
                                    </div>
                                    <div className="flex-none w-1/2 max-w-full px-3 text-right">
                                        <button className="inline-block px-8 py-2 mb-0 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-fuchsia-500 text-fuchsia-500 hover:opacity-75">
                                            View All
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-auto p-4 pb-0">
                                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                                        <div className="flex flex-col">
                                            <h6 className="mb-1 text-sm font-semibold leading-normal text-slate-700">
                                                Project name
                                            </h6>
                                            <span className="text-xs leading-tight">#MS-415646</span>
                                        </div>
                                        <div className="flex items-center text-sm leading-normal">
                                            $18000
                                            <button className="inline-block px-0 py-3 mb-0 ml-6 text-sm font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700">
                                                <i className="mr-1 text-lg fas fa-file-pdf"></i> PDF
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 mt-6 md:w-7/12 md:flex-none">
                        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-md shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                                <h6 className="mb-0">Billing Information</h6>
                            </div>
                            <div className="flex-auto p-4 pt-6">
                                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li className="relative flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
                                        <div className="flex flex-col">
                                            <h6 className="mb-4 text-sm leading-normal">Oliver Liam</h6>
                                            <span className="mb-2 text-xs leading-tight">
                                                Company Name:
                                                <span className="font-semibold text-slate-700 sm:ml-2">
                                                    Viking Burrito
                                                </span>
                                            </span>
                                            <span className="mb-2 text-xs leading-tight">
                                                Email Address:
                                                <span className="font-semibold text-slate-700 sm:ml-2">
                                                    oliver@burrito.com
                                                </span>
                                            </span>
                                            <span className="text-xs leading-tight">
                                                VAT Number:
                                                <span className="font-semibold text-slate-700 sm:ml-2">FRB1235476</span>
                                            </span>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <button className="relative z-10 inline-block px-4 py-3 mb-0 text-xs font-bold text-center text-transparent uppercase align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in bg-150 bg-gradient-to-tl from-red-600 to-rose-400 hover:scale-102 active:opacity-85 bg-x-25 bg-clip-text">
                                                <i className="mr-2 far fa-trash-alt bg-150 bg-gradient-to-tl from-red-600 to-rose-400 bg-x-25 bg-clip-text"></i>
                                                Delete
                                            </button>
                                            <button className="inline-block px-4 py-3 mb-0 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in bg-150 hover:scale-102 active:opacity-85 bg-x-25 text-slate-700">
                                                <i
                                                    className="mr-2 fas fa-pencil-alt text-slate-700"
                                                    aria-hidden="true"
                                                ></i>
                                                Edit
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-full px-3 mt-6 md:w-5/12 md:flex-none">
                        <div className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white border-0 shadow-md shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                                <div className="flex flex-wrap -mx-3">
                                    <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                                        <h6 className="mb-0">List Donate</h6>
                                    </div>
                                    <div className="flex items-center justify-end max-w-full px-3 md:w-1/2 md:flex-none">
                                        <i className="mr-2 far fa-calendar-alt"></i>
                                        <small>23 - 30 March 2020</small>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-auto p-4 pt-6">
                                <h6 className="mb-4 text-xs font-bold leading-tight uppercase text-slate-500">
                                    Newest
                                </h6>
                                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 border-t-0 rounded-b-inherit text-inherit rounded-xl">
                                        <div className="flex items-center">
                                            <div className="flex flex-col">
                                                <h6 className="mb-1 text-sm leading-normal text-slate-700">
                                                    Project Name
                                                </h6>
                                                <span className="text-xs leading-tight">
                                                    27 March 2020, at 04:30 AM
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="relative z-10 inline-block m-0 text-sm font-semibold leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 bg-clip-text">
                                                + $ 2,000
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <h6 className="my-4 text-xs font-bold leading-tight uppercase text-slate-500">
                                    Yesterday
                                </h6>
                                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                                        <div className="flex items-center">
                                            <div className="flex flex-col">
                                                <h6 className="mb-1 text-sm leading-normal text-slate-700">
                                                    Project name
                                                </h6>
                                                <span className="text-xs leading-tight">
                                                    26 March 2020, at 13:45 PM
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="relative z-10 inline-block m-0 text-sm font-semibold leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 bg-clip-text">
                                                + $ 750
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillingPage;
