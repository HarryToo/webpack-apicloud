module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['iOS >= 8', 'Android >= 6']
        }),
        require('postcss-px2rem')({remUnit: 100})
    ]
};