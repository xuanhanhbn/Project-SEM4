/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { paymentReturnApi } from './callApi';
import { useMutation } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import Loading from '~/components/Loading';
import { postApiDefault } from '~/utils/api';
import Firework from './components/FileWork';
// import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { exchangeRateMoney } from '~/utils/constant';

function ThanksPage() {
    const location = useLocation();
    // const { width, height } = useWindowSize();
    // useEffect(() => {
    //     if (location) {
    //         const searchParams = new URLSearchParams(location.search);
    //         const amount = searchParams.get('vnp_Amount');
    //         const programId = searchParams.get('ProgramId');
    //         const paymentMethod = searchParams.get('payment_Method');
    //         const dataRequest = {
    //             amount: amount,
    //             programId: programId,
    //             paymentMethod: paymentMethod,
    //         };
    //         const [api1Response, api2Response] = await Promise.all([
    //             axios.get(`api_url_1?param1=${vnpAmount}&param2=${programId}`),
    //             axios.get(`api_url_2?param1=${paymentId}&param2=${token}`),
    //             // Add more API calls as needed
    //           ]);

    //         return fetchData();
    //     }
    //     return null;
    // }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const amount = searchParams.get('vnp_Amount');
        const programId = searchParams.get('ProgramId');
        const paymentMethod = searchParams.get('payment_Method');
        const dataRequest = {
            amount: paymentMethod === 'VNPay' ? amount / exchangeRateMoney : amount,
            programId: programId,
            paymentMethod: paymentMethod,
        };
        mutationThanksForDonate(dataRequest);
    }, []);

    const { mutate: mutationThanksForDonate, isPending } = useMutation({
        mutationFn: paymentReturnApi,
        onSuccess: (res) => {
            if ((res && res?.status === 200) || res?.status === '200') {
            }
            return notify(res?.response?.data, 'error');
        },
    });

    return (
        <div id="thank_page">
            <Loading isLoading={isPending} />
            <Confetti />
            <div className="h-screen content">
                <div className="wrapper-1">
                    <div className=" wrapper-2">
                        <h1>Thank you !</h1>
                        <p>Thanks for your participation in our program. </p>
                        <p>you should receive a confirmation email soon </p>
                        <Link to="/" className="mt-10 go-home">
                            go home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThanksPage;
