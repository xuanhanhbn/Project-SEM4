/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './style.css';
import ModalCreatePartner from './components/ModalCreatePartner';
import TableCommon from '~/components/TableCommon';
import { columns, dataTablePartners } from './constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import { createPartnerApi, getAllPartnerApi, getApiSearchPartner } from './callApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Loading from '~/components/Loading';

const { Search } = Input;

function Partner() {
    // STATE
    const [isModalOpenCreatePartner, setIsModalOpenCreatePartner] = useState(false);
    const [dataTable, setDataTable] = useState(null);
    const [isOpenModalUploadPartner, setIsOpenModalUploadPartner] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        mutationGetAllPartner();
    }, []);

    // sử lý khi click nút create partner
    const showModalCreate = () => {
        setIsModalOpenCreatePartner(true);
    };

    // xử lý khi submit modal
    const handleSubmitModal = () => {
        setIsModalOpenCreatePartner(false);
    };

    const handleUpdatePartner = () => {
        setIsOpenModalUploadPartner(false);
    };

    // xử lý khi đóng modal
    const handleCancelModal = () => {
        setIsModalOpenCreatePartner(false);
        setIsOpenModalUploadPartner(false);
    };

    // xử lý khi tìm kiếm partner
    const onSearch = (data) => mutationGetSearchPartner(data);

    // show modal update partner
    const openModalUpdate = () => {
        setIsOpenModalUploadPartner(true);
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
            return (
                <Link to={`/admin/partner/detail/${item?.partnerId}`}>
                    <i className="fa-sharp fa-solid fa-eye"></i>
                </Link>
            );
        }
        return item[field];
    }, []);

    // call api
    const { mutate: mutationGetAllPartner, isPending } = useMutation({
        mutationFn: getAllPartnerApi,
        onSuccess: (data) => {
            // console.log('data: ',data);
            if ((data && data?.status === 200) || data?.status === '200') {
                return setDataTable(data?.data);
            }
            return notify(data?.message, 'error');
        },
    });

    const { mutate: mutationGetSearchPartner } = useMutation({
        mutationFn: getApiSearchPartner,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                setDataTable(data?.data);
            }
            return notify(data?.message, 'error');
        },
    });

    //call api create partner
    const { mutate: mutationCreatePartner } = useMutation({
        mutationFn: createPartnerApi,
        onSuccess: (res) => {
            if ((res && res?.status === 201) || res?.status === '201') {
                mutationGetAllPartner();
                handleCancelModal();
                return notify('Create Partner Success', 'success');
            } else {
                return notify(res?.response?.data, 'warning');
            }
        },
    });

    const handleCreatePartner = (data) => {
        return mutationCreatePartner(data);
    };

    return (
        <div id="partner">
            <Loading isLoading={isPending} />
            <h1 className="mt-3 text-xl font-bold">Partner</h1>
            <div className="search_box">
                <div className="flex items-center justify-center h-12 px-4 text-black bg-white border rounded-md border-gray-104">
                    <i className="mr-1 fa-regular fa-magnifying-glass"></i>
                    <Space direction="vertical">
                        <Search placeholder="Input search partner" allowClear size="large" onSearch={onSearch} />
                    </Space>
                </div>
                <button className="btn_create" onClick={() => showModalCreate()}>
                    Create partner
                </button>
            </div>

            <div className="flex-none w-full max-w-full px-3 mt-6">
                <TableCommon
                    data={dataTable || []}
                    parseFunction={parseData}
                    columns={columns}
                    isShowPaging
                    className="shadow-md rounded-2xl"
                />
            </div>

            {isModalOpenCreatePartner && (
                <ModalCreatePartner
                    isModalOpen={isModalOpenCreatePartner}
                    handleOk={handleCreatePartner}
                    handleCancel={handleCancelModal}
                    type="create"
                />
            )}

            {/* {isOpenModalUploadPartner && (
                <ModalCreatePartner
                    isModalOpen={isOpenModalUploadPartner}
                    handleOk={handleUpdatePartner}
                    handleCancel={handleCancelModal}
                    type="update"
                />
            )} */}
        </div>
    );
}

export default Partner;
