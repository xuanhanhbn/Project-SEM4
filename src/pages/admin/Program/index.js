/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Program.css';

import TableCommon from '~/components/TableCommon';
import { columnsAdminTable } from './constants';
import { Input, Button, Modal } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { getAllProgramApi } from './callApi';
import { notify } from '~/utils/common';
import Loading from '~/components/Loading';
import { getApiDefault } from '~/utils/api';

const { TextArea } = Input;

function Program() {
    const baseOpenModal = {
        accept: false,
        cancel: false,
    };
    // State
    const [isMessage, setIsMessage] = useState('');
    const [dataProgram, setDataProgram] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(baseOpenModal);
    const [programId, setProgramId] = useState('');

    useEffect(() => {
        mutationGetAllProgram();
    }, []);

    const acceptedProgram = async (item, data) => {
        try {
            const url = `program/active-program/${item?.programId}?value=${data}`;
            const res = await getApiDefault(url);
            if (res && res.status === 200) {
                notify(res?.data, 'success');
                handleCancel();
                return mutationGetAllProgram();
            }
        } catch (error) {
            return notify(error, 'error');
        }
    };

    const handleCancel = () => setIsOpenModal(baseOpenModal);

    const { mutate: mutationGetAllProgram, isPending } = useMutation({
        mutationFn: getAllProgramApi,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                return setDataProgram(res?.data);
            }
            return notify(res?.message, 'error');
        },
    });

    // roll admin lấy danh sách program
    const parseData = useCallback((item, field, index) => {
        if (field === 'index') {
            return index + 1;
        }
        if (field === 'partnerName') {
            return item?.partner?.partnerName;
        }

        if (field === 'action') {
            return (
                <div className="flex ">
                    <Link to={`/admin/program/detail/${item?.programId}`}>
                        <Button title="View">
                            <i className="fa-sharp fa-solid fa-eye"></i>
                        </Button>
                    </Link>
                    <Button
                        onClick={() => {
                            // acceptedProgram(item, 'Active');
                            setIsOpenModal((prev) => ({
                                ...prev,
                                accept: true,
                                cancel: false,
                            }));
                            return setProgramId(item);
                            // setValue('Active');
                        }}
                        title="Accept"
                        type="primary"
                        className="mx-1"
                        ghost
                    >
                        <i className="fa-duotone fa-check"></i>
                    </Button>
                    <Button
                        onClick={() => {
                            // acceptedProgram(item, 'Cancel');
                            setIsOpenModal((prev) => ({
                                ...prev,
                                accept: false,
                                cancel: true,
                            }));
                            return setProgramId(item);
                        }}
                        title="Cancel"
                        type="primary"
                        danger
                        ghost
                    >
                        <i className="fa-sharp fa-solid fa-xmark"></i>
                    </Button>
                </div>
            );
        }

        return item[field];
    }, []);
    return (
        <div id="program_page">
            <Loading isLoading={isPending} />
            <h1 className="mt-3 text-xl font-bold">Program</h1>

            <div className="flex-none w-full max-w-full px-3 mt-6">
                <TableCommon
                    data={dataProgram || []}
                    parseFunction={parseData}
                    columns={columnsAdminTable}
                    isShowPaging
                    className="shadow-md rounded-2xl"
                />
            </div>

            {isOpenModal && isOpenModal.cancel && (
                <Modal
                    footer={false}
                    title="Refuse Program"
                    open={isOpenModal.cancel}
                    // onOk={refuseProgram}
                    onCancel={handleCancel}
                >
                    <div>
                        <TextArea
                            placeholder="Enter the reason for rejection"
                            allowClear
                            onChange={(e) => setIsMessage(e.target.value)}
                        />
                        <Button
                            disabled={isMessage ? false : true}
                            // onClick={() => refuseProgram()}
                            type="primary"
                            className="mt-3 "
                            ghost
                        >
                            Send Message
                        </Button>
                    </div>
                </Modal>
            )}

            {isOpenModal && isOpenModal.accept && (
                <Modal
                    title="Accept Program"
                    open={isOpenModal.accept}
                    onOk={() => acceptedProgram(programId, 'Active')}
                    onCancel={handleCancel}
                    footerRenderParams={{
                        extra: {
                            OkBtn: <></>,
                        },
                    }}
                >
                    <p>Program approval confirmation, upon confirmation the program will be activated</p>
                </Modal>
            )}
        </div>
    );
}

export default Program;
