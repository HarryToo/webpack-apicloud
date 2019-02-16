const path = require('path');
const os = require('os');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 开发环境本地地址
function getLocalHost() {
    let IPAddress = '';
    const interfaces = os.networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                IPAddress = alias.address;
            }
        }
    }
    return IPAddress;
}

module.exports = merge(common, {
    mode: 'development',
    entry: {devRefreshBtn: './src/assets/devRefreshBtn.js'},
    output: {
        publicPath: '/script/'
    },
    resolve: {
        alias: {
            '$vue': 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: '[name].[ext]',
                            outputPath: (url, resourcePath, context) => {
                                let path = resourcePath.replace(/\\/g, '/');
                                let p = path.substring(path.indexOf('src/views') + 10);
                                return `images/${p}`;
                            },
                            publicPath: (url, resourcePath, context) => {
                                let path = resourcePath.replace(/\\/g, '/');
                                let p = path.substring(path.indexOf('src/views/') + 10);
                                return `/script/images/${p}`;
                            }
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: [path.resolve(__dirname, '../dist'), path.resolve(__dirname, '../static')],
        compress: true,
        inline: true,
        hot: true,
        host: '0.0.0.0',
        port: 8888
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(__dirname, '../dist/views')
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['script/api.js', 'script/autoSize.js', 'css/iconfont.css', 'css/api.css'],
            publicPath: '/',
            append: false
        }),
        new webpack.DefinePlugin({
            'LOCALHOST': JSON.stringify(getLocalHost())
        }),
        new ProgressBarPlugin({
            stream: process.stdout,
            clear: false,
            callback() {
                setTimeout(() => {
                    console.log('\n\033[42;37m Server \033[47;32m ( •̀ ω •́ )y   开发服务运行中：http://localhost:8888 \033[0m\n');
                }, 500);
            }
        })
    ]
});