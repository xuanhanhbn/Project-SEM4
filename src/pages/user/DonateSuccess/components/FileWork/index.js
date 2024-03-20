// Firework.js

import React, { useEffect } from 'react';
import './Firework.css';

const Firework = () => {
    useEffect(() => {
        createFirework();
    }, []);

    const createFirework = () => {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = `${Math.random() * window.innerWidth}px`;
        firework.style.top = `${Math.random() * window.innerHeight}px`;
        document.body.appendChild(firework);

        setTimeout(() => {
            document.body.removeChild(firework);
        }, 1000);
    };

    return null; // Animation được tạo ra sẽ tự biến mất sau 1 giây
};

export default Firework;
