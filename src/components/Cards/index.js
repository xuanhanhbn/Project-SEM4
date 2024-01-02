import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';

export default function CardCustom(props) {
    const { cardTitle, cardImage, target, supporteds, progressValue, progressPercentage, to, status } = props;
    return (
        <Link to={to} className="card">
            <h1 className="card_title">{cardTitle}</h1>
            <div className="card_btn ">Read more</div>
            <div className="relative ">
                <img className="card_image" alt="Palestine" src={cardImage} />
            </div>

            <div className="my-4">
                <div className="flex flex-row">
                    {status === 'done' ? null : (
                        <div className="col">
                            <i className="text-xl fa-sharp fa-thin fa-bullseye-arrow"></i>
                            <p className="ml-2 text-xs">{target}</p>
                        </div>
                    )}
                    <div className="col_3">
                        <i className="text-xl fa-light fa-user-group"></i>
                        <p className="ml-2 text-sm">{supporteds}</p>
                    </div>
                </div>
                <div className="min-h-[12px]">
                    {status === 'done' ? null : (
                        <div className="h-1 mx-auto mt-2 bg-gray-400 rounded-sm">
                            <div className="w-10/12 h-1 mt-4 bg-blue-100 rounded-sm"></div>
                        </div>
                    )}
                </div>
                <div className="flex justify-between mx-auto mt-2">
                    <div className="text_1">{progressValue}</div>
                    {status === 'done' ? null : <div className="text_2">{progressPercentage}</div>}
                </div>
            </div>
            <button className="bg-orange-100 border-orange-100 rounded-lg w-full font-semibold text-sm p-[.75rem_1rem_.8125rem]">
                Donate now
            </button>
        </Link>
    );
}
