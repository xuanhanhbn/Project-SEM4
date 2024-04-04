import React, { useCallback, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import TableCommon from '~/components/TableCommon';
import useAuthStore from '~/store/zustand';
import { columnsHistoryDonate } from './constant';
import { convertTimeStampToDateTime, handleFormatMoney, notify } from '~/utils/common';
import { Link, useParams } from 'react-router-dom';
import { getApiDefault } from '~/utils/api';

function HistoryVolunteer() {
    const [dataTable, setDataTable] = useState([]);
    const params = useParams();
    useEffect(() => {
        if (params && params?.userId) {
            handleGetUserDetail(params?.userId);
        }
    }, [params]);

    const handleGetUserDetail = async (id) => {
        try {
            const url = `user/get-by-id/${id}`;
            const res = await getApiDefault(url);
            if (res && res.status === 200) {
                return setDataTable(res?.data?.subPrograms);
            }
        } catch (error) {
            return notify(error, 'error');
        }
    };
    const parseData = useCallback((item, field, index) => {
        if (field === 'index') {
            return index + 1;
        }
        if (field === 'programName') {
            return <Link to={`/campaign-detail/${item?.programId}`}>{item[field]}</Link>;
        }
        if (field === 'createdAt') {
            return convertTimeStampToDateTime(item[field]);
        }
        if (field === 'amount') {
            return handleFormatMoney(item[field]);
        }

        return item[field];
    }, []);
    return (
        <div className="flex-none w-full max-w-full mt-6">
            <TableCommon
                data={dataTable || []}
                parseFunction={parseData}
                columns={columnsHistoryDonate}
                isShowPaging
                className="shadow-md rounded-2xl"
            />
        </div>
    );
}

export default HistoryVolunteer;
