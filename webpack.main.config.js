const path = require('path');
const baseConfig = require('./webpack.base.config');

module.exports = {
    ...baseConfig,
    target: 'electron-main',
    entry: './src/main/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}; 