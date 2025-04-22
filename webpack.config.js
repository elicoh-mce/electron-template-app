const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { default: ReactRefreshTypeScript } = require('react-refresh-typescript');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/main/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    target: 'electron-main',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        fallback: {
            "fs": false,
            "path": false,
            "electron": false
        }
    },
    devServer: {
        hot: true
    },
    module: {
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
    plugins: [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
};