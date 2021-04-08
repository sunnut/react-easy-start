let restify = require('restify');
let partition = require('./modules/index');
let server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8889, function () {
  console.log('');
  console.log('');
  console.log('Mock Server is Started at 8889!!!');
  console.log('');
  console.log('');
});

partition(server);