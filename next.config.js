const path = require('path');

const aliases = [{ module: 'react-shadow', path: 'example/react-shadow.js' }];

module.exports = {
    target: 'serverless',
    webpack: (config) => {
        aliases.forEach((alias) => {
            config.resolve.alias[alias.module] = path.join(
                __dirname,
                alias.path,
            );
        });

        config.module.rules.push({
            test: /\.css$/,
            loader: ['to-string-loader', 'css-loader'],
        });

        return config;
    },
};
