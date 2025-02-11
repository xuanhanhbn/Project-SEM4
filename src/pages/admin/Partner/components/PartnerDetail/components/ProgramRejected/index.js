/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Program.css';

import TableCommon from '~/components/TableCommon';
import { columnsAdminTable } from './constants';
import { Input, Button, Modal } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { getAllProgramApi } from './callApi';
import { notify } from '~/utils/common';
import Loading from '~/components/Loading';
import useAuthStore from '~/store/zustand';
import { shallow } from 'zustand/shallow';

function ListProgramRejected(props) {
    const { dataDetail } = props;
    const params = useParams();

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

    // State
    const [dataRequest, setDataRequest] = useState(baseDataRequest);
    const [dataProgram, setDataProgram] = useState([]);

    useEffect(() => {
        const newRequest = {
            ...dataRequest,
            partnerId: params?.partnerId || userData?.partnerId || '',
            name: 'Rejected',
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

    // roll admin lấy danh sách program
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

        if (field === 'action') {
            return (
                <div className="flex justify-center">
                    <Link to={`/admin/program-detail-for-admin/${item?.programId}`}>
                        <Button title="View">
                            <i className="fa-sharp fa-solid fa-eye"></i>
                        </Button>
                    </Link>
                </div>
            );
        }

        return item[field];
    }, []);
    return (
        <div id="program_page">
            <Loading isLoading={isPending} />

            <div className="flex-none w-full max-w-full  mt-6">
                <TableCommon
                    data={dataProgram || []}
                    parseFunction={parseData}
                    columns={columnsAdminTable}
                    isShowPaging
                    className="shadow-md rounded-2xl"
                />
            </div>
        </div>
    );
}

export default ListProgramRejected;
