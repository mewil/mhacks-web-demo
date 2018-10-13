
let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let lifecycleEvent = process.env.npm_lifecycle_event;

let devConfig = {
    entry: ['babel-polyfill', './app/app.jsx'],
    output: {
        publicPath: '/',
        path: path.resolve('./build'),
        filename: 'js/app.js'
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        modules: ['web_modules', 'node_modules', 'app', 'static'],
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Build',
            template: './app/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        })
    ],
};

module.exports = devConfig;
