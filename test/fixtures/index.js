var connect = require('connect');
var api = require('../../');

connect()
.use(connect.query())
.use(connect.bodyParser())
.use(api(__dirname + '/v1'))
.listen(33333);

console.log('listen on localhost:33333');
