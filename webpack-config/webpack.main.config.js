const path = require('path');
const baseConfig = require('./webpack.base.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, '../build/src');
var APP_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

module.exports = {
    ...baseConfig,
    target: 'electron-main',
    entry: path.resolve(APP_DIR, './main/main.js'),
    output: {
        path: BUILD_DIR,
        filename: 'main.js',
        library: {
            type: 'commonjs2'
        }
    },
    plugins: [
        ...baseConfig.plugins || [],
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: PUBLIC_DIR,
                    to: path.join(BUILD_DIR, 'public'),
                    globOptions: {
                        ignore: ['**/node_modules/**']
                    }
                }
            ]
        })
    ],
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}; 