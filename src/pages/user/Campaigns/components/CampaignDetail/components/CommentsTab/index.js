import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import dfAvatar from '~/assets/images/avatar/default-avatar.jpg';

function TabComments() {
    return (
        <div tab="Comments" className="" key="2">
            <div className="h-[25rem] flex flex-col justify-between">
                <div className="flex-grow p-3 mb-3 overflow-auto text-left comment-box">
                    <div className="mb-5 comment-item">
                        <div className="flex user-info">
                            <img src={dfAvatar} alt="" className="mr-3 rounded-full w-7 h-7" />
                            <p className="font-bold">User name</p>
                        </div>
                        <div className="pl-10">
                            <div className="p-3 break-all border shadow-inner comment rounded-xl">.</div>
                        </div>
                    </div>
                    <div className="mb-5 comment-item">
                        <div className="flex user-info">
                            <img src={dfAvatar} alt="" className="mr-3 rounded-full w-7 h-7" />
                            <p className="font-bold">User name</p>
                        </div>
                        <div className="pl-10">
                            <div className="p-3 break-all border shadow-inner comment rounded-xl">
                                đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây là văn
                                bản đây là văn bản đây là văn bản aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 comment-item">
                        <div className="flex user-info">
                            <img src={dfAvatar} alt="" className="mr-3 rounded-full w-7 h-7" />
                            <p className="font-bold">User name</p>
                        </div>
                        <div className="pl-10">
                            <div className="p-3 break-all border shadow-inner comment rounded-xl">
                                đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây là văn
                                bản đây là văn bản đây là văn bản aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 comment-item">
                        <div className="flex user-info">
                            <img src={dfAvatar} alt="" className="mr-3 rounded-full w-7 h-7" />
                            <p className="font-bold">User name</p>
                        </div>
                        <div className="pl-10">
                            <div className="p-3 break-all border shadow-inner comment rounded-xl">
                                đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây là văn
                                bản đây là văn bản đây là văn bản aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 comment-item">
                        <div className="flex user-info">
                            <img src={dfAvatar} alt="" className="mr-3 rounded-full w-7 h-7" />
                            <p className="font-bold">User name</p>
                        </div>
                        <div className="pl-10">
                            <div className="p-3 break-all border shadow-inner comment rounded-xl">
                                đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây là văn bản đây là văn
                                bản đây là văn bản đây là văn bản aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white ">
                    <div>
                        <TextArea
                            placeholder="Add your comment..."
                            className="p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-full"
                        ></TextArea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabComments;
