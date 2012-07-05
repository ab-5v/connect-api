var parse = require('../').parse;
var req = require('./util/request')(parse);

describe('parse', function() {

    describe('GET', function() {

        it('basic', function() {
            req('GET /handler').should.eql({
                handler: 'handler',
                action: 'read',
                params: {}
            });
        });

        it('params', function() {
            req('GET /handler?lol=1&none=a&none=b').should.eql({
                handler: 'handler',
                action: 'read',
                params: {
                    lol: '1',
                    none: ['a', 'b']
                }
            });
        });

        it('action', function() {
            req('GET /handler/action').should.eql({
                handler: 'handler',
                action: 'action',
                params: {}
            });
        });

        it('action params', function() {
            req('GET /handler/action?lol=1&none=a&none=b').should.eql({
                handler: 'handler',
                action: 'action',
                params: {
                    lol: '1',
                    none: ['a', 'b']
                }
            });
        });
    });

    describe('POST', function() {

        it('basic', function() {
            req('POST /handler').should.eql({
                handler: 'handler',
                action: 'create',
                params: {}
            });
        });

        it('params', function() {
            req('POST /handler', {param: 'val'}).should.eql({
                handler: 'handler',
                action: 'create',
                params: {param: 'val'}
            });
        });

        it('action', function() {
            req('POST /handler/action').should.eql({
                handler: 'handler',
                action: 'action',
                params: {}
            });
        });

        it('action params', function() {
            req('POST /handler/action', {param: [1,2,3]}).should.eql({
                handler: 'handler',
                action: 'action',
                params: {param: [1,2,3]}
            });
        });
    });

    describe('PUT', function() {

        it('basic', function() {
            req('PUT /handler').should.eql({
                handler: 'handler',
                action: 'update',
                params: {}
            });
        });

        it('id', function() {
            req('PUT /handler/someid').should.eql({
                handler: 'handler',
                action: 'update',
                params: {_id: 'someid'}
            });
        });

        it('params', function() {
            req('PUT /handler', {param: 'val'}).should.eql({
                handler: 'handler',
                action: 'update',
                params: {param: 'val'}
            });
        });

        it('params & id', function() {
            req('PUT /handler/someid', {param: 'val'}).should.eql({
                handler: 'handler',
                action: 'update',
                params: {param: 'val', _id: 'someid'}
            });
        });

    });

    describe('DELETE', function() {

        it('basic', function() {
            req('DELETE /handler').should.eql({
                handler: 'handler',
                action: 'destroy',
                params: {}
            });
        });

        it('id', function() {
            req('DELETE /handler/someid').should.eql({
                handler: 'handler',
                action: 'destroy',
                params: {_id: 'someid'}
            });
        });

    });
});
