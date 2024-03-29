import React, { useCallback } from 'react';
import { shallow } from 'zustand/shallow';
import TableCommon from '~/components/TableCommon';
import useAuthStore from '~/store/zustand';
import { columnsHistoryDonate } from './constant';
import { convertTimeStampToDateTime, handleFormatMoney } from '~/utils/common';
import { Link } from 'react-router-dom';

function HistoryDonate() {
    const { userData, setUserData, cleanup } = useAuthStore(
        (state) => ({
            userData: state.userData || '',
            setUserData: state.setUserData,
            cleanup: state.cleanup,
        }),
        shallow,
    );

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
                data={userData?.donations || []}
                parseFunction={parseData}
                columns={columnsHistoryDonate}
                isShowPaging
                className="shadow-md rounded-2xl"
            />
        </div>
    );
}

export default HistoryDonate;
