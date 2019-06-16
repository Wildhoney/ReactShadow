export default {
    require: [
        '@babel/register',
        '@babel/polyfill',
        './helpers/enzyme.js',
        './helpers/browser-env.js',
    ],
};
