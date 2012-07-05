var req = require('./util/request')();

describe('CRUD', function() {

    it('create', function(done) {
        req('POST /users', {par: 'val'}, function(err, req, body) {
            req.statusCode.should.eql(200);
            body.status.should.eql('OK');
            body.result.should.eql({par: 'val'});
            done();
        });
    });

    it('read', function(done) {
        req('GET /users', function(err, req, body) {
            req.statusCode.should.eql(200);
            body.status.should.eql('OK');
            body.result.should.eql([1,2,3,4]);
            done();
        });
    });

    it('update', function(done) {
        req('PUT /users', {par: 'val'}, function(err, req, body) {
            req.statusCode.should.eql(200);
            body.status.should.eql('OK');
            body.result.should.eql({ex: 1});
            done();
        });
    });

    it('destroy', function(done) {
        req('DELETE /users', function(err, req, body) {
            req.statusCode.should.eql(200);
            body.status.should.eql('OK');
            body.result.should.eql(1);
            done();
        });
    });

});
