/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './style.css';
import ModalCreatePartner from './components/ModalCreatePartner';
import TableCommon from '~/components/TableCommon';
import { columns, dataTablePartners } from './constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import { getAllPartnerApi } from './callApi';

const { Search } = Input;

function Partner() {
    // STATE
    const [isModalOpenCreatePartner, setIsModalOpenCreatePartner] = useState(false);
    const [dataTable, setDataTable] = useState(null);

    // sử lý khi click nút create partner
    const showModalCreate = () => {
        setIsModalOpenCreatePartner(true);
    };

    // xử lý khi submit modal
    const handleSubmitModal = () => {
        setIsModalOpenCreatePartner(false);
    };

    // xử lý khi đóng modal
    const handleCancelModal = () => {
        setIsModalOpenCreatePartner(false);
    };

    // xử lý khi tìm kiếm partner
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    // render data table
    const parseData = useCallback((item, field, index) => {
        if (field === 'index') {
            return index + 1;
        }

        return item[field];
    }, []);

    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => getAllPartnerApi(),
    });

    console.log('data: ', data);

    // const { mutate: mutationGetAllPartner } = useMutation({
    //     mutationFn: getAllPartnerApi,
    //     onSuccess: (data) => {
    //         if ((data && data?.status === 200) || data?.status === '200') {
    //             console.log('data', data);
    //             // return notify(data?.data, 'success');
    //         }
    //         return notify(data?.message, 'error');
    //     },
    // });

    // useEffect(() => {
    //     mutationGetAllPartner();
    // }, []);

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
                />
            )}
        </div>
    );
}

export default Partner;
