const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { default: ReactRefreshTypeScript } = require('react-refresh-typescript');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const port = process.env.PORT || 3000;

var BUILD_DIR = path.resolve(__dirname, '../build/src');
var APP_DIR = path.resolve(__dirname, '../src');

module.exports = {
    ...baseConfig,
    target: 'electron-renderer',
    entry: path.resolve(APP_DIR, './renderer/renderer.tsx'),
    output: {
        path: BUILD_DIR,
        filename: 'renderer.js',
        publicPath: `http://localhost:${port}/`
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            '@': path.resolve(APP_DIR, './renderer'),
            'react': path.resolve(__dirname, '../node_modules/react'),
            'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
            'react/jsx-runtime': path.resolve(__dirname, '../node_modules/react/jsx-runtime.js'),
            'react/jsx-dev-runtime': path.resolve(__dirname, '../node_modules/react/jsx-dev-runtime.js')
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
                                before: [ReactRefreshTypeScript()],
                            }),
                            transpileOnly: true,
                            happyPackMode: true,
                            compilerOptions: {
                                module: 'esnext'
                            }
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
        minimize: false,
        moduleIds: 'named'
    },
    plugins: [
        new ReactRefreshWebpackPlugin({
            overlay: false
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        })
    ],
    devServer: {
        port,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        devMiddleware: {
            publicPath: `http://localhost:${port}/`,
            writeToDisk: false,
            stats: 'errors-only'
        },
        static: {
            directory: path.join(__dirname, '../public')
        }
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        },
        cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/webpack')
    },
    stats: 'errors-only'
}; 