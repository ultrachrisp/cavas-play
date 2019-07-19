let tdd = require('../src/js/tdd.js');
let assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Contact', function() {
  describe('connections', function() {
    it('should return 22', function() {
        assert.equal(22, tdd.tester());
    });
  });
});
