/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-mixed-operators */
import { useMutation } from '@tanstack/react-query';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import dfAvatar from '~/assets/images/avatar/default-avatar.jpg';
import { notify } from '~/utils/common';
import { getAllFeedbackProgram, onEditFeedbackProgram, onFeedbackProgram, onRemoveFeedbackProgram } from './callApi';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';

function TabComments(props) {
    const { dataDetail } = props;
    const [dataFeedback, setDataFeedback] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [feedbackId, setFeedbackId] = useState('');
    const [isOpenModalRemove, setIsOpenModalRemove] = useState(false);

    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );
    useEffect(() => {
        if (dataDetail && dataDetail?.programId) {
            getAllFeedback({ programId: dataDetail?.programId });
        }
    }, [dataDetail]);

    const { mutate: getAllFeedback } = useMutation({
        mutationFn: getAllFeedbackProgram,
        onSuccess: (res) => {
            if (res && res?.status == 200) {
                return setDataFeedback(res?.data);
            }
            return notify('error', 'error');
        },
    });

    const { mutate: feedbackProgram } = useMutation({
        mutationFn: onFeedbackProgram,
        onSuccess: (res) => {
            if ((res && res?.status == 200) || res?.status == 201) {
                setInputValue('');
                return getAllFeedback({ programId: dataDetail?.programId });
            }
            return notify('error', 'error');
        },
    });

    const { mutate: editFeedbackProgram } = useMutation({
        mutationFn: onEditFeedbackProgram,
        onSuccess: (res) => {
            if ((res && res?.status == 200) || res?.status == 201) {
                setInputValue('');
                return getAllFeedback({ programId: dataDetail?.programId });
            }
            return notify('error', 'error');
        },
    });

    const { mutate: removeFeedbackProgram } = useMutation({
        mutationFn: onRemoveFeedbackProgram,
        onSuccess: (res) => {
            if ((res && res?.status == 200) || res?.status == 201) {
                handleCancel();
                return getAllFeedback({ programId: dataDetail?.programId });
            }
            return notify('error', 'error');
        },
    });
    const handleRemove = () => {
        return removeFeedbackProgram(feedbackId);
    };

    const handleClickRemove = (item) => {
        setIsOpenModalRemove(true);
        return setFeedbackId(item?.feedBackId);
    };

    const handleCancel = () => setIsOpenModalRemove(false);

    const handleSendFeedBack = (e) => {
        // const { value } = e?.target || '';
        if (isUpdate && feedbackId) {
            const dataRequest = {
                feedBackId: feedbackId,
                newContent: inputValue,
            };
            setFeedbackId(false);
            return editFeedbackProgram(dataRequest);
        }
        const dataRequest = {
            content: inputValue,
            programId: dataDetail?.programId,
        };
        setFeedbackId(false);

        return feedbackProgram(dataRequest);
    };

    const handleClickEdit = (item) => {
        setInputValue(item?.content);
        setIsUpdate(true);
        setFeedbackId(item?.feedBackId);
    };

    return (
        <div className="mt-1 bg-white rounded">
            <div className="h-[25rem] flex flex-col justify-between">
                <div className="flex-grow p-3 mb-3 overflow-auto text-left comment-box">
                    {dataFeedback &&
                        dataFeedback?.length &&
                        dataFeedback?.map((item) => (
                            <div key={item?.feedBackId} className="mb-5 comment-item">
                                <div className="flex user-info">
                                    <img src={dfAvatar} alt="" className="mr-3 rounded-full w-7 h-7" />
                                    <p className="font-bold">{item?.userName}</p>
                                </div>
                                <div className="pl-10">
                                    <div className="p-3 break-all border shadow-inner comment rounded-xl">
                                        {item?.content}
                                    </div>
                                </div>
                                {userData?.userId === item?.userId && (
                                    <div className="flex pl-10 mt-1 ml-3">
                                        <button
                                            className="mr-2 flex items-center text-cyan-500"
                                            onClick={() => handleClickEdit(item)}
                                        >
                                            <p className="mr-2">Edit</p>
                                            <i className="fa-thin fa-pen-line"></i>
                                        </button>
                                        <button
                                            className="mr-2 flex items-center text-red-500"
                                            onClick={() => handleClickRemove(item)}
                                        >
                                            <p className="mr-2">Delete</p>
                                            <i className="fa-thin fa-trash"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
                <div className="w-full bg-white ">
                    <div>
                        <TextArea
                            onPressEnter={(e) => handleSendFeedBack(e)}
                            onChange={(e) => setInputValue(e?.target?.value)}
                            value={inputValue}
                            placeholder="Add your comment..."
                            className="p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-full"
                        ></TextArea>
                    </div>
                </div>
            </div>
            {isOpenModalRemove && (
                <Modal title="Remove Feedback" open={isOpenModalRemove} onOk={handleRemove} onCancel={handleCancel} />
            )}
        </div>
    );
}

export default TabComments;
