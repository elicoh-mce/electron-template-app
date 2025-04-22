const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { default: ReactRefreshTypeScript } = require('react-refresh-typescript');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const isDevelopment = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

module.exports = {
    ...baseConfig,
    target: 'electron-renderer',
    entry: path.resolve(__dirname, '../src/renderer/renderer.tsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'renderer.js',
        publicPath: isDevelopment ? `http://localhost:${port}/` : './'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, '../src/renderer')
        }
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
                            getCustomTransformers: () => ({
                                before: isDevelopment ? [ReactRefreshTypeScript()] : [],
                            }),
                            transpileOnly: isDevelopment,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        })
    ].filter(Boolean),
    devServer: {
        port,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        devMiddleware: {
            publicPath: `http://localhost:${port}/`
        },
        static: {
            directory: path.join(__dirname, '../public')
        }
    }
}; 