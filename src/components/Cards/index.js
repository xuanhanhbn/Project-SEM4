import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';
import { handleCheckStartDonateDate } from '~/utils/common';
import CountdownTimer from '../CountdownTimer';
import moment from 'moment';
import { Progress } from 'antd';

export default function CardCustom(props) {
    const { id, cardTitle, cardImage, targetProgram, totalMoneyProgram, supporteds, to, status, startDonateDate } =
        props;

    const handleCaculator = () => {
        const target = targetProgram || 0;
        const total = totalMoneyProgram || 0;
        if (target && total) {
            const result = (total / target) * 100;
            if (result >= 100) {
                return 100;
            }
            return result;
        }
        return 0;
    };

    const handleReturnClassName = () => {
        if (status === 'End') {
            return 'border border-orange-100 text-orange-500 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem]';
        }
        return 'bg-orange-100 border-orange-100 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem]';
    };

    return (
        <Link to={`${to}/${id}`} className="card">
            <h1 className="card_title">{cardTitle}</h1>
            {/* <div className="card_btn ">Read more</div> */}
            <div className="relative ">
                <img className="card_image" alt="Palestine" src={cardImage} />
            </div>

            <div className="my-4">
                <div className="flex flex-row">
                    <div className="col">
                        <i className="text-xl fa-sharp fa-thin fa-bullseye-arrow"></i>
                        <p className="ml-2 text-xs">{targetProgram ? targetProgram.toLocaleString() : 0} $</p>
                    </div>
                    <div className="flex w-full justify-end">
                        <i className="text-xl fa-light fa-user-group"></i>
                        <p className="ml-2 text-sm">{supporteds ? supporteds : 0} volunteer</p>
                    </div>
                </div>

                <div className="flex justify-between mx-auto mt-2">
                    <Progress percent={handleCaculator()} />
                </div>
            </div>
            {handleCheckStartDonateDate(startDonateDate) ? (
                <div className="flex items-center justify-center">
                    <CountdownTimer targetDate={moment(startDonateDate)?.format('YYYY/MM/DD')} />
                </div>
            ) : (
                <button disabled={status === 'End' ? true : false} className={handleReturnClassName()}>
                    {status === 'End' ? 'Program End' : 'Donate now'}
                </button>
            )}
        </Link>
    );
}
