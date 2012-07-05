var fs = require('fs');
var qs = require('querystring');

var rest = {
    'POST'  : 'create',
    'GET'   : 'read',
    'PUT'   : 'update',
    'DELETE': 'destroy',
};

var parse = function(req) {
    var id;
    var params = req.body;
    var method = req.method;
    var parts = req.url.split('?');
    var path = parts.shift().split('/').slice(1);
    var query = parts.join('?');

    var handler = path.shift();
    var action = path.shift();

    if (method === 'GET') {
        params = qs.parse(query);
    }

    if (!action || /PUT|DELETE/.test(method)) {
        id = action;
        action = rest[method];
        if (id) {
            params._id = id;
        }
    }

    return {
        handler: handler,
        action: action,
        params: params
    }
};

var format = function(err, data) {
    var res = err ?
        {status: 'error', message: err.message}:
        {status: 'OK', result: data};

    return JSON.stringify(res);
};

module.exports = function(root, options) {
    options = options || {};

    options.format = options.format || format;

    if (!root) throw new Error('api() root path required');

    // load all handlers
    var handlers = {};
    fs.readdirSync(root).forEach(function(handler) {
        var name = handler.replace(/\.js$/, '');
        handlers[ name ] = require( root + '/' + handler );
    });

    return function(req, res, next) {

        var api = parse(req);
        var handler = handlers[ api.handler ];
        var end = function(e, d) { res.end( format.apply(req, arguments) ); }

        if (!handler || typeof handler[ api.action ] !== 'function') {
            res.statusCode = 404;
            res.end(req.method + ' ' + req.url);
        } else {

            handler[ api.action ]( api.params, end, req, res );
        }

    };
};

// for testing only
module.exports.parse = parse;
