const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var APP_DIR = path.resolve(__dirname, '../src');
var BUILD_DIR = path.resolve(__dirname, '../build/src');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    target: 'electron-renderer',
    entry: path.resolve(APP_DIR, './renderer/renderer.tsx'),
    output: {
        path: BUILD_DIR,
        filename: 'renderer.js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'swc-loader',
                        options: {
                            jsc: {
                                parser: {
                                    syntax: 'typescript',
                                    tsx: true,
                                    decorators: true,
                                    dynamicImport: true,
                                },
                                transform: {
                                    react: {
                                        runtime: 'automatic',
                                    },
                                },
                                target: 'es2018',
                                loose: false,
                                externalHelpers: true,
                                keepClassNames: true,
                            },
                            minify: true,
                            isModule: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        })
    ]
}; 