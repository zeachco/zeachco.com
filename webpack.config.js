const wps = require('webpack-production-setup');

module.exports = args => wps(Object.assign({}, args, {
    es6Modules: [/cms-core/, /axios/, /auto\-bind/],
    devTool: 'eval',
    proxy: {
        '/api/': {
            target: {
                host: 'zeachco.com',
                protocol: 'http',
                port: 8080
            },
            changeOrigin: true,
            secure: false
        }
    },
    favicon: 'src/favicon.svg'
}));
