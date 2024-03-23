import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { onGetDetailProgram } from './callApi';
import { notify } from '~/utils/common';
import moment from 'moment';
import CardImg from '~/assets/images/campaigns/drc2_homecard.jpg';
import { Button } from 'antd';

function ProgramDetailForAdmin() {
    const params = useParams();

    const ref = useRef();
    const [dataProgram, setDataProgram] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);

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

    const indexOfSecondPeriod = dataProgram?.description?.indexOf('.', dataProgram?.description?.indexOf('.') + 1);

    const hiddenText = dataProgram?.description?.slice(0, indexOfSecondPeriod + 1);
    const longText = dataProgram?.description?.slice(indexOfSecondPeriod + 2);

    console.log('dataProgram: ', dataProgram);

    return (
        <div id="campaignDetail" ref={ref}>
            {/* <Loading isLoading={isPending || isPendingDonate} /> */}
            <h1 className="mb-12 text-4xl font-bold leading-10 ">{dataProgram?.programName}</h1>
            {/* <div></div> */}
            <div className="grid grid-rows-1 md:flex">
                <div className="lg:w-7/12">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 ">
                            <div className="relative px-4 my-auto z-[1] ">
                                <img
                                    src={
                                        dataProgram && dataProgram?.attachment?.length > 0
                                            ? dataProgram?.attachment[0]?.url
                                            : CardImg
                                    }
                                    alt={dataProgram?.programName}
                                    className="w-full max-h-96 rounded-2xl"
                                />
                            </div>
                            <div className="mt-[-25%] pt-[25%] bg-white border-gray-400 rounded-2xl border-[.0625rem] flex flex-col relative">
                                <div className="p-5 grid md:grid-cols-3 grid-cols-2 gap-4 shrink basis-auto md:px-16 md:pt-9 md:pb-10 lg:px-[4rem]">
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Start date: </span>{' '}
                                        {dataProgram?.startDonateDate}
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">End date:</span> {dataProgram?.endDonateDate}
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Finish date:</span> {dataProgram?.finishDate}
                                    </div>
                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Target:</span> {dataProgram?.target}
                                    </div>

                                    <div className="flex-col text-start">
                                        <span className="font-semibold">Field:</span> Children
                                    </div>
                                    <div
                                        className={`flex-col p-3 text-sm font-semibold text-white bg-blue-500 text-start ${
                                            dataProgram?.recruitCollaborators ? '' : 'hidden'
                                        }`}
                                    >
                                        {dataProgram?.recruitCollaborators ? 'Recruit Collaborators' : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="p-5 text-left bg-white rounded-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold leading-8 ">Overview</h2>
                            </div>
                            <p className="mb-6 text-sm font-semibold leading-6">
                                Shared meals will provide emergency food assistance to families in Palestine.
                            </p>
                            <div>
                                <p className="text-sm leading-6 text-gray-100"></p>

                                <div className="content">
                                    <p className="text-sm leading-6 text-gray-100">
                                        {hiddenText}
                                        <span className={`long-text ${isExpanded ? 'expanded' : ''}`}>{longText}</span>
                                    </p>
                                </div>
                                <button
                                    className="flex justify-start w-full text-blue-500 moreless-button hover:text-blue-700"
                                    onClick={() => setIsExpanded((prev) => !prev)}
                                >
                                    Read more
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 md:w-5/12 md:pr-4 md:pl-11 md:mt-0">
                    <div className="sticky py-6 bg-white top-24 rounded-2xl">
                        <div className="flex items-center justify-around mb-5">
                            <h3 className="text-2xl font-bold leading-8 ">Program Partner</h3>
                        </div>
                        <div className="grid grid-rows-1 gap-4 px-6 pt-3 text-left">
                            <div>
                                <div className="text-base font-medium">Partner name:</div>
                                <div className="mt-1 text-lg font-semibold text-gray-100">
                                    {dataProgram?.partner?.partnerName}
                                </div>
                            </div>
                            <div>
                                <div className="text-base font-medium">Partner email:</div>
                                <div className="mt-1 text-lg font-semibold text-gray-100">
                                    {dataProgram?.partner?.email}
                                </div>
                            </div>
                            <div className={dataProgram?.status === 'DeActive' ? '' : 'hidden'}>
                                <div className="text-base font-medium">Request:</div>
                                <div className="mt-1 text-gray-100">
                                    <span className="font-medium text-black">{dataProgram?.partner?.partnerName}</span>{' '}
                                    has submitted a request for approval of the
                                    <span className="font-medium text-black"> {dataProgram?.programName}</span> program.
                                    Respond using the options below.
                                </div>
                                <div className="flex justify-around mt-6">
                                    <Button className="w-2/5 text-blue-100 border-blue-100">accpet </Button>
                                    <Button type="primary" className="w-2/5" danger>
                                        reject
                                    </Button>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgramDetailForAdmin;
