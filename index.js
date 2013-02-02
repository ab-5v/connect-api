var fs = require('fs');
var qs = require('querystring');

var rest = {
    'POST'  : 'create',
    'GET'   : 'read',
    'PUT'   : 'update',
    'DELETE': 'destroy',
};

var ctypes = {
    'json': 'application/json; charset=utf-8',
    'txt': 'text/plain; charset=utf-8'
};

var parse = function(req) {
    console.log(req.url);
    var id, type, dot;
    var params = req.body;
    var method = req.method;
    var parts = req.url.split('?');
    var path = parts.shift().slice(1);
    var query = parts.join('?');

    dot = path.split('.');
    type = dot.pop();

    if (type in ctypes) {
        path = dot.join('.');
    } else {
        type = 'txt';
    }

    path = path.split('/');

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
        params: params,
        ctype: ctypes[type]
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
            res.setHeader('Content-type', api.ctype);
            handler[ api.action ]( api.params, end, req, res );
        }

    };
};

// for testing only
module.exports.parse = parse;
