const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, '../build/src');
var APP_DIR = path.resolve(__dirname, '../src');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    target: 'electron-main',
    entry: path.resolve(APP_DIR, './main/main.ts'),
    output: {
        path: BUILD_DIR,
        filename: 'main.js',
        library: {
            type: 'commonjs2'
        }
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
                                        refresh: true,
                                        development: true,
                                    },
                                },
                                target: 'es2018',
                                loose: false,
                                externalHelpers: true,
                                keepClassNames: true,
                            },
                            sourceMaps: true,
                            isModule: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
    ],
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}; 