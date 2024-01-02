import { Modal } from 'antd';
import React from 'react';
import './ModalTypeDonate.css';
import { Tabs } from 'antd';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const paypalIcon = <i className="fa-brands fa-cc-paypal"></i>;
const qrIcon = <i className="fa-regular fa-qrcode"></i>;

const dollarUSLocale = Intl.NumberFormat('en-US');

// xử lý khi chuyển tab phương thức thanh toán
const onChangeTabs = (key) => {
    console.log(key);
};

// render giao diện thanh toán paypal

const PaypalUi = (props) => {
    const { donateValue, editValue } = props;

    function createOrder() {
        // replace this url with your server
        return fetch('https://react-paypal-js-storybook.fly.dev/api/paypal/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                donate_details: [
                    {
                        sku: 'etanod01',
                        quantity: 1,
                    },
                ],
            }),
        })
            .then((response) => response.json())
            .then((order) => {
                // Your code here after create the order
                return order.id;
            });
    }
    function onApprove(data) {
        // replace this url with your server
        return fetch('https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        })
            .then((response) => response.json())
            .then((orderData) => {
                // Your code here after capture the order
            });
    }

    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center ">
                <div>
                    <h3 className="text-base font-bold leading-6 text-center md:text-xl">Donate</h3>
                </div>
                <div className="flex items-center justify-center mt-6 mb-4 text-center">
                    <span className="relative text-4xl font-bold leading-5 text-blue-100 ">
                        $ {dollarUSLocale.format(donateValue)}
                    </span>
                    <button onClick={editValue} className="ml-2 text-3xl text-blue-100">
                        <i className="fa-sharp fa-solid fa-pen"></i>
                    </button>
                </div>
                <p className="text-sm leading-6 text-gray-100 md:text-base md:mb-8">Give emergency aid in Palestine</p>
            </div>
            <div className="mt-5">
                <PayPalScriptProvider options={{ clientId: 'test' }}>
                    <PayPalButtons
                        style={{ layout: 'horizontal', tagline: false }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    );
};

// render giao diện thanh toán chuyển khoản, qr

const BankingUi = (props) => {
    const { donateValue, editValue } = props;
    return (
        <div>
            <div>
                <h3 className="text-base font-bold leading-6 text-center md:text-xl">Donate</h3>
            </div>
            <div className="flex items-center justify-center mt-6 text-center">
                <span className="relative text-4xl font-bold leading-5 text-blue-100 ">
                    $ {dollarUSLocale.format(donateValue)}
                </span>
                <button onClick={editValue} className="ml-2 text-3xl text-blue-100">
                    <i className="fa-sharp fa-solid fa-pen"></i>
                </button>
            </div>
        </div>
    );
};

function ModalTypeDonate(props) {
    const { openModalType, handleSubmitModalType, handleCancelModalType, donateValue } = props;

    const items = [
        {
            key: 'paypal',
            label: <div className="md:text-xl">Paypal {paypalIcon}</div>,
            children: <PaypalUi editValue={handleCancelModalType} donateValue={donateValue} />,
        },
        {
            key: 'banking',
            label: <div className="md:text-xl">Credit or debit card {qrIcon}</div>,
            children: <BankingUi editValue={handleCancelModalType} donateValue={donateValue} />,
        },
    ];
    return (
        <div id="modalType">
            <Modal open={openModalType} onOk={handleSubmitModalType} onCancel={handleCancelModalType}>
                <div>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChangeTabs} />
                </div>
            </Modal>
        </div>
    );
}

export default ModalTypeDonate;
