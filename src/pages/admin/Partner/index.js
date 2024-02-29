import { Space, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './style.css';
import ModalCreatePartner from './components/ModalCreatePartner';
import TableCommon from '~/components/TableCommon';
import { columns, dataTablePartners } from './constants';
import { useMutation } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import { getAllPartnerApi, getApiSearchPartner } from './callApi';
import { Link, useLocation } from 'react-router-dom';

const { Search } = Input;

function Partner() {
    // STATE
    const [isModalOpenCreatePartner, setIsModalOpenCreatePartner] = useState(false);
    const [dataTable, setDataTable] = useState(null);
    const [isOpenModalUploadPartner, setIsOpenModalUploadPartner] = useState(false);
    // const [dataUpdate, setDataUpdate] = useState({});

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
                    <Link
                        onClick={() => {
                            openModalUpdate();
                        }}
                        state={item}
                    >
                        {item.partnerName}
                    </Link>
                </div>
            );
        }

        if (field === 'logo') {
            const urlLogo = item.attachment;
            if (urlLogo?.length === 0) {
                return <img className="w-16 h-16" alt={item.partnerName + '_logo'} />;
            } else {
                return <img className="w-16 h-16" src={urlLogo[0].url} alt={item.partnerName + '_logo'} />;
            }
        }

        return item[field];
    }, []);

    // call api
    const { mutate: mutationGetAllPartner } = useMutation({
        mutationFn: getAllPartnerApi,
        onSuccess: (data) => {
            setDataTable(data);
        },
    });

    const { mutate: mutationGetSearchPartner } = useMutation({
        mutationFn: getApiSearchPartner,
        onSuccess: (data) => {
            setDataTable(data);
        },
    });

    //
    useEffect(() => {
        mutationGetAllPartner();
    }, [dataTable]);

    return (
        <div id="partner">
            <h1 className="mt-3 text-xl font-bold">Partner</h1>
            <div className="search_box">
                <Space direction="vertical">
                    <Search
                        placeholder="input search partner"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                    />
                </Space>
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

            {isOpenModalUploadPartner && (
                <ModalCreatePartner
                    isModalOpen={isOpenModalUploadPartner}
                    handleOk={handleUpdatePartner}
                    handleCancel={handleCancelModal}
                    type="update"
                />
            )}
        </div>
    );
}

export default Partner;
