//Tests for the HexBott
//Author: Brifactor
//Help from https://mochajs.org/

var assert = require('assert');
var hex_coord = require ('../src/HexCoord.js');


describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
});

describe('HexCoord', function() {
    describe('#this.q', function() {
        it('should retrieve q value of coordinate', function() {
            assert.equal((hex_coord.HexCoord(1, 2, -3)).q, 1);
        });
    });

    describe('#this.q 2', function() {
        it('should retrieve q value of coordinate', function() {
            assert.equal(hex_coord.HexCoord(-3, 2, 1).q, -3);
        });
    });

    describe('#this.r', function() {
        it('should retrieve r value of coordinate', function() {
            assert.equal(hex_coord.HexCoord(1, 2, -3).r, 2);
        });
    });

    describe('#this.r 2', function() {
        it('should retrieve r value of coordinate', function() {
            assert.equal(hex_coord.HexCoord(1, -3, 2).r, -3);
        });
    });

    describe('#this.s', function() {
        it('should retrieve s value of coordinate', function() {
            assert.equal(hex_coord.HexCoord(1, 2, -3).s, -3);
        });
    });

    describe('#this.s 2', function() {
        it('should retrieve s value of coordinate', function() {
            assert.equal(hex_coord.HexCoord(-3, 2, 1).s, 1);
        });
    });

    describe('#add', function() {
        it('add two HexCoords together', function() {
            var starting_spot = hex_coord.HexCoord(1, 2, -3);
            var add_dir = hex_coord.HexCoord(1, 0, -1);
            assert.equal(hex_coord.add(starting_spot, add_dir), hex_coord.HexCoord(2, 2, -4));
        });
    });

    describe('#add 2', function() {
        it('add two HexCoords together', function() {
            var starting_spot = hex_coord.HexCoord(1, 2, -3);
            var add_dir = hex_coord.HexCoord(-1, 0, 1);
            assert.equal(hex_coord.add(starting_spot, add_dir), hex_coord.HexCoord(0, 2, -2));
        });
    });

    describe('#subtract', function() {
        it('subtract two HexCoords', function() {
            var starting_spot = hex_coord.HexCoord(1, 2, -3);
            var sub_dir = hex_coord.HexCoord(1, 0, -1);
            assert.equal(hex_coord.subtract(starting_spot, sub_dir), hex_coord.HexCoord(0, 2, -2));
        });
    });

    describe('#subtract 2', function() {
        it('subtract two HexCoords', function() {
            var starting_spot = hex_coord.HexCoord(1, 2, -3);
            var sub_dir = hex_coord.HexCoord(-1, 0, 1);
            assert.equal(hex_coord.subtract(starting_spot, sub_dir), hex_coord.HexCoord(2, 2, -4));
        });
    });

    describe('#scale', function() {
        it('multiply a HexCoord', function() {
            var starting_spot = hex_coord.HexCoord(1, 2, -3);
            assert.equal(hex_coord.scale(starting_spot, 2), hex_coord.HexCoord(2, 4, -6));
        });
    });

    describe('#scale 2', function() {
        it('multiply a HexCoord', function() {
            var starting_spot = hex_coord.HexCoord(1, 2, -3);
            assert.equal(hex_coord.scale(starting_spot, 3), hex_coord.HexCoord(3, 6, -9));
        });
    });

    describe('#rotate_left', function() {
        it('rotate HexCoord to the left', function() {
            var starting_spot = hex_coord.HexCoord(1, 2, -3);
            assert.equal(hex_coord.rotate_left(starting_spot), hex_coord.HexCoord(3, -1, -2));
        });
    });

    describe('#rotate_right', function() {
        it('rotate HexCoord to the right', function() {
            var starting_spot = hex_coord.HexCoord(1, 2, -3);
            assert.equal(hex_coord.rotate_right(starting_spot), hex_coord.HexCoord(-2, 3, -1));
        });
    });

    describe('#direction', function() {
        it('get a direction', function() {
            assert.equal(hex_coord.direction(4), hex_coord.HexCoord(-1, 1, 0));
        });
    });

});//end HexCoord