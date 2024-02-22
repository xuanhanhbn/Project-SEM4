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
// import messAvater from '~/assets/images/avatar/avatar.png';

// <--------- compare payment methods ---------->

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// <--------- and compare payment methods ---------->

function Dashboard() {
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
            <h1 className="my-6 text-xl font-bold">Dashboard</h1>
            <div className="flex flex-wrap -mx-3">
                {/* thẻ tổng hợp theo ngày */}
                {todayCardData.map((data) => RENDER_TODAY_CARD(data))}

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
                    {/* <div className="w-full max-w-full px-3 mt-6 lg:w-1/3 lg:flex-none">
                        <div className="list_completed_donate">
                            <div className="list_completed_header">
                                <div className="flex flex-wrap -mx-3">
                                    <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                                        <h6 className="mb-0">Conversations</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-auto p-4 pb-0">
                                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li className="mess_box_container">
                                        <div className="mess_box_header">
                                            <img
                                                src={messAvater}
                                                alt="kal"
                                                className="w-full shadow-soft-2xl rounded-xl"
                                            />
                                        </div>
                                        <div className="flex flex-col items-start justify-center">
                                            <h6 className="mb-0 text-sm leading-normal">Sophie B.</h6>
                                            <p className="mb-0 text-xs leading-tight">Hi! I need more information..</p>
                                        </div>
                                        <button className="mess_rep_btn">Reply</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
