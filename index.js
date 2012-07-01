var fs = require('fs');
var qs = require('querystring');
var connect = require('connect');

var re = /([^\/]+)\/?([^\?\/]*)\/?\??(.*)/
var rest = {
    'POST'  : 'create',
    'GET'   : 'read',
    'PUT'   : 'update',
    'DELETE': 'destroy',
};

var parseREST = function(req) {
    var parts = req.url.split('/').slice(1);
    var method = req.method;

    var handler = parts.shift();
    var id = parts.shift();
    var action = rest[method];

    var params = /POST|PUT/.test(method) ? req.body : {};

    if (id) {
        params._id = id;
    }

    return {
        handler: handler,
        action: action,
        params: params
    }
};
var parseHTTP = function(req) {
};

var error = function(res, code, message) {
    res.statusCode = code;
    res.end(message);
};

var format = function(err, data) {
    return err ?
        {status: 'error', message: err.message}:
        {status: 'OK', result: data};
};

module.exports = function(root, options) {
    options = options || {};

    if (!root) throw new Error('api() root path required');

    // load all handlers
    var handlers = {};
    fs.readdirSync(root).forEach(function(handler) {
        var name = handler.replace(/\.js$/, '');
        handlers[ name ] = require( root + '/' + handler );
    });

    // choose request parser
    var parse = options.rest ? parseREST : parseHTTP;

    return function(req, res, next) {

        var api = parse(req);
        var handler = handlers[ api.handler ];
        var end = function(e, d) { res.end( JSON.stringify(format(e, d)) ); }

        if (!handler || typeof handler[ api.action ] !== 'function') {
            error(res, 404, req.url);
        }

        handler[ api.action ]( api.params, end, req, res );

    };
};
