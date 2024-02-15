// Please do not use the array form (like ['tailwindcss', 'postcss-preset-env'])
// it will create an unexpected error: Invalid PostCSS Plugin found: [0]

module.exports = {
    plugins: [
        require('postcss-import'),
        require('tailwindcss/nesting')(require('postcss-nesting')),
        require('autoprefixer'),
        require('tailwindcss'),
    ],
};
