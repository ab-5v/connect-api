var parse = require('../').parse;
var req = require('./util/request')(parse);

describe('parse', function() {

    describe('GET', function() {

        it('basic', function() {
            req('GET /handler').should.eql({
                handler: 'handler',
                action: 'read',
                params: {},
                ctype: 'text/plain; charset=utf-8'
            });
        });

        it('basic.json', function() {
            req('GET /handler.json').should.eql({
                handler: 'handler',
                action: 'read',
                params: {},
                ctype: 'application/json; charset=utf-8'
            });
        });

        it('params', function() {
            req('GET /handler?lol=1&none=a&none=b').should.eql({
                handler: 'handler',
                action: 'read',
                params: {
                    lol: '1',
                    none: ['a', 'b']
                },
                ctype: 'text/plain; charset=utf-8'
            });
        });

        it('params.json', function() {
            req('GET /handler.json?lol=1&none=a&none=b').should.eql({
                handler: 'handler',
                action: 'read',
                params: {
                    lol: '1',
                    none: ['a', 'b']
                },
                ctype: 'application/json; charset=utf-8'
            });
        });

        it('action', function() {
            req('GET /handler/action').should.eql({
                handler: 'handler',
                action: 'action',
                params: {},
                ctype: 'text/plain; charset=utf-8'
            });
        });

        it('action.json', function() {
            req('GET /handler/action.json').should.eql({
                handler: 'handler',
                action: 'action',
                params: {},
                ctype: 'application/json; charset=utf-8'
            });
        });

        it('action params', function() {
            req('GET /handler/action?lol=1&none=a&none=b').should.eql({
                handler: 'handler',
                action: 'action',
                params: {
                    lol: '1',
                    none: ['a', 'b']
                },
                ctype: 'text/plain; charset=utf-8'
            });
        });

        it('action.json params', function() {
            req('GET /handler/action.json?lol=1&none=a&none=b').should.eql({
                handler: 'handler',
                action: 'action',
                params: {
                    lol: '1',
                    none: ['a', 'b']
                },
                ctype: 'application/json; charset=utf-8'
            });
        });
    });

    describe('POST', function() {

        it('basic', function() {
            req('POST /handler').should.eql({
                handler: 'handler',
                action: 'create',
                params: {},
                ctype: 'text/plain; charset=utf-8'
            });
        });

        it('params', function() {
            req('POST /handler', {param: 'val'}).should.eql({
                handler: 'handler',
                action: 'create',
                params: {param: 'val'},
                ctype: 'text/plain; charset=utf-8'
            });
        });

        it('action', function() {
            req('POST /handler/action').should.eql({
                handler: 'handler',
                action: 'action',
                params: {},
                ctype: 'text/plain; charset=utf-8'
            });
        });

        it('action params', function() {
            req('POST /handler/action', {param: [1,2,3]}).should.eql({
                handler: 'handler',
                action: 'action',
                params: {param: [1,2,3]},
                ctype: 'text/plain; charset=utf-8'
            });
        });
    });

    describe('PUT', function() {

        it('basic', function() {
            req('PUT /handler').should.eql({
                handler: 'handler',
                action: 'update',
                params: {},
                ctype: 'text/plain; charset=utf-8'
            });
        });

        it('id', function() {
            req('PUT /handler/someid').should.eql({
                handler: 'handler',
                action: 'update',
                params: {_id: 'someid'},
                ctype: 'text/plain; charset=utf-8'
            });
        });

        it('params', function() {
            req('PUT /handler', {param: 'val'}).should.eql({
                handler: 'handler',
                action: 'update',
                params: {param: 'val'},
                ctype: 'text/plain; charset=utf-8'
            });
        });

        it('params & id', function() {
            req('PUT /handler/someid', {param: 'val'}).should.eql({
                handler: 'handler',
                action: 'update',
                params: {param: 'val', _id: 'someid'},
                ctype: 'text/plain; charset=utf-8'
            });
        });

    });

    describe('DELETE', function() {

        it('basic', function() {
            req('DELETE /handler').should.eql({
                handler: 'handler',
                action: 'destroy',
                params: {},
                ctype: 'text/plain; charset=utf-8'
            });
        });

        it('id', function() {
            req('DELETE /handler/someid').should.eql({
                handler: 'handler',
                action: 'destroy',
                params: {_id: 'someid'},
                ctype: 'text/plain; charset=utf-8'
            });
        });

    });
});
