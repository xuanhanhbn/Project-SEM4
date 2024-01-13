import React, { useCallback } from 'react';
import { todayCardData, optionsChartLine, linePaymentData, columns, fakeDataTable } from './constants';
import './Dashboard.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TableCommon from '~/components/TableCommon';

// <--------- compare payment methods ---------->

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// <--------- and compare payment methods ---------->

function Dashboard() {
    // render thẻ thông số theo ngày
    const renderTodayCard = (data) => {
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
                                    <h5 className="mb-0 font-bold">{data.todayAmount}</h5>
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

    // render data table
    const parseData = useCallback((item, field, index) => {
        if (field === 'completion') {
            return (
                <div id="completion">
                    <div>
                        <div>
                            <span class="text-xs font-semibold leading-tight">60%</span>
                        </div>
                    </div>
                    <div class="text-xs m-0 flex overflow-visible rounded-lg bg-gray-200">
                        <div
                            class="completion_"
                            // role="progressbar"
                            // aria-valuenow="10"
                            // aria-valuemin="0"
                            // aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            );
        }

        return item[field];
    }, []);

    return (
        <div id="dasboard">
            <h1 className="my-6 text-xl font-bold">Dashboard</h1>
            <div className="flex flex-wrap -mx-3">
                {/* thẻ tổng hợp theo ngày */}
                {todayCardData.map((data) => renderTodayCard(data))}

                <div className="flex-1 w-full mt-12 ">
                    <div className="w-full max-w-full px-3 mt-0 lg:flex-none">
                        <div className="das_chart_container">
                            <div className="das_chart_header">
                                <h6>Payment methods overview</h6>
                                <p className="text-sm leading-normal">
                                    <i className="fa fa-arrow-up text-lime-500"></i>
                                    <span className="font-semibold">4% more</span> in 2023
                                </p>
                            </div>
                            <div className="flex-auto p-4">
                                <div className="h-full">
                                    {/* bảng so danh lương thanh toán qua 2 phương thức paypal và card */}
                                    <Line options={optionsChartLine} data={linePaymentData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap w-full ">
                    <div className="flex-1 pl-3 mt-6 ">
                        <TableCommon
                            data={fakeDataTable || []}
                            parseFunction={parseData}
                            columns={columns}
                            isShowPaging
                            className="shadow-md rounded-2xl"
                        />
                    </div>
                    <div class="w-full max-w-full px-3 mt-6 lg:w-1/3 lg:flex-none">
                        <div class="list_completed_donate">
                            <div class="list_completed_header">
                                <div class="flex flex-wrap -mx-3">
                                    <div class="flex items-center flex-none w-1/2 max-w-full px-3">
                                        <h6 class="mb-0">Campaign completed</h6>
                                    </div>
                                    <div class="flex-none w-1/2 max-w-full px-3 text-right">
                                        <button class="view_all_btn">View All</button>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-auto p-4 pb-0">
                                <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li class="campaign_completed_item">
                                        <div class="flex flex-col">
                                            <h6 class="mb-1 font-semibold leading-normal text-sm text-slate-700">
                                                March, 01, 2020
                                            </h6>
                                            <span class="leading-tight text-xs">#MS-415646</span>
                                        </div>
                                        <div class="flex items-center leading-normal text-sm">
                                            $18.000
                                            <button class="download_pdf_btn">
                                                <i class="mr-1 fas fa-file-pdf text-lg"></i> PDF
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
