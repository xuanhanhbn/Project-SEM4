/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableCommon from '~/components/TableCommon';
import { columnsRejectProgram } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { getAllProgramApi } from './callApi';
import { notify } from '~/utils/common';
import { columns } from './constant';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import Loading from '~/components/Loading';
import { Button } from 'antd';

function DeActiveProgram(props) {
    // const { dataDetail } = props;
    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

    const baseDataRequest = {
        partnerId: '',
        name: '',
        page: 1,
        size: 20,
    };

    const [dataRequest, setDataRequest] = useState(baseDataRequest);
    const [dataProgram, setDataProgram] = useState([]);

    useEffect(() => {
        const newRequest = {
            ...dataRequest,
            partnerId: userData?.partnerId || '',
            name: 'DeActive',
        };
        setDataRequest(newRequest);
        mutationGetAllProgram(newRequest);
    }, []);

    const { mutate: mutationGetAllProgram, isPending } = useMutation({
        mutationFn: getAllProgramApi,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                return setDataProgram(res?.data);
            }
            return notify(res?.message, 'error');
        },
    });

    // render data table
    const parseData = useCallback((item, field, index) => {
        if (field === 'index') {
            return index + 1;
        }
        if (field === 'actions') {
            return (
                <div className="flex justify-center">
                    <Link to={`/admin/program/detail/${item?.programId}`}>
                        <Button title="View">
                            <i className="fa-sharp fa-solid fa-eye"></i>
                        </Button>
                    </Link>
                </div>
            );
        }
        if (field === 'target' || field === 'totalMoney') {
            return `${(item[field] && item[field].toLocaleString()) || 0} $`;
        }
        if (field === 'status') {
            if (item.status === 'Active') return <div style={{ color: 'green', fontWeight: 800 }}>{item[field]}</div>;
            return <div style={{ color: 'red', fontWeight: 800 }}>{item[field]}</div>;
        }

        return item[field];
    }, []);
    return (
        <div>
            <Loading isLoading={isPending} />
            <TableCommon
                data={dataProgram || []}
                parseFunction={parseData}
                columns={columns}
                isShowPaging
                className="shadow-md rounded-2xl"
            />
        </div>
    );
}

export default DeActiveProgram;
