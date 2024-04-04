/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '~/assets/images/banner/Give-AID.png';
import { getAllPartnerApi } from './callApi';
import { notify } from '~/utils/common';
import { Card, List } from 'antd';
import moment from 'moment';

function PartnerPage() {
    const [dataAllPartner, setDataAllPartner] = useState([]);
    const navigation = useNavigate();

    // call api
    const { mutate: mutationGetAllPartner } = useMutation({
        mutationFn: getAllPartnerApi,
        onSuccess: (res) => {
            if (res && res?.status === 200 && res?.data?.length > 0) {
                const filterPartner = res?.data?.filter((item) => item.status === 'Active');
                return setDataAllPartner(filterPartner);
            }
            return notify(res?.message, 'error');
        },
    });

    //
    useEffect(() => {
        mutationGetAllPartner();
    }, []);

    const handleReturnTotalProgram = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            const filterProgram = data?.filter((item) => item.status === 'Active' || item.status === 'End');
            return filterProgram?.length || 0;
        }
        return 0;
    };

    return (
        <div id="partner-page">
            <div className="">
                {/* phần banner  */}
                <div className="pt-20 md:grid md:grid-cols-2 ">
                    <div className="flex flex-col justify-center md:px-12">
                        <div className="mb-4 text-5xl md:text-6xl md:font-bold md:leading-[4.5rem] font-medium leading-[3.5rem] ">
                            Partner with Give-AID
                        </div>
                        <div className="mb-4 font-medium text-gray-100">
                            Join forces with the platform trusted by over 450,000 industry leaders. Become an accredited
                            Give-AID Services Partner.
                        </div>
                    </div>
                    <div>
                        <img src={banner} className="rounded-lg" alt="" />
                    </div>
                </div>
            </div>

            {/* phần list partner */}
            <div className="pb-8 bg-white ">
                <div className="p-8 text-4xl font-medium">Meet our Integration Partners</div>
                <div className="px-5 mx-5">
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={dataAllPartner}
                        pagination={{
                            align: 'center',
                        }}
                        renderItem={(item) => (
                            <List.Item onClick={() => navigation(`/partner/detail/${item.partnerId}`)}>
                                <Card title={item?.partnerName}>
                                    <img
                                        className="object-cover object-center w-full h-44 bg-center rounded-lg"
                                        src={item?.attachment[0]?.url}
                                        alt={item?.partnerName + '_logo'}
                                    />
                                    <div className="mt-4">
                                        <div>
                                            <strong>Total Program: </strong>
                                            {handleReturnTotalProgram(item?.programs)}
                                        </div>
                                        <div>
                                            <strong>Partner created At: </strong>
                                            {item.createdAt ? moment(item?.createdAt).format('DD/MM/YYYY') : ''}
                                        </div>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default PartnerPage;
