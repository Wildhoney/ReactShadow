module.exports = {
    entry: {
        build: ['./src/react-shadow.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: 'react-shadow.js',
        libraryTarget: 'commonjs2'
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
