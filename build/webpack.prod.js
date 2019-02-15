const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    resolve: {
        alias: {
            '$vue': 'vue/dist/vue.min.js'
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: path.join(__dirname, '../static'), to: path.join(__dirname, '../dist/static')},
            {from: path.join(__dirname, '../config.xml'), to: path.join(__dirname, '../dist/config.xml')}
        ]),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['../static/script/api.js', '../static/script/autoSize.js', '../static/css/iconfont.css', '../static/css/api.css'],
            append: false
        })
    ]
});