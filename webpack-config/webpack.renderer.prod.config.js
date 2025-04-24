const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
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
            template: path.resolve(__dirname, '../static/index.html')
        })
    ]
}; 