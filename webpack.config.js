module.exports = {
    mode: 'production',
    entry: {
        build: ['./src/react-shadow.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: 'react-shadow.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        'react': {
            commonjs2: 'react',
        },
        'react-dom':{
            commonjs2: 'react-dom',
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0'],
                    plugins: ['ramda']
                }
            }
        ]
    }
};
