const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = {
    ...baseConfig,
    target: 'electron-renderer',
    entry: path.resolve(__dirname, '../src/renderer/renderer.tsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'renderer.js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    module: {
        ...baseConfig.module,
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('ts-loader'),
                        options: {
                            transpileOnly: false
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        })
    ]
}; 