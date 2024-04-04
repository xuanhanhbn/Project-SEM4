/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { todayCardData, optionsChartLine, linePaymentData, columns, fakeDataTable, totalCardData } from './constants';
import './Dashboard.css';

import ReactApexChart from 'react-apexcharts';
import TableCommon from '~/components/TableCommon';
import { useMutation } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import { getDashboard } from './callApi';
import Loading from '~/components/Loading';
// import messAvater from '~/assets/images/avatar/avatar.png';

function Dashboard() {
    const baseDataRequest = {
        year: '2024',
    };
    const [dataRequest, setDataRequest] = useState(baseDataRequest);
    const [dataResponse, setDataResponse] = useState({});
    const [dataChart, setDataChart] = useState({
        series: [
            {
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            },
            {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            },
            {
                name: 'Free Cash Flow',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },

            fill: {
                opacity: 1,
            },
        },
    });

    // render thẻ thông số theo ngày
    const RENDER_TODAY_CARD = (data) => {
        return (
            <div id="todayCard" key={data.id}>
                <div className="card_container">
                    <div className="flex-auto p-4">
                        <div className="flex flex-row -mx-3">
                            <div className="flex-none w-2/3 max-w-full px-3">
                                <div>
                                    <p className="mb-0 font-sans text-sm font-semibold leading-normal">
                                        {data.cardName}
                                    </p>
                                    <h5 className="mb-0 font-bold">{dataResponse[data?.field]}</h5>
                                </div>
                            </div>
                            <div className="px-3 text-right basis-1/3">
                                <div className="card_icon">
                                    <div className="text-lg relative top-3.5 text-white">{data.cardIcon}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        mutationGetDashboard(dataRequest);
    }, []);

    const { mutate: mutationGetDashboard, isPending } = useMutation({
        mutationFn: getDashboard,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
                let months = res?.data?.combinedData?.map((item) => item.month);
                let series = [];

                let keys = Object.keys(res?.data?.combinedData[0]).filter((key) => key !== 'month');
                keys.forEach((key) => {
                    let seriesData = res?.data?.combinedData.map((item) => item[key].value);
                    series.push({ name: key, data: seriesData });
                });
                setDataResponse((prev) => ({ ...prev, ...res?.data }));
                return setDataChart({
                    series: series,
                    options: {
                        chart: {
                            type: 'bar',
                            height: 350,
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '55%',
                                endingShape: 'rounded',
                            },
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        stroke: {
                            show: true,
                            width: 2,
                            colors: ['transparent'],
                        },
                        xaxis: {
                            categories: months,
                        },
                        fill: {
                            opacity: 1,
                        },
                    },
                });
            }
            return notify(res?.message, 'error');
        },
    });

    // render data table
    const parseData = useCallback((item, field, index) => {
        if (field === 'completion') {
            return (
                <div id="completion">
                    <div>
                        <div>
                            <span className="text-xs font-semibold leading-tight">60%</span>
                        </div>
                    </div>
                    <div className="flex m-0 overflow-visible text-xs bg-gray-200 rounded-lg">
                        <div className="completion_"></div>
                    </div>
                </div>
            );
        }

        return item[field];
    }, []);

    return (
        <div id="dasboard">
            <Loading isLoading={isPending} />
            <h1 className="my-6 text-xl font-bold">Dashboard</h1>
            <div>
                <div className="flex flex-wrap -mx-3 items-center justify-center">
                    {todayCardData.map((data) => RENDER_TODAY_CARD(data))}
                </div>
                <div className="mt-2 flex flex-wrap -mx-3 items-center justify-center">
                    {totalCardData.map((data) => RENDER_TODAY_CARD(data))}
                </div>
                <div className="flex-1 w-full mt-12 ">
                    <div className="w-full max-w-full px-3 mt-0 lg:flex-none">
                        <div className="das_chart_container">
                            {/* <div className="das_chart_header">
                                <h6>Payment methods overview</h6>
                                <p className="text-sm leading-normal">
                                    <i className="fa fa-arrow-up text-lime-500"></i>
                                    <span className="font-semibold">4% more</span> in 2023
                                </p>
                            </div> */}
                            <div className="flex-auto p-4 w-full">
                                <div className="h-full w-full">
                                    <ReactApexChart
                                        options={dataChart.options}
                                        series={dataChart.series}
                                        type="bar"
                                        height="100%"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex flex-wrap w-full ">
                    <div className="flex-1 pl-3 mt-6 ">
                        <TableCommon
                            data={fakeDataTable || []}
                            parseFunction={parseData}
                            columns={columns}
                            isShowPaging
                            className="shadow-md rounded-2xl"
                        />
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Dashboard;
