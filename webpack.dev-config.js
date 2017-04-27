module.exports = {
    entry: {
        build: ['babel-polyfill', './example/js/Default.js']
    },
    output: {
        path: __dirname + '/example/js',
        filename: '[name].js',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }
};
