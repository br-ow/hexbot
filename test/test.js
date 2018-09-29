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
            assert.equal((new hex_coord.HexCoord(1, 2, -3)).q, 1);
        });
    });

    describe('#this.q 2', function() {
        it('should retrieve q value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(-3, 2, 1).q, -3);
        });
    });

    describe('#this.r', function() {
        it('should retrieve r value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(1, 2, -3).r, 2);
        });
    });

    describe('#this.r 2', function() {
        it('should retrieve r value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(1, -3, 2).r, -3);
        });
    });

    describe('#this.s', function() {
        it('should retrieve s value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(1, 2, -3).s, -3);
        });
    });

    describe('#this.s 2', function() {
        it('should retrieve s value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(-3, 2, 1).s, 1);
        });
    });

    describe('#add', function() {
        it('add two HexCoords together', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            var add_dir = new hex_coord.HexCoord(1, 0, -1);
            assert.equal((starting_spot.add(add_dir)).equals(new hex_coord.HexCoord(2, 2, -4)), true);
        });
    });

    describe('#add 2', function() {
        it('add two HexCoords together', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            var add_dir = new hex_coord.HexCoord(-1, 0, 1);
            assert.equal(starting_spot.add(add_dir).equals(new hex_coord.HexCoord(0, 2, -2)), true);
        });
    });

    describe('#subtract', function() {
        it('subtract two HexCoords', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            var sub_dir = new hex_coord.HexCoord(1, 0, -1);
            assert.equal(starting_spot.subtract(sub_dir).equals(new hex_coord.HexCoord(0, 2, -2)), true);
        });
    });

    describe('#subtract 2', function() {
        it('subtract two HexCoords', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            var sub_dir = new hex_coord.HexCoord(-1, 0, 1);
            assert.equal(starting_spot.subtract(sub_dir).equals(new hex_coord.HexCoord(2, 2, -4)), true);
        });
    });

    describe('#scale', function() {
        it('multiply a HexCoord', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.scale(2).equals(new hex_coord.HexCoord(2, 4, -6)), true);
        });
    });

    describe('#scale 2', function() {
        it('multiply a HexCoord', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.scale(3).equals(new hex_coord.HexCoord(3, 6, -9)), true);
        });
    });

    describe('#rotate_left', function() {
        it('rotate HexCoord to the left', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.rotate_left().equals(new hex_coord.HexCoord(3, -1, -2)), true);
        });
    });

    describe('#rotate_right', function() {
        it('rotate HexCoord to the right', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.rotate_right().equals(new hex_coord.HexCoord(-2, 3, -1)), true);
        });
    });

    describe('#direction', function() {
        it('get a direction', function() {
            assert.equal(new hex_coord.HexCoord(0,0,0).direction(4).equals(new hex_coord.HexCoord(-1, 1, 0)), true);
        });
    });

    describe('#neighbor', function() {
        it('get a neighbor', function() {
            debugger;
            var starting_spot = new hex_coord.HexCoord(1, -2, 1);
            assert.equal(starting_spot.neighbor(1).equals(new hex_coord.HexCoord(2, -3, 1)), true);
        });
    });

    describe('#length', function() {
        it('distance from hex to center?', function() {
            var starting_spot = new hex_coord.HexCoord(4, -4, 0);
            assert.equal(starting_spot.length(), 4);
        });
    });

    describe('#length 2', function() {
        it('distance from hex to center?', function() {
            var starting_spot = new hex_coord.HexCoord(3, 2, -5);
            assert.equal(starting_spot.length(), 5);
        });
    });

    describe('#distance', function() {
        it('distance between two hexes', function() {
            var starting_spot = new hex_coord.HexCoord(1, -2, 1);
            var ending_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.distance(ending_spot), 4);
        });
    });

    describe('#distance 2', function() {
        it('distance between two hexes', function() {
            var starting_spot = new hex_coord.HexCoord(1, -2, 1);
            var ending_spot = new hex_coord.HexCoord(1, 1, -2);
            assert.equal(starting_spot.distance(ending_spot), 3);
        });
    });

});//end HexCoord