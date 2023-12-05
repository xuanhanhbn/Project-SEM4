/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        fontSize: {
            xxs: '0.6rem',
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
        },
        extend: {
            colors: {
                primary: {
                    100: '#FFF3F0',
                    200: '#FF9182',
                    999: '#FF452D',
                },
                gray: {
                    100: '#687781',
                    200: '#d9dddf',
                    300: '#e2e8f0',
                    400: '#f2f4f4',
                    450: '#6b6b76',
                    500: '#a0aec0',
                    600: '#718096',
                    700: '#031c2d1a',
                    800: '#2d3748',
                    900: '#1a202c',
                },
                blue: {
                    100: '#007dbc',
                    200: '#bee3f8',
                    300: '#90cdf4',
                    400: '#63b3ed',
                    500: '#4299e1',
                    600: '#00b485',
                    700: '#2b6cb0',
                    800: '#b4e3f6',
                    900: '#2a4365',
                },
                orange: {
                    100: '#fec629',
                    200: '#febb00',
                    300: '#ff6b57',
                    400: '#ff6551',
                    450: '#fc5b00',
                    500: '#f0794a',
                    550: '#fc3f00',
                    600: '#FF452D',
                },
                pink: {
                    100: '#FFF3F0',
                    200: '#ffdddb',
                },
                grey: {
                    100: '#686868',
                    200: 'rgba(255, 255, 255, 0.2)',
                    300: '#666666',
                },
                dark: {
                    100: 'rgb(0, 0, 0, 0.1)',
                    200: '#031c2d',
                    300: '#003669',

                    900: 'rgb(0, 0, 0, 1)',
                },
            },
            aspectRatio: {
                '4/3': '4 / 3',
            },
        },
    },
    plugins: ['@tailwindcss/aspect-ratio'],
};
