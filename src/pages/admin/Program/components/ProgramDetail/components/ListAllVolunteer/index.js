/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import TableCommon from '~/components/TableCommon';
import { getAllVolunteer } from './callApi';
import { notify } from '~/utils/common';
import { COLUMNS_REGISTER_VOLUNTEER } from './constant';

function ListAllVolunteer({ dataDetail }) {
    console.log('dataDetail: ', dataDetail);

    const baseDataRequest = {
        programId: '',
        name: '',
        page: 1,
        size: 20,
    };
    const [dataProgram, setDataProgram] = useState([]);
    const [dataRequest, setDataRequest] = useState(baseDataRequest);

    useEffect(() => {
        if (dataDetail && dataDetail.recruitCollaborators) {
            const newDataRequest = {
                ...dataRequest,
                programId: dataDetail?.programId,
                name: 'Active',
            };
            setDataRequest(newDataRequest);
            mutationGetAllVolunteer(newDataRequest);
        }
    }, [dataDetail]);

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
        if (field === 'userName') {
            return item?.user?.displayName;
        }
        if (field === 'email') {
            return item?.user?.email;
        }
        if (field === 'phoneNumber') {
            return item?.user?.phoneNumber;
        }

        if (field === 'status') {
            if (item.status === 'Active') return <div style={{ color: 'green', fontWeight: 800 }}>{item[field]}</div>;
            return <div style={{ color: 'red', fontWeight: 800 }}>{item[field]}</div>;
        }

        // if (field === 'actions') {
        //     return (
        //         <div className="w-full flex items-center">
        //             <div className="w-[50%]">
        //                 <Button
        //                     onClick={() => handleOpenModal(item, 'accept')}
        //                     className="bg-blue-100"
        //                     type="primary"
        //                     title="accept"
        //                 >
        //                     <i className="fa-light fa-check"></i>
        //                 </Button>
        //             </div>
        //             <div className="w-[50%]">
        //                 <Button
        //                     onClick={() => handleOpenModal(item, 'rejected')}
        //                     type="primary"
        //                     danger
        //                     title="rejected"
        //                 >
        //                     <i className="fa-light fa-xmark"></i>
        //                 </Button>
        //             </div>
        //         </div>
        //     );
        // }

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

export default ListAllVolunteer;
