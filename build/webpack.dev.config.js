/**
 * 本地预览
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}
module.exports = merge(webpackBaseConfig, {
    // 入口
    entry: {
        main: './example/main',
        vendors: ['vue', 'vue-router']
    },
    // 输出
    output: {
        path: path.join(__dirname, '../example/dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js'
            // vue: 'vue/dist/vue.runtime.js'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendor.bundle.js' }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../example/dist/index.html'),
            template: path.join(__dirname, '../example/index.html')
        }),
        new FriendlyErrorsPlugin(),
        new CleanWebpackPlugin(['dist/vue-admin-components.js'], {
            'root': path.resolve(__dirname, '../')
        })
    ]
});
