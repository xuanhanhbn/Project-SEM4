/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './style.css';
import ModalCreatePartner from './components/ModalCreatePartner';
import TableCommon from '~/components/TableCommon';
import { columns, dataTablePartners } from './constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import { getAllPartnerApi, getApiSearchPartner } from './callApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const { Search } = Input;

function Partner() {
    // STATE
    const [isModalOpenCreatePartner, setIsModalOpenCreatePartner] = useState(false);
    const [dataTable, setDataTable] = useState(null);
    const [isOpenModalUploadPartner, setIsOpenModalUploadPartner] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigate();

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

        if (field === 'partnerName') {
            return (
                <div>
                    <button
                        onClick={() => navigation('/admin/partner/detail', { state: item })}
                        // state={item}
                    >
                        {item.partnerName}
                    </button>
                </div>
            );
        }

        if (field === 'logo') {
            const urlLogo = item?.attachment;

            if (urlLogo?.length === 0) {
                return <img className="w-16 h-16" alt={item.partnerName + '_logo'} />;
            } else {
                return <img className="w-16 h-16" src={urlLogo[0]?.url} alt={item.partnerName + '_logo'} />;
            }
        }

        return item[field];
    }, []);

    // call api
    const { mutate: mutationGetAllPartner } = useMutation({
        mutationFn: getAllPartnerApi,
        onSuccess: (data) => {
            // console.log('data: ',data);
            if ((data && data?.status === 200) || data?.status === '200') {
                console.log('get all data: ', data);

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

    //
    useEffect(() => {
        mutationGetAllPartner();
    }, []);

    return (
        <div id="partner">
            <h1 className="mt-3 text-xl font-bold">Partner</h1>
            <div className="search_box">
                <div className="flex items-center justify-center h-12 px-4 text-black bg-white border rounded-md border-gray-104">
                    <i className="mr-1 fa-regular fa-magnifying-glass"></i>
                    <Space direction="vertical">
                        <Search placeholder="input search partner" allowClear size="large" onSearch={onSearch} />
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
                    handleOk={handleSubmitModal}
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
