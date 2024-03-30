/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import TableCommon from '~/components/TableCommon';
import { getAllVolunteer } from './callApi';
import { notify } from '~/utils/common';
import { COLUMNS_REGISTER_VOLUNTEER } from './constant';

function ListPendingVolunteer({ dataDetail }) {
    console.log('dataDetail: ', dataDetail);

    const baseDataRequest = {
        programId: '',
        name: '',
        page: 1,
        size: 20,
    };
    const [dataProgram, setDataProgram] = useState([]);
    const [dataRequest, setDataRequest] = useState(baseDataRequest);

    // useEffect(() => {
    //     if (dataDetail && dataDetail.recruitCollaborators) {
    //         const newDataRequest = {
    //             ...dataRequest,
    //             programId: dataDetail?.programId,
    //             name: 'Pending',
    //         };
    //         setDataRequest(newDataRequest);
    //         mutationGetAllVolunteer(newDataRequest);
    //     }
    // }, [dataDetail]);

    const { mutate: mutationGetAllVolunteer, isPending } = useMutation({
        mutationFn: getAllVolunteer,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                return setDataProgram(res?.data);
            }
            return notify(res?.message, 'error');
        },
    });

    const parseData = useCallback((item, field, index) => {
        if (field === 'index') {
            return index + 1;
        }
        if (field === 'partnerName') {
            return item?.partner?.partnerName;
        }

        if (field === 'status') {
            if (item.status === 'Active') return <div style={{ color: 'green', fontWeight: 800 }}>{item[field]}</div>;
            return <div style={{ color: 'red', fontWeight: 800 }}>{item[field]}</div>;
        }

        if (field === 'target') {
            return `${item[field].toLocaleString()} $`;
        }

        return item[field];
    }, []);

    return (
        <div className="w-full">
            <div>
                <TableCommon
                    data={dataProgram || []}
                    parseFunction={parseData}
                    columns={COLUMNS_REGISTER_VOLUNTEER}
                    isShowPaging={true}
                    className="shadow-md rounded-2xl"
                />
            </div>
        </div>
    );
}

export default ListPendingVolunteer;
