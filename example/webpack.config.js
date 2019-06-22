const path = require('path');

module.exports = {
    entry: [
        'core-js',
        '@babel/polyfill',
        path.resolve('./example/js/index.js'),
    ],
    mode: 'development',
    output: {
        filename: 'build.js',
        path: path.resolve('./example/js'),
        libraryTarget: 'var',
    },
    resolve: {
        alias: {
            'react-shadow': path.resolve('./src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                loader: ['to-string-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
};
