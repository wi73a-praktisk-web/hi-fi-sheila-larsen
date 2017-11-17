const restify = require('restify');
const corsmiddleware = require('restify-cors-middleware');
// const path = require('path');

// const port = process.env.port || 3000;
const server = restify.createServer({
    'name': 'hifi',
    'version': '1.0.0'
});

const logger = require('morgan');
server.use(logger('dev'));

const cors = corsmiddleware({
    'origins': ['*'],
    'allowHeaders': ['Authorization', 'userID']
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.jsonp());
server.use(restify.plugins.bodyParser({
    mserverarms: true,
    mapFiles: true,
    keepExtensions: true,
    uploadDir: './api/tmp_upload'

}));
server.use(restify.plugins.queryParser());


server.pre(cors.preflight);
server.use(cors.actual);


// require(path.join(__dirname, 'routes', 'opret_produkt'))(server);
require('./routes/index')(server);

server.listen(1337, function(){
    console.log('%s listening at %s', server.name, server.url);
});