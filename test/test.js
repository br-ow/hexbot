//Tests for the HexBott
//Author: Brifactor
//Help from https://mochajs.org/

var assert = require('assert');
var hex_coord = require ('../src/HexCoord.js');
var offs_coord = require('../src/OffsetCoord.js');


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

    describe('#round', function() {
        it('round fractional HexCoord to the nearest hex', function() {
            var starting_spot = new hex_coord.HexCoord(1.6, -3, 1.4);
            var rounds_to = new hex_coord.HexCoord(2, -3, 1);
            assert.equal(starting_spot.round().equals(rounds_to), true);
        });
    });

    describe('#round 2', function() {
        it('round fractional HexCoord to the nearest hex', function() {
            var starting_spot = new hex_coord.HexCoord(1.6, 1.4, -3);
            var rounds_to = new hex_coord.HexCoord(2, 1, -3);
            assert.equal(starting_spot.round().equals(rounds_to), true);
        });
    });

    describe('#shift', function() {
        it('move a hex y spaces in x direction', function() {
            var starting_spot = new hex_coord.HexCoord(-2, -1, 3);
            var ending_spot = new hex_coord.HexCoord(2, -1, -1);
            assert.equal(starting_spot.shift(0, 4).equals(ending_spot), true);
        });
    });

    describe('#shift 2', function() {
        it('move a hex y spaces in x direction', function() {
            var starting_spot = new hex_coord.HexCoord(1, -3, 2);
            var ending_spot = new hex_coord.HexCoord(-1, -1, 2);
            assert.equal(starting_spot.shift(4, 2).equals(ending_spot), true);
        });
    });

});//end HexCoord

describe('OffsetCoord', function() {

    describe('#this.col', function() {
        it('should retrieve col value of coordinate', function() {
            assert.equal((new offs_coord.OffsetCoord(1, 2)).col, 1);
        });
    });

    describe('#this.col 2', function() {
        it('should retrieve col value of coordinate', function() {
            assert.equal(new offs_coord.OffsetCoord(-3, 2).col, -3);
        });
    });

    describe('#this.row', function() {
        it('should retrieve row value of coordinate', function() {
            assert.equal(new offs_coord.OffsetCoord(1, 2).row, 2);
        });
    });

    describe('#this.row 2', function() {
        it('should retrieve row value of coordinate', function() {
            assert.equal(new offs_coord.OffsetCoord(1, -3).row, -3);
        });
    });

    describe('#to_cube', function() {
        it('Convert offset coordinate to cube coordinate', function() {
            var starting_spot = new offs_coord.OffsetCoord(1, 2);
            var converted = new hex_coord.HexCoord(1, 1, -2);
            assert.equal(starting_spot.to_cube().equals(converted), true);
        });
    });

    describe('#to_cube 2', function() {
        it('Convert offset coordinate to cube coordinate', function() {
            var starting_spot = new offs_coord.OffsetCoord(2, 1);
            var converted = new hex_coord.HexCoord(2, 0, -2);
            assert.equal(starting_spot.to_cube().equals(converted), true);
        });
    });

    describe('#from_cube', function() {
        it('Convert cube coordinate to offset coordinate', function() {
            var starting_spot = new hex_coord.HexCoord(2, 0, -2);
            var converted = new offs_coord.OffsetCoord(2, 1);
            assert.equal(offs_coord.from_cube(starting_spot).equals(converted), true);
        });
    });

    describe('#from_cube 2', function() {
        it('Convert cube coordinate to offset coordinate', function() {
            var starting_spot = new hex_coord.HexCoord(1, 1, -2);
            var converted = new offs_coord.OffsetCoord(1, 2);
            assert.equal(offs_coord.from_cube(starting_spot).equals(converted), true);
        });
    });

});// end OffsetCoord
