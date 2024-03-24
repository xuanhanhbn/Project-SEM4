import { Progress } from 'antd';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import TableCommon from '~/components/TableCommon';
import { columns } from '../../constants';

function ActiveProgram(props) {
    // const [dataDetail, setDataDetail] = useState(null);
    const { dataDetail } = props;
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
            <TableCommon
                data={dataDetail?.programs || []}
                parseFunction={parseData}
                columns={columns}
                isShowPaging
                className="shadow-md rounded-2xl"
            />
        </div>
    );
}

export default ActiveProgram;
