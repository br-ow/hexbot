/*Tests for the HexBott
 *Author: Brifactor
 *Help from https://mochajs.org/
 */

var assert = require('assert');
var hex_coord = require ('../src/HexCoord.js');
var offs_coord = require('../src/OffsetCoord.js');
var hex = require('../src/Hex.js');


describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
});

describe('HexCoord', function() {
    describe('#getQ', function() {
        it('should retrieve q value of coordinate', function() {
            assert.equal((new hex_coord.HexCoord(1, 2, -3)).getQ(), 1);
        });
    });

    describe('#getQ 2', function() {
        it('should retrieve q value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(-3, 2, 1).getQ(), -3);
        });
    });

    describe('#getR', function() {
        it('should retrieve r value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(1, 2, -3).getR(), 2);
        });
    });

    describe('#getR 2', function() {
        it('should retrieve r value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(1, -3, 2).getR(), -3);
        });
    });

    describe('#getS', function() {
        it('should retrieve s value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(1, 2, -3).getS(), -3);
        });
    });

    describe('#getS 2', function() {
        it('should retrieve s value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(-3, 2, 1).getS(), 1);
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

    describe('#rotateLeft', function() {
        it('rotate HexCoord to the left', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.rotateLeft().equals(new hex_coord.HexCoord(3, -1, -2)), true);
        });
    });

    describe('#rotateRight', function() {
        it('rotate HexCoord to the right', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.rotateRight().equals(new hex_coord.HexCoord(-2, 3, -1)), true);
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

    describe('#shift 2', function() {
        it('move a hex y spaces in x direction', function() {
            var starting_spot = new hex_coord.HexCoord(1, -3, 2);
            var ending_spot = new hex_coord.HexCoord(-1, -1, 2);
            assert.equal(starting_spot.shift(4, 2).equals(ending_spot), true);
        });
    });

    describe('#shift 2', function() {
        it('move a hex y spaces in x direction', function() {
            var starting_spot = new hex_coord.HexCoord(1, -3, 2);
            var ending_spot = new hex_coord.HexCoord(-1, -1, 2);
            assert.equal(starting_spot.shift(4, 2).equals(ending_spot), true);
        });
    });

    describe('#ring (length)', function() {
        it('get an array of HexCoords a specific distance from the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var ring = starting_spot.ring(1);
            assert.equal(ring.length, 6);
        });
    });

    describe('#ring 2', function() {
        it('get an array of HexCoords a specific distance from the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var ring = starting_spot.ring(1);
            var spot_one = new hex_coord.HexCoord(-1, 1, 0);
            assert.equal(ring[1].equals(spot_one), true);
        });
    });

    describe('#ring 3', function() {
        it('get an array of HexCoords a specific distance from the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var ring = starting_spot.ring(1);
            var spot_three = new hex_coord.HexCoord(0, -1, 1);
            assert.equal(ring[3].equals(spot_three), true);
        });
    });

    describe('#ring 4 (length)', function() {
        it('get an array of HexCoords a specific distance from the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(1, -1, 0);
            var ring = starting_spot.ring(2);
            assert.equal(ring.length, 12);
        });
    });

    describe('#ring 5', function() {
        it('get an array of HexCoords a specific distance from the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(1, -1, 0);
            var ring = starting_spot.ring(2);
            var spot_three = new hex_coord.HexCoord(2, 0, -2);
            assert.equal(ring[3].equals(spot_three), true);
        });
    });

    describe('#spiral (length)', function() {
        it('get an array of HexCoords surrounding the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var spiral = starting_spot.spiral(2);
            assert.equal(spiral.length, 19);
        });
    });

    describe('#spiral 2', function() {
        it('get an array of HexCoords surrounding the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var spiral = starting_spot.spiral(2);
            var spot_one = new hex_coord.HexCoord(-2, 1, 1);
            assert.equal(spiral[1].equals(spot_one), true);
        });
    });

    describe('#spiral 3', function() {
        it('get an array of HexCoords surrounding the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var spiral = starting_spot.spiral(2);
            var spot_eighteen = new hex_coord.HexCoord(-3, 1, 2);
            assert.equal(spiral[18].equals(spot_eighteen), true);
        });
    });

});//end HexCoord

describe('OffsetCoord', function() {

    describe('#getCol', function() {
        it('should retrieve col value of coordinate', function() {
            assert.equal((new offs_coord.OffsetCoord(1, 2)).getCol(), 1);
        });
    });

    describe('#getCol 2', function() {
        it('should retrieve col value of coordinate', function() {
            assert.equal(new offs_coord.OffsetCoord(-3, 2).getCol(), -3);
        });
    });

    describe('#getRow', function() {
        it('should retrieve row value of coordinate', function() {
            assert.equal(new offs_coord.OffsetCoord(1, 2).getRow(), 2);
        });
    });

    describe('#getRow 2', function() {
        it('should retrieve row value of coordinate', function() {
            assert.equal(new offs_coord.OffsetCoord(1, -3).getRow(), -3);
        });
    });

    describe('#toCube', function() {
        it('Convert offset coordinate to cube coordinate', function() {
            var starting_spot = new offs_coord.OffsetCoord(1, 2);
            var converted = new hex_coord.HexCoord(1, 1, -2);
            assert.equal(starting_spot.toCube().equals(converted), true);
        });
    });

    describe('#toCube 2', function() {
        it('Convert offset coordinate to cube coordinate', function() {
            var starting_spot = new offs_coord.OffsetCoord(2, 1);
            var converted = new hex_coord.HexCoord(2, 0, -2);
            assert.equal(starting_spot.toCube().equals(converted), true);
        });
    });

    describe('#fromCube', function() {
        it('Convert cube coordinate to offset coordinate', function() {
            var starting_spot = new hex_coord.HexCoord(2, 0, -2);
            var converted = new offs_coord.OffsetCoord(2, 1);
            assert.equal(offs_coord.fromCube(starting_spot).equals(converted), true);
        });
    });

    describe('#fromCube 2', function() {
        it('Convert cube coordinate to offset coordinate', function() {
            var starting_spot = new hex_coord.HexCoord(1, 1, -2);
            var converted = new offs_coord.OffsetCoord(1, 2);
            assert.equal(offs_coord.fromCube(starting_spot).equals(converted), true);
        });
    });

});// end OffsetCoord

describe('Hex', function() {
    describe('this.coord', function() {
        it('Able to access a hexs coordinate', function() {
            var spot = new hex_coord.HexCoord(1, 2, -3);
            var the_hex = new hex.Hex(spot, "Plains");
            assert.equal(the_hex.getCoord().equals(spot), true);
        });
    });

    describe('this.coord 2', function() {
        it('Able to access a hexs coordinate', function() {
            var spot = new hex_coord.HexCoord(3, 2, -5);
            var the_hex = new hex.Hex(spot, "Plains");
            assert.equal(the_hex.getCoord().equals(spot), true);
        });
    });

    describe('this.biome', function() {
        it('Able to access a hexs biome', function() {
            var spot = new hex_coord.HexCoord(-3, 2, 1);
            var the_hex = new hex.Hex(spot, "Plains");
            assert.equal(the_hex.getBiome(), "Plains");
        });
    });
    describe('this.biome 2', function() {
        it('Able to access a hexs biome', function() {
            var spot = new hex_coord.HexCoord(-3, 2, 1);
            var the_hex = new hex.Hex(spot, "Forest");
            assert.equal(the_hex.getBiome(), "Forest");
        });
    });
});//end Hex