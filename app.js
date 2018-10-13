process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error);
});

process.on('warning', warning => {
    console.log('warning', warning);
});

process.on('uncaughtException', exception => {
    console.log('uncaughtException', exception);
});

process.on('rejectionHandled', rejection => {
    console.log('rejectionHandled', rejection);
});

var config = require('./config.js');

var http = require('http'),
    express = require('express'),
    app = express(),
    server = http.createServer(app),
    bodyParser = require('body-parser');

app.use(function (req, res, next) {
    if (
        !req.secure &&
        req.get('x-forwarded-proto') !== 'https' &&
        app.get('env') !== 'development'
    ) {
        if (config.service === 'shortener') {
            return res.redirect(config.shortener_host + req.url);
        } else {
            return res.redirect(config.host + req.url);
        }
    }
    next();
});

app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '50mb'
    })
);
app.use(
    bodyParser.json({
        limit: '50mb'
    })
);


if (app.get('env') !== 'production' && !config.api_work) {
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        historyApiFallback = require('connect-history-api-fallback'),
        webpackConfig = require('./webpack.dev.config'),
        webpackCompiler = webpack(webpackConfig),
        webpackMiddlewareInstance = webpackDevMiddleware(webpackCompiler, {
            publicPath: webpackConfig.output.publicPath,
            stats: {
                colors: true
            }
        });

    app.use(webpackMiddlewareInstance);
    app.use(
        historyApiFallback({
            disableDotRule: true
        })
    );
    app.use(webpackMiddlewareInstance);

    app.use(
        webpackHotMiddleware(webpackCompiler, {
            log: console.log
        })
    );
} else {
    app.use(express.static('build'));

    app.use(function (req, res) {
        res.sendFile(__dirname + '/build/index.html');
    });
}

if (config.start_server) {
    server.listen(config.server_port);
}

module.exports = {
    express,
    app,
    server
};
