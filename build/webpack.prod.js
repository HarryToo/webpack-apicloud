const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = merge(common, {
    mode: 'production',
    resolve: {
        alias: {
            '$vue': 'vue/dist/vue.min.js'
        }
    },
    plugins: [
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['../../static/script/api.js', '../../static/script/autoSize.js', '../../static/css/iconfont.css', '../../static/css/api.css'],
            append: false
        })
    ]
});