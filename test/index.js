var connect = require('connect');
var api = require('../index.js');
var responser = require('./responser.js');

connect()
.use(api(__dirname + '/handlers'))
.listen(33333)
