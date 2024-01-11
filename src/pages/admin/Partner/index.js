import { Button, Modal, Pagination, Popconfirm, message } from 'antd';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Partner.css';
import FormAddPartner from '~/components/Form/FormAddPartner';

let dataFake = [
    {
        id: 1,
        name: 'Partner 1',
        email: 'test1@gmail.com',
        paymentMethod: 'paymentMethod1',
        description: 'description1',

        image: ['/logo192.png'],
    },
    {
        id: 2,
        name: 'Partner 2',
        email: 'test2@gmail.com',
        paymentMethod: 'paymentMethod2',
        image: ['/logo192.png'],
        description: 'description1',
    },
    {
        id: 3,
        name: 'Partner 3',
        email: 'test3@gmail.com',
        paymentMethod: 'paymentMethod3',
        description: 'description2',
        image: ['/logo192.png'],
    },
];

function Partner() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [valueEdit, setValueEdit] = useState({});

    const showModal = (item = {}) => {
        setValueEdit(item);
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setValueEdit({});
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            message.success('Add Success');
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setValueEdit({});
        setOpen(false);
    };

    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return (
        <div className="px-[20px] w-full pt-[20px]">
            <Modal
                title="Thêm Partner"
                open={open}
                onOk={handleOk}
                width={900}
                centered
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <FormAddPartner valueEdit={valueEdit}></FormAddPartner>
            </Modal>

            <nav className="flex items-center gap-2 text-[#262b3f]">
                <svg width="20" height="16" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21.125 7.87352V1.4375H17.0625V4.40566L13 0.625L0 12.8125H3.25V23.375H10.5625V15.25H15.4375V23.375H22.75V12.8125H26L21.125 7.87352Z"
                        fill="black"
                    />
                </svg>

                <svg width="8" height="14" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.75 1.5L8.25 8L1.75 14.5" stroke="black" stroke-width="2.16667" />
                </svg>

                <NavLink to={'/admin'} className={'font-semibold'}>
                    Dashboard
                </NavLink>

                <svg width="8" height="14" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.75 1.5L8.25 8L1.75 14.5" stroke="black" stroke-width="2.16667" />
                </svg>

                <NavLink to={'/admin/partner'} className={'font-semibold '}>
                    Partner
                </NavLink>
            </nav>
            <h1 className="mt-3 text-xl font-bold">Partner</h1>
            <div className="flex items-center justify-end gap-3">
                <div className="w-[20%]">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">
                        Search
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                class="w-4 h-4 text-gray-500 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none placeholder:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos..."
                            required
                        />
                    </div>
                </div>

                <Button
                    type="primary"
                    className="bg-blue-500 h-[36px]"
                    onClick={() => {
                        showModal({});
                    }}
                >
                    Thêm Partner
                </Button>

                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.0127 8.91759C10.2535 8.91759 9.54256 9.21212 9.00428 9.7504C8.46854 10.2887 8.17147 10.9996 8.17147 11.7588C8.17147 12.518 8.46854 13.2289 9.00428 13.7672C9.54256 14.3029 10.2535 14.6 11.0127 14.6C11.7719 14.6 12.4828 14.3029 13.0211 13.7672C13.5568 13.2289 13.8539 12.518 13.8539 11.7588C13.8539 10.9996 13.5568 10.2887 13.0211 9.7504C12.7582 9.48547 12.4452 9.27542 12.1005 9.13245C11.7557 8.98948 11.3859 8.91645 11.0127 8.91759ZM21.4812 14.8971L19.8207 13.4777C19.8994 12.9953 19.94 12.5027 19.94 12.0127C19.94 11.5227 19.8994 11.0276 19.8207 10.5477L21.4812 9.12833C21.6067 9.02095 21.6965 8.87792 21.7386 8.71827C21.7808 8.55862 21.7734 8.38991 21.7174 8.23458L21.6945 8.16857C21.2375 6.89063 20.5528 5.70607 19.6734 4.67228L19.6277 4.61896C19.5209 4.49341 19.3786 4.40315 19.2195 4.36009C19.0604 4.31703 18.892 4.32319 18.7365 4.37775L16.6748 5.11154C15.9131 4.48693 15.065 3.99435 14.1459 3.65157L13.7472 1.49591C13.7172 1.33352 13.6384 1.18412 13.5214 1.06757C13.4044 0.95101 13.2547 0.872816 13.0922 0.843372L13.0236 0.830676C11.7033 0.592004 10.3119 0.592004 8.99158 0.830676L8.92303 0.843372C8.76052 0.872816 8.61082 0.95101 8.49381 1.06757C8.3768 1.18412 8.29803 1.33352 8.26795 1.49591L7.86678 3.66173C6.95634 4.00724 6.10821 4.49862 5.35565 5.11661L3.27869 4.37775C3.12322 4.32276 2.95468 4.31638 2.7955 4.35946C2.63631 4.40255 2.494 4.49306 2.38748 4.61896L2.34178 4.67228C1.46401 5.70717 0.779421 6.89144 0.320685 8.16857L0.297833 8.23458C0.183576 8.55197 0.277521 8.90743 0.533966 9.12833L2.21483 10.5629C2.13611 11.0402 2.09803 11.5277 2.09803 12.0102C2.09803 12.4977 2.13611 12.9852 2.21483 13.4574L0.539044 14.892C0.413604 14.9994 0.323824 15.1424 0.281644 15.3021C0.239464 15.4617 0.246882 15.6304 0.302911 15.7858L0.325763 15.8518C0.785333 17.1289 1.46326 18.3096 2.34686 19.3481L2.39256 19.4014C2.49934 19.5269 2.64165 19.6172 2.80075 19.6602C2.95984 19.7033 3.12825 19.6971 3.28377 19.6426L5.36072 18.9037C6.11736 19.5258 6.96033 20.0184 7.87186 20.3586L8.27303 22.5244C8.3031 22.6868 8.38188 22.8362 8.49889 22.9528C8.6159 23.0693 8.7656 23.1475 8.92811 23.177L8.99666 23.1897C10.33 23.4296 11.6954 23.4296 13.0287 23.1897L13.0972 23.177C13.2598 23.1475 13.4095 23.0693 13.5265 22.9528C13.6435 22.8362 13.7223 22.6868 13.7523 22.5244L14.151 20.3688C15.0701 20.0234 15.9181 19.5334 16.6799 18.9088L18.7416 19.6426C18.8971 19.6976 19.0656 19.704 19.2248 19.6609C19.384 19.6178 19.5263 19.5273 19.6328 19.4014L19.6785 19.3481C20.5621 18.3045 21.24 17.1289 21.6996 15.8518L21.7224 15.7858C21.8316 15.4709 21.7377 15.118 21.4812 14.8971ZM11.0127 16.2225C8.54725 16.2225 6.54901 14.2242 6.54901 11.7588C6.54901 9.29337 8.54725 7.29513 11.0127 7.29513C13.4781 7.29513 15.4763 9.29337 15.4763 11.7588C15.4763 14.2242 13.4781 16.2225 11.0127 16.2225Z"
                        fill="black"
                    />
                </svg>
            </div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table class="w-full text-sm text-left rtl:text-right">
                    <thead class="text-xs text-black uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="px-6 py-3 ">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Payment Method
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataFake?.length > 0 &&
                            dataFake?.map((item, index) => (
                                <tr
                                    key={index}
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.id}
                                    </td>
                                    <td class="px-6 py-4">{item?.name}</td>
                                    <td class="px-6 py-4">{item?.email}</td>
                                    <td class="px-6 py-4">{item?.paymentMethod}</td>

                                    <td class="px-6 py-4" className="">
                                        <p className="flex gap-2">
                                            <Button
                                                onClick={() => {
                                                    showModal(item);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Popconfirm
                                                title="Delete the task"
                                                description="Are you sure to delete this task?"
                                                onConfirm={confirm}
                                                onCancel={cancel}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button danger>Delete</Button>
                                            </Popconfirm>
                                        </p>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <nav class="flex justify-end p-4" aria-label="Table navigation">
                    <Pagination defaultCurrent={1} total={50} />
                </nav>
            </div>
        </div>
    );
}

export default Partner;
