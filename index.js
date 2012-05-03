var qs = require('querystring');

var re = /([^\/]+)\/?([^\?]*)\/??(.*)/

module.exports = function(root, options) {
    options = options || {};

    if (!root) throw new Error('api() root path required');

    var handlers = require(root);

    return function(req, res, next) {

        var match = req.url.match(re);
        var name, action, query, handler, params;
        var end = function(err, data) {
            var response = err ? {status: 'error', message: err.message} : {status: 'OK', result: data};

            res.end( JSON.stringify(response) );
        };

        if (!match) {
            return end({message: 'incorrect request (' + req.url + ')'});
        }

        name = match[1];
        action = match[2];
        query = match[3];

        if (handlers.indexOf(name) === -1) {
            return end({message: 'unknown handler (' + name + ')'});
        }

        handler = require(root + '/' + name + '.js');

        if (typeof handler[action] !== 'function') {
            return end({message: 'wrong action (' + action + ')'});
        }

        params = req.body || qs.parse(query);

        if (typeof handler['_before'] === 'function') {
            handler._before(action, params, function(err, data) {
                if (err) { return end(err); }

                handler[action](params, end, data || {}, req, res);
            }, req, res);

        } else {
            handler[action](params, end, {}, req, res);
        }

    };
};
