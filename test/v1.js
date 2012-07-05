var request = require('request');
var post = request.post;
var put = request.put;
var get = request.get;
var path = 'http://localhost:33333';

describe('CRUD', function() {

    it('create', function(done) {
        post({url: path + '/users', json: {par: 'val'}}, function(err, req, body) {
            req.statusCode.should.eql(200);
            body.status.should.eql('OK');
            body.result.should.eql({par: 'val'});
            done();
        });
    });

    it('read', function(done) {
        get({url: path + '/users'}, function(err, req, body) {
            req.statusCode.should.eql(200);
            body = JSON.parse(body);
            body.status.should.eql('OK');
            body.result.should.eql([1,2,3,4]);
            done();
        });
    });

    it('update', function(done) {
        put({url: path + '/users', json: {par: 'val'}}, function(err, req, body) {
            req.statusCode.should.eql(200);
            body.status.should.eql('OK');
            body.result.should.eql({ex: 1});
            done();
        });
    });

    it('destroy', function(done) {
        request({method: 'DELETE', url: path + '/users'}, function(err, req, body) {
            req.statusCode.should.eql(200);
            body = JSON.parse(body);
            body.status.should.eql('OK');
            body.result.should.eql(1);
            done();
        });
    });

});
