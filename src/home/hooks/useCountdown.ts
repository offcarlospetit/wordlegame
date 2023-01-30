import { useEffect, useRef, useState } from 'react';

const useCountdown = (targetDate: luxon.DateTime, turnOffInterval: boolean) => {
    const countDownDate = targetDate.toMillis();
    let intervalRef = useRef<NodeJS.Timeout>();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    let interval: NodeJS.Timeout;

    useEffect(() => {
        if (!turnOffInterval)
            intervalRef.current = setInterval(() => {
                setCountDown(countDownDate - new Date().getTime());
            }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    const stopInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    return { values: getReturnValues(countDown), stopInterval };
};

const getReturnValues = (countDown: number) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
};

export default useCountdown;