module.exports = {
    mode: 'development',
    entry: {
        build: ['babel-polyfill', './example/js/default.js']
    },
    output: {
        path: __dirname + '/example/js',
        filename: '[name].js',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0']
                }
            }
        ]
    }
};
