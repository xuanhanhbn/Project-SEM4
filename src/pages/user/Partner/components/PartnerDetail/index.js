import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import logo from '~/assets/images/logo/black-logo.png';
import logoPartner from '~/assets/images/avatar/default-avatar.jpg';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { getPartnerDetailApi } from './callApi';
import { notify } from '~/utils/common';

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
    const RENDER_PROGRAM = (item) => {
        const imageUrl = item.attachment[0].url;
        return (
            <Link to="/partner/detail" key={item?.programId} className="w-full md:flex">
                <img
                    className="object-cover object-center w-full h-32 bg-center rounded-lg md:w-2/5"
                    src={imageUrl}
                    //   alt={data?.partnerName + '_logo'}
                    alt=""
                />
                <div className="flex-grow md:ml-6 asphalt-text-style">
                    <strong className="md:line-clamp-2 line-clamp-1 md:w-72">
                        program name program nameprogram nameprogram nameprogram name
                    </strong>
                    <div className="hidden md:block">
                        <p className=" line-clamp-3 w-72">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et
                            dictum interdum, nisi lorem egestas vitae scel erisque enim ligula venenatis dolor.
                        </p>
                    </div>
                </div>
            </Link>
        );
    };

    // cắt ra 4 phần tử đầu tiên trong mảng datatProgram
    const renderedPrograms = dataProgram.slice(0, 4).map((data) => RENDER_PROGRAM(data));

    return (
        <div id="modal-detail">
            <div className="partner-popup">
                <div className="partner-popup__header">
                    <div className="flex flex-wrap items-center justify-start md:flex-nowrap">
                        <img className="w-40 h-24 mb-6 partner-popup__logo md:mb-0" src={urlLogo} alt="" />
                        <div className="partner-popup__company md:h-24">
                            <h2 className="partner-popup__title">{dataDetail?.partnerName}</h2>
                        </div>
                    </div>
                </div>
                <div className="partner-popup__content">
                    <div className="mt-2 md:mt-6">
                        <h3 className="hidden partner-popup__subtitle md:block">About Us</h3>
                        <p>{dataDetail?.description}</p>
                        <hr className="block md:hidden"></hr>
                    </div>
                    <div className="mt-2 asphalt-text-style md:mt-4">
                        <h3 className="partner-popup__subtitle">Contact Us</h3>
                        <p>
                            <strong>Email:</strong>
                            {dataDetail?.email}
                        </p>
                    </div>
                </div>
                <div
                    className={`flex-grow overflow-hidden partner-popup__sidebar asphalt-text-style ${
                        dataProgram?.length > 0 ? '' : 'hidden'
                    }`}
                >
                    <div className="bg-white md:pl-10">
                        <div className="grid grid-cols-1 gap-6 ">
                            <Link
                                to="/campaigns"
                                className="hidden font-medium text-right hover:text-blue-500 md:block"
                            >
                                See All Programs <i className="fa-solid fa-bars-progress"></i>
                            </Link>

                            {renderedPrograms.map((item) => item)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartnerDetail;
