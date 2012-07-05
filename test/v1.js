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

describe('params', function() {

    it('GET query', function(done) {
        req('GET /echo?param1=val&param2=1&param2=2', function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.eql('OK');
            body.result.should.eql({param1: 'val', param2: ['1', '2'], echo: 'yes'});
            done()
        });
    });


    it('GET custom action', function(done) {
        req('GET /echo/custom', function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.eql('OK');
            body.result.should.eql({echo: 'yes'});
            done()
        });
    });


    it('GET custom action with query', function(done) {
        req('GET /echo/custom?some=var', function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.eql('OK');
            body.result.should.eql({some: 'var', echo: 'yes'});
            done()
        });
    });


    it('POST custom action', function(done) {
        req('POST /echo/custom', function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.eql('OK');
            body.result.should.eql({echo: 'yes'});
            done()
        });
    });

    it('POST custom action with params', function(done) {
        req('POST /echo/custom', {lo: 'lo'}, function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.eql('OK');
            body.result.should.eql({lo: 'lo', echo: 'yes'});
            done()
        });
    });

    it('PUT id', function(done) {
        req('PUT /echo/someid', function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.eql('OK');
            body.result.should.eql({_id: 'someid', echo: 'yes'});
            done()
        });
    });

    it('PUT with params', function(done) {
        req('PUT /echo', {up: 'date'}, function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.eql('OK');
            body.result.should.eql({up: 'date', echo: 'yes'});
            done()
        });
    });

    it('PUT id with params', function(done) {
        req('PUT /echo/someid', {up: 'date'}, function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.eql('OK');
            body.result.should.eql({up: 'date', _id: 'someid', echo: 'yes'});
            done()
        });
    });

    it('DELETE id', function(done) {
        req('DELETE /echo/someid', function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.eql('OK');
            body.result.should.eql({_id: 'someid', echo: 'yes'});
            done()
        });
    });

    it('DELETE with params', function(done) {
        req('DELETE /echo', {up: 'date'}, function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.eql('OK');
            body.result.should.eql({up: 'date', echo: 'yes'});
            done()
        });
    });

    it('DELETE id with params', function(done) {
        req('DELETE /echo/someid', {up: 'date'}, function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.eql('OK');
            body.result.should.eql({_id: 'someid', up: 'date', echo: 'yes'});
            done()
        });
    });

});

describe('errors', function() {
    it('404 on handler', function(done) {
        req('GET /foo', function(err, req, body) {
            req.statusCode.should.equal(404);
            body.should.equal('GET /foo');
            done();
        })
    });

    it('404 on action', function(done) {
        req('GET /err/foo', function(err, req, body) {
            req.statusCode.should.equal(404);
            body.should.equal('GET /err/foo');
            done();
        })
    });

    it('404 on auto action', function(done) {
        req('PUT /err', function(err, req, body) {
            req.statusCode.should.equal(404);
            body.should.equal('PUT /err');
            done();
        })
    });

    it('error', function(done) {
        req('GET /err', function(err, req, body) {
            req.statusCode.should.equal(200);
            body.status.should.equal('error');
            body.message.should.equal('message');
            done();
        });
    })
});
