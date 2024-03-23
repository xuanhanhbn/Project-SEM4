import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import banner from '~/assets/images/banner/Give-AID.png';
import logo from '~/assets/images/logo/tải xuống.png';
import { getAllPartnerApi } from './callApi';
import { notify } from '~/utils/common';

function PartnerPage() {
    const [dataAllPartner, setDataAllPartner] = useState([]);

    // call api
    const { mutate: mutationGetAllPartner } = useMutation({
        mutationFn: getAllPartnerApi,
        onSuccess: (data) => {
            if ((data && data?.status === 200) || data?.status === '200') {
                setDataAllPartner(data?.data);
            }
            return notify(data?.message, 'error');
        },
    });

    //
    useEffect(() => {
        mutationGetAllPartner();
    }, []);

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

                <div className="grid-cols-4 gap-8 px-5 mx-5 md:grid ">
                    {!dataAllPartner
                        ? null
                        : dataAllPartner.map((data) => {
                              return (
                                  <Link
                                      to={`/partner/detail/${data.partnerId}`}
                                      key={data?.partnerId}
                                      className="max-w-xs p-2 mb-8 duration-150 bg-gray-400 rounded-lg shadow cursor-pointer md:mb-0 hover:scale-105 hover:shadow-md"
                                  >
                                      <img
                                          className="object-cover object-center w-full h-32 bg-center rounded-lg"
                                          src={data?.attachment[0]?.url}
                                          alt={data?.partnerName + '_logo'}
                                      />
                                      <p className="pl-4 my-4 font-bold text-black">{data?.partnerName}</p>
                                  </Link>
                              );
                          })}
                </div>
            </div>
        </div>
    );
}

export default PartnerPage;
