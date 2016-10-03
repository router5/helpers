var should = require('should');
require('mocha');
var helpers = require('../index.js');

describe('router5.helpers', function () {
    describe('.startsWithSegment()', function () {
        it('should return true if a route starts with a segment', function () {
            helpers.startsWithSegment('a.b.c', 'a').should.equal(true);
            helpers.startsWithSegment('a.b.c', 'a.b').should.equal(true);
            helpers.startsWithSegment({ name: 'a.b.c' }, 'a').should.equal(true);
        });

        it('should return false if a route does not start with a segment', function () {
            helpers.startsWithSegment('a.b.c', 'aa').should.equal(false);
            helpers.startsWithSegment('a.b.c', 'a.a').should.equal(false);
            helpers.startsWithSegment({ name: 'a.b.c' }, 'aa').should.equal(false);
        });
    });

    describe('.endsWithSegment()', function () {
        it('should return true if a route ends with a segment', function () {
            helpers.endsWithSegment('a.b.c', 'c').should.equal(true);
            helpers.endsWithSegment({ name: 'a.b.c' }, 'c').should.equal(true);
        });

        it('should return false if a route does not end with a segment', function () {
            helpers.endsWithSegment('a.b.c', 'cc').should.equal(false);
            helpers.endsWithSegment({ name: 'a.b.c' }, 'cc').should.equal(false);
        });
    });

    describe('.includesSegment()', function () {
        it('should return true if a route includes a segment', function () {
            helpers.includesSegment('a.b.c', 'a').should.equal(true);
            helpers.includesSegment('a.b.c', 'a.b').should.equal(true);
            helpers.includesSegment('a.b.c', 'a.b.c').should.equal(true);
            helpers.includesSegment('a.b.c', 'b').should.equal(true);
            helpers.includesSegment('a.b.c', 'c').should.equal(true);
        });

        it('should return false if a route does not include a segment', function () {
            helpers.includesSegment('a.b.c', 'aa').should.equal(false);
            helpers.includesSegment('a.bb.c', 'a.b').should.equal(false);
            helpers.includesSegment('a.b.c', 'bb.c').should.equal(false);
            helpers.includesSegment('a.b.c', 'a.b.b').should.equal(false);
        });
    });

    describe('.redirect()', function () {
        it('should return a "redirect" error if node is matched', function () {
            helpers.redirect('a', 'b')()({ name: 'a' }, null, function done(err) {
                err.should.eql({
                    redirect: { name: 'b' }
                })
            });
        });

        it('should not return a "redirect" error if node is not matched', function () {
            helpers.redirect('a', 'b')()({ name: 'b' }, null, function done(err) {
                should.not.exist(err);
            });
        });
    });
});
