const  particles = require('../src/dev/particles.js');

const assert = require('assert');
// par = require('../src/dev/particles.js');


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
        assert.equal(23, par.particles());
    });
  });
});
