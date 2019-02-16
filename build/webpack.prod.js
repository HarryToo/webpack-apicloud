const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StringDecoder = require('string_decoder').StringDecoder;
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const decoder = new StringDecoder('utf8');

module.exports = merge(common, {
    mode: 'production',
    resolve: {
        alias: {
            '$vue': 'vue/dist/vue.min.js'
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../static'),
                to: path.join(__dirname, '../dist/static')
            },
            {
                from: path.join(__dirname, '../config.xml'),
                to: path.join(__dirname, '../dist/config.xml'),
                transform(content, path) {
                    return decoder.write(Buffer.from(content)).replace(/http:\/\/.*:8888\/index.html/, 'index.html');
                }
            }
        ]),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['../static/script/api.js', '../static/script/autoSize.js', '../static/css/iconfont.css', '../static/css/api.css'],
            append: false
        }),
        new ProgressBarPlugin({
            stream: process.stdout,
            clear: false,
            callback() {
                setTimeout(() => {
                    console.log('\n\033[42;30m done \033[40;32m ( •̀ ω •́ )y   生产代码构建完成 \033[5m');
                }, 500);
            }
        })
    ]
});