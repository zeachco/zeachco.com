const wps = require('webpack-production-setup');

module.exports = args => wps(Object.assign({}, args, {
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
