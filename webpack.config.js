const wps = require('webpack-production-setup');

module.exports = args => wps(Object.assign({}, args, {
    es6Modules: [/cms-core/, /axios/, /auto\-bind/],
    devTool: 'cheap-inline-eval-source-map',
    proxy: {
        '/api/': {
            target: {
                host: 'zeachco.com.dev',
                protocol: 'http',
                port: 8080
            },
            changeOrigin: true,
            secure: false
        }
    },
    favicon: 'src/favicon.svg'
}));
