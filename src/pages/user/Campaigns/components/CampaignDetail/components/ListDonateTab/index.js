import moment from 'moment';
import React from 'react';

function TabListDonate(props) {
    const { dataDetail } = props;
    return (
        <div>
            <div className="flex items-center justify-between">
                <div></div>
                <span>List Donate</span>
                <div className="flex items-center">
                    <button>
                        <i className="fa-light fa-download"></i>
                    </button>
                </div>
            </div>
            {dataDetail &&
                dataDetail?.donations?.length > 0 &&
                dataDetail?.donations?.map((item) => (
                    <div className="flex items-center mt-1" key={item?.donationId}>
                        <div className="mx-2 ">
                            <img
                                className="w-12 rounded-full"
                                src={item?.user?.avatarUrl?.url}
                                alt={item?.user?.avatarUrl?.url}
                            />
                        </div>
                        <div className="w-full mx-2 text-left">
                            <div className="text-lg font-semibold leading-6 text-gray-100">
                                {item?.user?.displayName}
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xs leading-6 text-gray-100 ">
                                    {item?.createdAt ? moment(item?.createdAt)?.format('YYYY-MM-DD HH:mm') : ''}
                                </p>
                                <span className="text-base font-semibold leading-6 text-blue-100">
                                    {item?.amount ? item?.amount?.toLocaleString() : 0} $
                                </span>
                            </div>
                            <div className="bg-slate-400 h-[.5px]"></div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default TabListDonate;
