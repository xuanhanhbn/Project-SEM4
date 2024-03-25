/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, List, Progress } from 'antd';
import React, { useEffect, useState } from 'react';
import logoPartner from '~/assets/images/avatar/default-avatar.jpg';
import './style.css';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { getPartnerDetailApi } from './callApi';
import { notify } from '~/utils/common';
import moment from 'moment';
import VirtualList from 'rc-virtual-list';

const ContainerHeight = 400;
function PartnerDetail() {
    const params = useParams();

    const [dataDetail, setDataDetail] = useState([]);
    const [dataProgram, setDataProgram] = useState([]);

    // call api
    const { mutate: mutationGetAllPartner } = useMutation({
        mutationFn: getPartnerDetailApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                setDataDetail(data?.data);
                setDataProgram(data?.data?.programs);
            }
            return notify(data?.message, 'error');
        },
    });

    useEffect(() => {
        mutationGetAllPartner(params?.partnerId);
    }, []);

    // nếu không có logo thì lấy ảnh mặc định
    const urlLogo = dataDetail?.attachment?.length > 0 ? dataDetail?.attachment[0]?.url : logoPartner;

    // render item program của partner
    // const RENDER_PROGRAM = (item) => {
    //     const imageUrl = item.attachment[0].url;
    //     return (
    //         <Link to="/partner/detail" key={item?.programId} className="w-full md:flex">
    //             <img
    //                 className="object-cover object-center w-full h-32 bg-center rounded-lg md:w-2/5"
    //                 src={imageUrl}
    //                 //   alt={data?.partnerName + '_logo'}
    //                 alt=""
    //             />
    //             <div className="flex-grow md:ml-6 asphalt-text-style">
    //                 <strong className="md:line-clamp-2 line-clamp-1 md:w-72">
    //                     program name program nameprogram nameprogram nameprogram name
    //                 </strong>
    //                 <div className="hidden md:block">
    //                     <p className=" line-clamp-3 w-72">
    //                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
    //                         dictum interdum, nisi lorem egestas vitae scel erisque enim ligula venenatis dolor.
    //                     </p>
    //                 </div>
    //             </div>
    //         </Link>
    //     );
    // };

    const onScroll = (e) => {
        // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
            console.log('call api');
        }
    };

    const handleReturnLogoImg = (data) => {
        if (Array.isArray(data) && data?.length > 0) {
            const filterLogo = data.filter((obj) => obj?.type === 'Logo');
            return filterLogo[0]?.url;
        }
        return '';
    };
    const handleCaculator = (item) => {
        const target = item?.target || 0;
        const total = item?.totalMoney || 0;
        if (target && total) {
            const result = (total / target) * 100;
            if (result >= 100) {
                return 100;
            }
            return result;
        }
        return 0;
    };

    const handleReturnClassStatus = (item) => {
        if (item) {
            if (item === 'Active') {
                return 'text-green-500';
            }
            return 'text-red-600';
        }
    };
    return (
        <div id="modal-detail">
            <div className="partner-popup">
                <div className="partner-popup__header">
                    <div className="flex flex-wrap items-center justify-start md:flex-nowrap">
                        <img className="w-40 h-24 mb-6 partner-popup__logo md:mb-0 rounded" src={urlLogo} alt="" />
                        <div className="partner-popup__company md:h-24">
                            <h2 className="partner-popup__title">{dataDetail?.partnerName}</h2>
                            <div className="partner-popup__content">
                                <div className="mt-2 asphalt-text-style md:mt-4">
                                    <p>
                                        <strong>Email:</strong>
                                        {dataDetail?.email}
                                    </p>
                                </div>
                                <div className="mt-2 asphalt-text-style md:mt-4">
                                    <p>
                                        <strong>Created At:</strong>
                                        {dataDetail?.createdAt
                                            ? moment(dataDetail?.createdAt)?.format('DD/MM/YYYY')
                                            : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`flex-grow overflow-hidden partner-popup__sidebar asphalt-text-style ${
                        dataProgram?.length > 0 ? '' : 'hidden'
                    }`}
                >
                    <div className="bg-white ">
                        <div>
                            <h2 className="partner-popup__title mb-4">List Program</h2>
                        </div>
                        <div>
                            <List>
                                <VirtualList
                                    data={dataDetail?.programs || []}
                                    height={ContainerHeight}
                                    itemHeight={47}
                                    itemKey="email"
                                    onScroll={onScroll}
                                >
                                    {(item) => {
                                        return (
                                            <List.Item key={item.programId}>
                                                <div className="flex w-full">
                                                    <div className="w-3/12 ">
                                                        <img
                                                            className="rounded"
                                                            src={handleReturnLogoImg(item?.attachment)}
                                                            alt={item?.programName}
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between w-full ml-4">
                                                        <div>
                                                            <a
                                                                href={`/campaign-detail/${item?.programId}`}
                                                                className="partner-popup__title mb-2"
                                                            >
                                                                {item?.programName}
                                                            </a>
                                                            <div>
                                                                <strong>Created At:</strong>
                                                                {item?.createdAt
                                                                    ? moment(item?.createdAt)?.format('DD/MM/YYYY')
                                                                    : ''}
                                                            </div>
                                                            <Divider />
                                                            <div className="flex items-center">
                                                                <Progress
                                                                    percent={handleCaculator(item)}
                                                                    // showInfo={false}
                                                                />
                                                            </div>
                                                        </div>
                                                        <h5
                                                            className={`w-3/12 text-lg	font-semibold	 ${handleReturnClassStatus(
                                                                item?.status,
                                                            )}`}
                                                        >
                                                            {item.status}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </List.Item>
                                        );
                                    }}
                                </VirtualList>
                            </List>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartnerDetail;
