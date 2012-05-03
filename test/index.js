var connect = require('connect');
var api = require('../index.js');

connect()
.use(api(__dirname + '/handlers'))
.listen(33333);

console.log('listen on localhost:33333');
