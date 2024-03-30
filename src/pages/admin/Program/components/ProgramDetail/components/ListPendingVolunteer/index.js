/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import TableCommon from '~/components/TableCommon';
import { notify } from '~/utils/common';
import { COLUMNS_REGISTER_VOLUNTEER } from './constant';
import { acceptVolunteer, getAllVolunteer } from './callApi';
import { Button, Input, Modal } from 'antd';
import './index.css';
import Loading from '~/components/Loading';
function ListPendingVolunteer({ dataDetail }) {
    const baseDataRequest = {
        programId: '',
        name: '',
        page: 1,
        size: 20,
    };
    const baseOpenModal = {
        accept: false,
        rejected: false,
    };
    const [dataProgram, setDataProgram] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(baseOpenModal);
    const [dataRequest, setDataRequest] = useState(baseDataRequest);
    const [inputReason, setInputReason] = useState('');
    const [subProgramId, setSubProgramId] = useState('');

    useEffect(() => {
        if (dataDetail && dataDetail.recruitCollaborators) {
            handleGetList();
        }
    }, [dataDetail]);

    const handleGetList = () => {
        const newDataRequest = {
            ...dataRequest,
            programId: dataDetail?.programId,
            name: 'Pending',
        };
        setDataRequest(newDataRequest);
        mutationGetAllVolunteer(newDataRequest);
    };

    const { mutate: mutationGetAllVolunteer, isPending } = useMutation({
        mutationFn: getAllVolunteer,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                return setDataProgram(res?.data);
            }
            return notify(res?.message, 'error');
        },
    });

    const { mutate: mutationAcceptVolunteer, isPending: isPendingAccept } = useMutation({
        mutationFn: acceptVolunteer,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                notify('Success', 'success');
                handleGetList();
                return handleCloseModal();
            }
            return notify(res?.message, 'error');
        },
    });
    const handleOpenModal = (item, type) => {
        setSubProgramId(item?.subProgramId);
        if (type && type === 'accept') {
            return setIsOpenModal((prev) => ({
                ...prev,
                accept: true,
                rejected: false,
            }));
        }
        return setIsOpenModal((prev) => ({
            ...prev,
            accept: false,
            rejected: true,
        }));
    };

    const handleAcceptVolunteer = (data) => {
        const request = {
            id: subProgramId,
            value: data?.value || '',
            note: data?.note || '',
        };
        return mutationAcceptVolunteer(request);
    };

    const handleCloseModal = () => setIsOpenModal(baseOpenModal);

    const parseData = useCallback((item, field, index) => {
        if (field === 'index') {
            return index + 1;
        }
        if (field === 'userName') {
            return item?.user?.displayName;
        }
        if (field === 'email') {
            return item?.user?.email;
        }
        if (field === 'phoneNumber') {
            return item?.user?.phoneNumber;
        }

        if (field === 'status') {
            if (item.status === 'Active') return <div style={{ color: 'green', fontWeight: 800 }}>{item[field]}</div>;
            return <div style={{ color: 'red', fontWeight: 800 }}>{item[field]}</div>;
        }

        if (field === 'actions') {
            return (
                <div className="w-full flex items-center">
                    <div className="w-[50%]">
                        <Button
                            onClick={() => handleOpenModal(item, 'accept')}
                            className="bg-blue-100"
                            type="primary"
                            title="accept"
                        >
                            <i className="fa-light fa-check"></i>
                        </Button>
                    </div>
                    <div className="w-[50%]">
                        <Button
                            onClick={() => handleOpenModal(item, 'rejected')}
                            type="primary"
                            danger
                            title="rejected"
                        >
                            <i className="fa-light fa-xmark"></i>
                        </Button>
                    </div>
                </div>
            );
        }

        return item[field];
    }, []);

    const handleChangeInput = (e) => setInputReason(e?.target?.value);

    return (
        <div className="w-full">
            <Loading isLoading={isPending || isPendingAccept} />
            <div>
                <TableCommon
                    data={dataProgram || []}
                    parseFunction={parseData}
                    columns={COLUMNS_REGISTER_VOLUNTEER}
                    isShowPaging={true}
                    className="shadow-md rounded-2xl"
                />
            </div>
            {isOpenModal.accept && (
                <Modal
                    title="Accept Volunteer"
                    open={isOpenModal.accept}
                    onOk={() => handleAcceptVolunteer({ value: 'Active', note: '' })}
                    onCancel={handleCloseModal}
                >
                    <p>When confirmed, the user below will be added to the volunteer list.</p>
                </Modal>
            )}
            {isOpenModal.rejected && (
                <Modal
                    title="Cancel Register Volunteer"
                    open={isOpenModal.rejected}
                    onOk={() => handleAcceptVolunteer({ value: 'Active', note: inputReason })}
                    onCancel={handleCloseModal}
                >
                    <Input onChange={(e) => handleChangeInput(e)} size="large" placeholder="Write reason"></Input>
                </Modal>
            )}
        </div>
    );
}

export default ListPendingVolunteer;
