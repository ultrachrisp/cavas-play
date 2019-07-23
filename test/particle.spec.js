const assert = require('chai').assert;

// import { assert } from 'chai';
const testMap  = require('../dist_test/test_map.js').default;

      var thing = testMap.Particle();

describe('Particles', function() {
    describe('Test fuction 1', function() {
        it('should return 23', function() {
            assert.equal(thing.test(), 23, "Test is 23");
        });
    });

    
    describe('Test fuction 2', function() {
        it('should return 34', function() {
            assert.equal(thing.test2(), 34, "Test is 33");
        });
    });
});

