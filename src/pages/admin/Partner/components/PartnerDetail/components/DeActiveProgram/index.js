import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import TableCommon from '~/components/TableCommon';
import { columnsRejectProgram } from '../../constants';

function DeActiveProgram(props) {
    const { dataDetail } = props;

    // render data table
    const parseData = useCallback((item, field, index) => {
        if (field === 'actions') {
            return (
                <Link to={`/admin/program/detail/${item?.programId}`}>
                    <i className="fa-sharp fa-solid fa-eye"></i>
                </Link>
            );
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
                data={dataDetail?.programs || []}
                parseFunction={parseData}
                columns={columnsRejectProgram}
                isShowPaging
                className="shadow-md rounded-2xl"
            />
        </div>
    );
}

export default DeActiveProgram;
