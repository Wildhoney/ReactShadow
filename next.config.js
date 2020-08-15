const path = require('path');

const aliases = [{ module: 'react-shadow', path: 'src/' }];

module.exports = {
    target: 'serverless',
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.svg$/,
            loader: 'svg-inline-loader',
        });

        config.module.rules.push({
            test: /\.css$/,
            loader: ['css-loader'],
        });

        config.module.rules.push({
            test: /\.(js|jsx)$/,
            include: [path.resolve(__dirname, './src')],
            use: [options.defaultLoaders.babel],
        });

        aliases.forEach((alias) => {
            config.resolve.alias[alias.module] = path.join(
                __dirname,
                alias.path,
            );
        });

        return config;
    },
};
