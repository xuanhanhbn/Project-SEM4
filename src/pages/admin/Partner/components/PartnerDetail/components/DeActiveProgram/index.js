/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableCommon from '~/components/TableCommon';
import { columnsRejectProgram } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { getAllProgramApi } from './callApi';
import { notify } from '~/utils/common';
import { columns } from './constant';

function DeActiveProgram(props) {
    const { dataDetail } = props;
    const [dataProgram, setDataProgram] = useState([]);

    useEffect(() => {
        mutationGetAllProgram();
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
                <Link to={`/admin/program/detail/${item?.programId}`}>
                    <i className="fa-sharp fa-solid fa-eye"></i>
                </Link>
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
