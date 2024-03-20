import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onGetDetailProgram } from './callApi';
import { notify } from '~/utils/common';

function ProgramDetailForAdmin() {
    const params = useParams();

    const ref = useRef();
    const [dataProgram, setDataProgram] = useState({});

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        if (params && params?.programId) {
            async function fetchData() {
                // You can await here
                const response = await handleGetDetail(params?.programId);
                return response;
                // ...
            }
            fetchData();
        }
    }, [params]);

    const { mutate: handleGetDetail, isPending } = useMutation({
        mutationFn: onGetDetailProgram,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                return setDataProgram(res?.data);
            }
            return notify(res?.message, 'error');
        },
    });

    console.log('dataProgram: ', dataProgram);

    return <div ref={ref}>ProgramDetailForAdmin</div>;
}

export default ProgramDetailForAdmin;
