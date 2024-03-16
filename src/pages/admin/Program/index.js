/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Program.css';

import ProjectImage from '~/assets/images/campaigns/Palestine-6.png';
import ModalCreateProgram from './components/ModalCreateProgram';
import TableCommon from '~/components/TableCommon';
import { columnsAdminTable, columnsPartnerTable, dataTablePrograms } from './constants';
import { Space, Input, Button, Modal } from 'antd';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import { useMutation } from '@tanstack/react-query';
import { createProgramApi, getAllProgramApi } from './callApi';
import { notify } from '~/utils/common';
import Loading from '~/components/Loading';
import { getApiDefault } from '~/utils/api';

const { TextArea } = Input;

const status = 'inProcess';
const { Search } = Input;
function Program() {
    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );
    // State
    const [isOpenModalCreateProject, setIsOpenModalCreateProject] = useState(false);
    const [listSearchDataTable, setListSearchDataTable] = useState([]);
    const [isRefuse, setIsRefuse] = useState(false);
    const [isMessage, setIsMessage] = useState('');
    const [dataProgram, setDataProgram] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        mutationGetAllProgram();
    }, []);

    const onSearch = (value) => {
        setListSearchDataTable(dataTablePrograms.filter((data) => data.programName.toLowerCase().includes(value)));
    };

    const acceptedProgram = async (item) => {
        try {
            const url = `program/active-program/${item?.programId}?value=${value}`;
            const res = await getApiDefault(url);
            if (res && res.status === 200) {
                notify(res?.data, 'success');
                return mutationGetAllProgram();
            }
        } catch (error) {
            return notify(error, 'error');
        }
    };

    const refuseProgram = () => {
        console.log('message: ', isMessage);
        setIsMessage('');
        setIsRefuse(false);
    };

    const showModal = () => {
        setIsRefuse(true);
    };

    const handleCancel = () => {
        setIsRefuse(false);
    };

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

        // if (field === 'programName') {
        //     return <Link to="/admin/program/detail">{item.programName}</Link>;
        // }
        if (field === 'partnerName') {
            return item?.partner?.partnerName;
        }

        if (field === 'action') {
            return (
                <div className="flex flex-col">
                    <Button
                        onClick={() => {
                            acceptedProgram(item);
                            setValue('Active');
                        }}
                        type="primary"
                        className="px-0 mb-1"
                        ghost
                    >
                        Accepted
                    </Button>
                    <Button
                        onClick={() => {
                            showModal();
                            setValue('Cancel');
                        }}
                        type="primary"
                        danger
                        ghost
                    >
                        Refuse
                    </Button>
                </div>
            );
        }

        return item[field];
    }, []);

    // roll partner lấy danh sách program

    return (
        <div id="program_page">
            <Loading isLoading={isPending} />
            <h1 className="mt-3 text-xl font-bold">Program</h1>

            {/* <div className={userData?.role === 'ADMIN' ? 'hidden' : 'flex-none w-full max-w-full px-3 mt-6'}>
                <div className="program_container">
                    <div className="p-4 pb-0 mb-0 bg-white rounded-t-2xl">
                        <h6 className="mb-4">New Projects</h6>
                    </div>
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap -mx-3">
                            <div className="program_new_project">
                                <div className="project_container">
                                    <div className="relative">
                                        <Link to="#" className="block shadow-xl rounded-2xl">
                                            <img
                                                src={ProjectImage}
                                                alt="img-blur-shadow"
                                                className="max-w-full shadow-soft-2xl rounded-2xl"
                                            />
                                        </Link>
                                    </div>
                                    <div className="flex-auto px-1 pt-6">
                                        <p className="project_code">Code #FB-212562</p>
                                        <Link to="#">
                                            <h5>School</h5>
                                        </Link>
                                        <p className="mb-6 text-sm leading-normal">
                                            Big charity: build school for poor children.
                                        </p>
                                        <Link to="/admin/program/detail" type="button" className="view_btn">
                                            View Project
                                        </Link>
                                    </div>
                                </div>

                            </div>

                            <div className="program_new_project">
                                <div className="create_project_btn">
                                    <div className="flex flex-col justify-center flex-auto p-6 text-center">
                                        <button onClick={() => setIsOpenModalCreateProject(true)}>
                                            <i className="mb-4 fa fa-plus text-slate-400"></i>
                                            <h5 className="text-slate-400">New project</h5>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <div className="flex justify-end max-w-full px-3">
                <div className="flex items-center justify-center h-12 px-4 text-black bg-white border rounded-md border-gray-104">
                    <i className="mr-1 fa-regular fa-magnifying-glass"></i>
                    <Space direction="vertical">
                        <Search placeholder="input search program" allowClear size="large" onSearch={onSearch} />
                    </Space>
                </div>
                <div>
                    <button onClick={() => setIsOpenModalCreateProject(true)} className="btn-create-program">
                        Create Program
                    </button>
                </div>
            </div> */}
            <div className="flex-none w-full max-w-full px-3 mt-6">
                <TableCommon
                    data={dataProgram || []}
                    parseFunction={parseData}
                    columns={columnsAdminTable}
                    isShowPaging
                    className="shadow-md rounded-2xl"
                />
            </div>
            {/* modal tạo chương trình mới */}
            {/* {isOpenModalCreateProject && (
                <ModalCreateProgram
                    onOpenCreateModal={isOpenModalCreateProject}
                    handleSubmitModalCreate={handleCreateProgram}
                    handleCancelModalCreate={handleCancelModal}
                    type="create"
                />
            )} */}

            {isRefuse && (
                <Modal
                    footer={false}
                    title="Refuse Program"
                    open={isRefuse}
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
                            onClick={() => refuseProgram()}
                            type="primary"
                            className="mt-3 "
                            ghost
                        >
                            Send Message
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Program;
