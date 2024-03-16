import React, { useState } from 'react';
import dfAvatar from '~/assets/images/avatar/default-avatar.jpg';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';

function ProfilePage() {
    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );
    console.log('userData: ', userData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="relative flex items-center justify-center px-4 py-20 bg-white lg:h-screen">
            <div className="absolute inset-0">
                <div className="relative">
                    <div className="py-48 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                    <div className="absolute inset-x-0 bottom-0">
                        <img
                            src="https://techzaa.getappui.com/profilecard/assets/images/profile/white-wave.svg"
                            className="w-full rotate-180"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="relative max-w-3xl p-4 mx-auto bg-white border shadow-sm md:p-6 rounded-xl">
                    <div className="grid gap-6 md:grid-cols-5">
                        <div className="flex flex-wrap items-center justify-center order-2 grid-cols-1 md:col-span-2 sm:flex-nowrap md:order-1">
                            <div className="p-4 text-center">
                                <h3 className="text-2xl font-bold text-gray-950">5000$</h3>
                                <p className="mt-1 text-base font-medium text-gray-500">Donate</p>
                            </div>

                            <div className="p-4 text-center">
                                <h3 className="text-2xl font-bold text-gray-950">4,311</h3>
                                <p className="mt-1 text-base font-medium text-gray-500">Joined</p>
                            </div>
                        </div>

                        <div className="order-1 -mt-16 md:order-2">
                            <img
                                src={userData?.avatarUrl ? userData?.avatarUrl?.url : dfAvatar}
                                className="mx-auto rounded-full h-28 w-28"
                                alt=""
                            />
                        </div>

                        <div className="flex items-center justify-center order-3 gap-3 md:col-span-2">
                            <button
                                onClick={() => showModal()}
                                className="inline-block my-6 py-1.5 px-5 rounded-md text-base font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-all duration-500"
                            >
                                Your donation history
                            </button>
                            {/* <button className="inline-block my-6 py-1.5 px-5 rounded-md text-base font-semibold text-white bg-gray-700 hover:bg-gray-900 transition-all duration-500">
                                Message
                            </button> */}
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <h2 className="text-2xl font-semibold text-gray-950">{userData?.displayName}</h2>
                        <p className="mt-1 text-sm font-medium text-gray-500">{userData?.email}</p>

                        <h3 className="my-10 text-lg font-semibold text-gray-800"></h3>

                        <p className="pt-5 text-base font-medium text-gray-500 border-t-2 border-dashed">
                            Every donation, no matter how big or small, has great meaning and contributes to positive
                            changes in the community. Your kindness and generosity are a great source of encouragement
                            for us to continue our mission.
                        </p>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    width={800}
                    style={{
                        top: 0,
                    }}
                    footer={false}
                    title="List Donate"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <div className="p-5 pb-0">
                        <div class="">
                            <div class="">
                                <div class="flow-root">
                                    <div class="divide-y h-[350px] overflow-auto divide-gray-200 dark:divide-gray-700">
                                        <div>
                                            <a
                                                href="/campaign-detail"
                                                target="_blank"
                                                class="flex px-8 py-3 hover:bg-gray-600 rounded-xl items-center space-x-4"
                                            >
                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-medium text-black truncate dark:text-white">
                                                        Help in the Democratic Republic of the Congo
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        Partner name
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-black dark:text-white">
                                                    $320
                                                </div>
                                            </a>
                                        </div>
                                        <div>
                                            <a
                                                href="/campaign-detail"
                                                target="_blank"
                                                class="flex px-8 py-3 hover:bg-gray-600 rounded-xl items-center space-x-4"
                                            >
                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-medium text-black truncate dark:text-white">
                                                        Help in the Democratic Republic of the Congo
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        Partner name
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-black dark:text-white">
                                                    $320
                                                </div>
                                            </a>
                                        </div>
                                        <div>
                                            <a
                                                href="/campaign-detail"
                                                target="_blank"
                                                class="flex px-8 py-3 hover:bg-gray-600 rounded-xl items-center space-x-4"
                                            >
                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-medium text-black truncate dark:text-white">
                                                        Help in the Democratic Republic of the Congo
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        Partner name
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-black dark:text-white">
                                                    $320
                                                </div>
                                            </a>
                                        </div>
                                        <div>
                                            <a
                                                href="/campaign-detail"
                                                target="_blank"
                                                class="flex px-8 py-3 hover:bg-gray-600 rounded-xl items-center space-x-4"
                                            >
                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-medium text-black truncate dark:text-white">
                                                        Help in the Democratic Republic of the Congo
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        Partner name
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-black dark:text-white">
                                                    $320
                                                </div>
                                            </a>
                                        </div>
                                        <div>
                                            <a
                                                href="/campaign-detail"
                                                target="_blank"
                                                class="flex px-8 py-3 hover:bg-gray-600 rounded-xl items-center space-x-4"
                                            >
                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-medium text-black truncate dark:text-white">
                                                        Help in the Democratic Republic of the Congo
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        Partner name
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-black dark:text-white">
                                                    $320
                                                </div>
                                            </a>
                                        </div>
                                        <div>
                                            <a
                                                href="/campaign-detail"
                                                target="_blank"
                                                class="flex px-8 py-3 hover:bg-gray-600 rounded-xl items-center space-x-4"
                                            >
                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-medium text-black truncate dark:text-white">
                                                        Help in the Democratic Republic of the Congo
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        Partner name
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-black dark:text-white">
                                                    $320
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button className="inline-block mt-6 py-1.5 px-5 rounded-md text-base font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-all duration-500">
                                <i className="mr-2 fa-regular fa-download"></i> Download
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default ProfilePage;
