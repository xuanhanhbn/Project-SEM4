/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Progress } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TableCommon from '~/components/TableCommon';
import { columns } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { getAllProgramApi } from './callApi';
import { notify } from '~/utils/common';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';
import Loading from '~/components/Loading';

function ActiveProgram(props) {
    const { dataDetail } = props;

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

    const params = useParams();
    const [dataRequest, setDataRequest] = useState(baseDataRequest);
    const [dataProgram, setDataProgram] = useState([]);

    const handleCaculator = (item) => {
        const target = item?.target || 0;
        const total = item?.totalMoney || 0;
        if (target && total) {
            const result = (total / target) * 100;
            if (result >= 100) {
                return 100;
            }
            return result;
        }
        return 0;
    };

    useEffect(() => {
        const newRequest = {
            ...dataRequest,
            partnerId: params?.partnerId || userData?.partnerId || '',
            name: 'Active',
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
        if (field === 'status') {
            if (item.status === 'Active') return <div style={{ color: 'green', fontWeight: 800 }}>{item[field]}</div>;
            return <div style={{ color: 'red', fontWeight: 800 }}>{item[field]}</div>;
        }
        if (field === 'completion') {
            return <Progress percent={handleCaculator(item)} />;
        }
        if (field === 'target' || field === 'totalMoney') {
            return `${(item[field] && item[field].toLocaleString()) || 0} $`;
        }
        if (field === 'createdAt') {
            return moment(item[field])?.format('YYYY-MM-DD');
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

export default ActiveProgram;
