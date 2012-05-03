var request = require('request');

describe('api', function() {

    it('should be error on incorrect method', function(done){
        request('http://localhost:33333/', function(err, req, body) {
            body.should.equal('{"status":"error","message":"incorrect request (/)"}');
            done();
        })
    });

    it('should be error on unknown handler', function(done){
        request('http://localhost:33333/polute', function(err, req, body) {
            body.should.equal('{"status":"error","message":"unknown handler (polute)"}');
            done();
        })
    });

    it('should be error on incorrect action', function(done){
        request('http://localhost:33333/foo/loo', function(err, req, body) {
            body.should.equal('{"status":"error","message":"wrong action (loo)"}');
            done();
        })
    });

    it('should pass correct action', function(done){
        request('http://localhost:33333/foo/bar', function(err, req, body) {
            body.should.equal('{"status":"OK","result":"success"}');
            done();
        })
    });
});
