import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }) => {
    // console.log('targetDate: ', targetDate);
    const calculateTimeLeft = () => {
        const difference = new Date(targetDate) - new Date();
        // console.log('new Date(targetDate): ', new Date(targetDate));
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const addLeadingZero = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    return (
        <div>
            <div>Comming Soon...</div>
            <div>
                {timeLeft.days} days {addLeadingZero(timeLeft.hours)}:{addLeadingZero(timeLeft.minutes)}:
                {addLeadingZero(timeLeft.seconds)}
            </div>
        </div>
    );
};

export default CountdownTimer;
