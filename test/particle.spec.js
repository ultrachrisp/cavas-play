const assert = require('assert');
const testMap  = require('../dist_test/test_map.js').default;

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('Contact', function() {
    describe('connections', function() {
        it('should return 23', function() {
            var thing = new testMap.Particle();
            assert.equal(23, thing.test());
        });
    });
});


describe('Contact', function() {
    describe('connections', function() {
        it('should return 33', function() {
            var thing = new testMap.Particle();
            assert.equal(33, thing.test2());
        });
    });
});
