/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import { paymentReturnApi } from './callApi';
import { useMutation } from '@tanstack/react-query';
import { notify } from '~/utils/common';
import Loading from '~/components/Loading';
import Confetti from 'react-confetti';
import { exchangeRateMoney } from '~/utils/constant';

function ThanksPage() {
    const location = useLocation();
    const [programId, setProgramId] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const amount = searchParams.get('vnp_Amount');
        const programId = searchParams.get('ProgramId');
        const paymentMethod = searchParams.get('paymentMethod');
        setProgramId(programId);
        const dataRequest = {
            amount: paymentMethod === 'VNPay' ? amount / 100 / exchangeRateMoney : amount,
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
                        <Link to={`/campaign-detail/${programId}`} className="mt-10 go-home">
                            Go home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThanksPage;
