var request = require('request');

var parse = function(url) {
    var m = url.match(/^(GET|POST|PUT|DELETE)\s(.*)$/);
    return {
        method: m[1],
        url: m[2]
    };
};

var TESTURL = 'http://localhost:33333'

module.exports = function(emulator) {

    return function(url, body, callback) {
        var options = parse(url);

        if (emulator) {
            options.body = body || {};
            return emulator(options);
        }

        options.url = TESTURL + options.url;

        if (typeof body === 'function') {
            callback = body;
            body = null;
        }

        if (body) {
            options.json = body;
        }

        request(options, function(err, req, data) {
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                } catch (e) {}
            }

            callback(err, req, data);
        });
    }

};
