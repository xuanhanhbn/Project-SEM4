/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Input, Modal, Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './style.css';
import TableCommon from '~/components/TableCommon';
import { columns } from './constants';
import { useMutation } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import { blockUserApi, getAllUserApi } from './callApi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loading from '~/components/Loading';

const { Search } = Input;

function AllUser() {
    const baseDataRequest = {
        name: '',
        page: 1,
        size: 20,
    };
    const [dataTable, setDataTable] = useState([]);
    const [dataRequest, setDataRequest] = useState(baseDataRequest);
    const [isOpenModalBlock, setIsOpenModalBlock] = useState(false);
    const [isOpenModalUnLock, setIsOpenModalUnLock] = useState(false);
    const [emailUser, setEmailUser] = useState('');

    useEffect(() => {
        mutationGetAllUser(dataRequest);
    }, []);

    // xử lý khi đóng modal
    const handleCancelModal = () => {
        setIsOpenModalBlock(false);
        setIsOpenModalUnLock(false);
    };

    const handleOpenModalBlock = (item, type) => {
        console.log('item: ', item);
        if (type && type === 'block') {
            setIsOpenModalBlock(true);
            return setEmailUser(item);
        }
        setIsOpenModalUnLock(true);
        return setEmailUser(item);
    };

    // render data table
    const parseData = useCallback((item, field, index) => {
        if (field === 'index') {
            return index + 1;
        }
        if (field === 'createdAt') {
            if (item[field]) {
                return moment(item[field])?.format('YYYY-MM-DD');
            }
            return '';
        }
        if (field === 'status') {
            if (item.status === 'Active') return <div style={{ color: 'green', fontWeight: 800 }}>{item[field]}</div>;
            return <div style={{ color: 'red', fontWeight: 800 }}>{item[field]}</div>;
        }
        if (field === 'actions') {
            if (item && item.status === 'Active') {
                return (
                    <div className="flex items-center">
                        <Button>
                            <Link to={`/admin/partner/detail/${item?.email}`}>
                                <i className="fa-sharp fa-solid fa-eye"></i>
                            </Link>
                        </Button>
                        <div className="ml-2">
                            <Button onClick={() => handleOpenModalBlock(item?.email, 'block')} className="text-red-500">
                                <i className="fa-sharp fa-light fa-ban"></i>
                            </Button>
                        </div>
                    </div>
                );
            }
            return (
                <div className="flex items-center">
                    <Button>
                        <Link to={`/admin/partner/detail/${item?.email}`}>
                            <i className="fa-sharp fa-solid fa-eye"></i>
                        </Link>
                    </Button>
                    <div className="ml-2">
                        <Button onClick={() => handleOpenModalBlock(item?.email, 'unlock')} className="text-red-500">
                            <i className="fa-light fa-unlock"></i>
                        </Button>
                    </div>
                </div>
            );
        }

        return item[field];
    }, []);

    // call api
    const { mutate: mutationGetAllUser, isPending } = useMutation({
        mutationFn: getAllUserApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                return setDataTable(data?.data);
            }
            return notify(data?.message, 'error');
        },
    });

    const { mutate: mutationBlockUser, isPending: isPendingBlockUser } = useMutation({
        mutationFn: blockUserApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                handleCancelModal();
                notify('Success', 'success');
                return mutationGetAllUser(dataRequest);
            }
            return notify(data?.message, 'error');
        },
    });

    return (
        <div id="all-user-container">
            <Loading isLoading={isPending || isPendingBlockUser} />
            <h1 className="mt-3 text-xl font-bold">All User</h1>
            <div className="search_box">
                <div className="flex items-center justify-center h-12 px-4 text-black bg-white border rounded-md border-gray-104">
                    <i className="mr-1 fa-regular fa-magnifying-glass"></i>
                    <Space direction="vertical">
                        <Search placeholder="Input search" allowClear size="large" />
                    </Space>
                </div>
            </div>

            <div className="flex-none w-full max-w-full  mt-6">
                <TableCommon
                    data={dataTable || []}
                    parseFunction={parseData}
                    columns={columns}
                    isShowPaging
                    className="shadow-md rounded-2xl"
                />
            </div>
            {isOpenModalBlock && (
                <Modal
                    title="Block User"
                    open={isOpenModalBlock}
                    onOk={() => mutationBlockUser({ email: emailUser, value: 'Block' })}
                    onCancel={handleCancelModal}
                >
                    <p>When confirmed, the user will be blocked and will not have the right to login...</p>
                </Modal>
            )}

            {isOpenModalUnLock && (
                <Modal
                    title="Unlock User"
                    open={isOpenModalUnLock}
                    onOk={() => mutationBlockUser({ email: emailUser, value: 'Active' })}
                    onCancel={handleCancelModal}
                >
                    <p>When confirmed, the user will have the right to donations programs.</p>
                </Modal>
            )}
        </div>
    );
}

export default AllUser;
