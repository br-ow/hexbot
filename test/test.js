/*Tests for the HexBott
 *Author: Brifactor
 *Help from https://mochajs.org/
 */

var assert = require('assert');
const hex_coord = require ('../src/HexCoord.js');
const offs_coord = require('../src/OffsetCoord.js');
const world_mod = require('../src/World.js');
var world = world_mod.instance;
const hex = require('../src/Hex.js');
const sess = require('../src/Session.js');
var gm_mod = require('../src/GameMaster.js');
var gm = gm_mod.instance;
var landmark = require('../src/Landmark.js');
var landmark_make = require('../src/LandmarkMaker.js');
var lmaker = landmark_make.instance;

var save = require('../save.json'); //Save file


describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
});

describe('HexCoord', function() {
    describe('#getQ()', function() {
        it('should retrieve q value of coordinate', function() {
            assert.equal((new hex_coord.HexCoord(1, 2, -3)).getQ(), 1);
        });
    });

    describe('#getQ() 2', function() {
        it('should retrieve q value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(-3, 2, 1).getQ(), -3);
        });
    });

    describe('#getR()', function() {
        it('should retrieve r value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(1, 2, -3).getR(), 2);
        });
    });

    describe('#getR() 2', function() {
        it('should retrieve r value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(1, -3, 2).getR(), -3);
        });
    });

    describe('#getS()', function() {
        it('should retrieve s value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(1, 2, -3).getS(), -3);
        });
    });

    describe('#getS() 2', function() {
        it('should retrieve s value of coordinate', function() {
            assert.equal(new hex_coord.HexCoord(-3, 2, 1).getS(), 1);
        });
    });

    describe('#add()', function() {
        it('add two HexCoords together', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            var add_dir = new hex_coord.HexCoord(1, 0, -1);
            assert.equal((starting_spot.add(add_dir)).equals(new hex_coord.HexCoord(2, 2, -4)), true);
        });
    });

    describe('#add() 2', function() {
        it('add two HexCoords together', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            var add_dir = new hex_coord.HexCoord(-1, 0, 1);
            assert.equal(starting_spot.add(add_dir).equals(new hex_coord.HexCoord(0, 2, -2)), true);
        });
    });

    describe('#subtract()', function() {
        it('subtract two HexCoords', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            var sub_dir = new hex_coord.HexCoord(1, 0, -1);
            assert.equal(starting_spot.subtract(sub_dir).equals(new hex_coord.HexCoord(0, 2, -2)), true);
        });
    });

    describe('#subtract() 2', function() {
        it('subtract two HexCoords', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            var sub_dir = new hex_coord.HexCoord(-1, 0, 1);
            assert.equal(starting_spot.subtract(sub_dir).equals(new hex_coord.HexCoord(2, 2, -4)), true);
        });
    });

    describe('#scale()', function() {
        it('multiply a HexCoord', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.scale(2).equals(new hex_coord.HexCoord(2, 4, -6)), true);
        });
    });

    describe('#scale() 2', function() {
        it('multiply a HexCoord', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.scale(3).equals(new hex_coord.HexCoord(3, 6, -9)), true);
        });
    });

    describe('#rotateLeft()', function() {
        it('rotate HexCoord to the left', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.rotateLeft().equals(new hex_coord.HexCoord(3, -1, -2)), true);
        });
    });

    describe('#rotateRight()', function() {
        it('rotate HexCoord to the right', function() {
            var starting_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.rotateRight().equals(new hex_coord.HexCoord(-2, 3, -1)), true);
        });
    });

    describe('#direction()', function() {
        it('get a direction', function() {
            assert.equal(new hex_coord.HexCoord(0,0,0).direction(4).equals(new hex_coord.HexCoord(-1, 1, 0)), true);
        });
    });

    describe('#neighbor()', function() {
        it('get a neighbor', function() {
            var starting_spot = new hex_coord.HexCoord(1, -2, 1);
            assert.equal(starting_spot.neighbor(1).equals(new hex_coord.HexCoord(2, -3, 1)), true);
        });
    });

    describe('#length()', function() {
        it('distance from hex to center?', function() {
            var starting_spot = new hex_coord.HexCoord(4, -4, 0);
            assert.equal(starting_spot.length(), 4);
        });
    });

    describe('#length() 2', function() {
        it('distance from hex to center?', function() {
            var starting_spot = new hex_coord.HexCoord(3, 2, -5);
            assert.equal(starting_spot.length(), 5);
        });
    });

    describe('#distance()', function() {
        it('distance between two hexes', function() {
            var starting_spot = new hex_coord.HexCoord(1, -2, 1);
            var ending_spot = new hex_coord.HexCoord(1, 2, -3);
            assert.equal(starting_spot.distance(ending_spot), 4);
        });
    });

    describe('#distance() 2', function() {
        it('distance between two hexes', function() {
            var starting_spot = new hex_coord.HexCoord(1, -2, 1);
            var ending_spot = new hex_coord.HexCoord(1, 1, -2);
            assert.equal(starting_spot.distance(ending_spot), 3);
        });
    });

    describe('#round()', function() {
        it('round fractional HexCoord to the nearest hex', function() {
            var starting_spot = new hex_coord.HexCoord(1.6, -3, 1.4);
            var rounds_to = new hex_coord.HexCoord(2, -3, 1);
            assert.equal(starting_spot.round().equals(rounds_to), true);
        });
    });

    describe('#round() 2', function() {
        it('round fractional HexCoord to the nearest hex', function() {
            var starting_spot = new hex_coord.HexCoord(1.6, 1.4, -3);
            var rounds_to = new hex_coord.HexCoord(2, 1, -3);
            assert.equal(starting_spot.round().equals(rounds_to), true);
        });
    });

    describe('#shift()', function() {
        it('move a hex y spaces in x direction', function() {
            var starting_spot = new hex_coord.HexCoord(-2, -1, 3);
            var ending_spot = new hex_coord.HexCoord(2, -1, -1);
            assert.equal(starting_spot.shift(0, 4).equals(ending_spot), true);
        });
    });

    describe('#shift() 2', function() {
        it('move a hex y spaces in x direction', function() {
            var starting_spot = new hex_coord.HexCoord(1, -3, 2);
            var ending_spot = new hex_coord.HexCoord(-1, -1, 2);
            assert.equal(starting_spot.shift(4, 2).equals(ending_spot), true);
        });
    });

    describe('#ring() (length)', function() {
        it('get an array of HexCoords a specific distance from the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var ring = starting_spot.ring(1);
            assert.equal(ring.length, 6);
        });
    });

    describe('#ring() 2', function() {
        it('get an array of HexCoords a specific distance from the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var ring = starting_spot.ring(1);
            var spot_one = new hex_coord.HexCoord(-1, 1, 0);
            assert.equal(ring[1].equals(spot_one), true);
        });
    });

    describe('#ring() 3', function() {
        it('get an array of HexCoords a specific distance from the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var ring = starting_spot.ring(1);
            var spot_three = new hex_coord.HexCoord(0, -1, 1);
            assert.equal(ring[3].equals(spot_three), true);
        });
    });

    describe('#ring() 4 (length)', function() {
        it('get an array of HexCoords a specific distance from the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(1, -1, 0);
            var ring = starting_spot.ring(2);
            assert.equal(ring.length, 12);
        });
    });

    describe('#ring() 5', function() {
        it('get an array of HexCoords a specific distance from the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(1, -1, 0);
            var ring = starting_spot.ring(2);
            var spot_three = new hex_coord.HexCoord(2, 0, -2);
            assert.equal(ring[3].equals(spot_three), true);
        });
    });

    describe('#spiral() (length)', function() {
        it('get an array of HexCoords surrounding the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var spiral = starting_spot.spiral(2);
            assert.equal(spiral.length, 19);
        });
    });

    describe('#spiral() 2', function() {
        it('get an array of HexCoords surrounding the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var spiral = starting_spot.spiral(2);
            var spot_one = new hex_coord.HexCoord(-2, 1, 1);
            assert.equal(spiral[1].equals(spot_one), true);
        });
    });

    describe('#spiral() 3', function() {
        it('get an array of HexCoords surrounding the given spot', function() {
            var starting_spot = new hex_coord.HexCoord(-1, 0, 1);
            var spiral = starting_spot.spiral(2);
            var spot_eighteen = new hex_coord.HexCoord(-3, 1, 2);
            assert.equal(spiral[18].equals(spot_eighteen), true);
        });
    });

});//end HexCoord

describe('OffsetCoord', function() {

    describe('#getCol()', function() {
        it('should retrieve col value of coordinate', function() {
            assert.equal((new offs_coord.OffsetCoord(1, 2)).getCol(), 1);
        });
    });

    describe('#getCol() 2', function() {
        it('should retrieve col value of coordinate', function() {
            assert.equal(new offs_coord.OffsetCoord(-3, 2).getCol(), -3);
        });
    });

    describe('#getRow()', function() {
        it('should retrieve row value of coordinate', function() {
            assert.equal(new offs_coord.OffsetCoord(1, 2).getRow(), 2);
        });
    });

    describe('#getRow() 2', function() {
        it('should retrieve row value of coordinate', function() {
            assert.equal(new offs_coord.OffsetCoord(1, -3).getRow(), -3);
        });
    });

    describe('#toCube()', function() {
        it('Convert offset coordinate to cube coordinate', function() {
            var starting_spot = new offs_coord.OffsetCoord(1, 2);
            var converted = new hex_coord.HexCoord(1, 1, -2);
            assert.equal(starting_spot.toCube().equals(converted), true);
        });
    });

    describe('#toCube() 2', function() {
        it('Convert offset coordinate to cube coordinate', function() {
            var starting_spot = new offs_coord.OffsetCoord(2, 1);
            var converted = new hex_coord.HexCoord(2, 0, -2);
            assert.equal(starting_spot.toCube().equals(converted), true);
        });
    });

    describe('#fromCube()', function() {
        it('Convert cube coordinate to offset coordinate', function() {
            var starting_spot = new hex_coord.HexCoord(2, 0, -2);
            var converted = new offs_coord.OffsetCoord(2, 1);
            assert.equal(offs_coord.fromCube(starting_spot).equals(converted), true);
        });
    });

    describe('#fromCube() 2', function() {
        it('Convert cube coordinate to offset coordinate', function() {
            var starting_spot = new hex_coord.HexCoord(1, 1, -2);
            var converted = new offs_coord.OffsetCoord(1, 2);
            assert.equal(offs_coord.fromCube(starting_spot).equals(converted), true);
        });
    });

});// end OffsetCoord

describe('Hex', function() {
    describe('#getCoord()', function() {
        it('Able to access a hexs coordinate', function() {
            var spot = new hex_coord.HexCoord(1, 2, -3);
            var the_hex = new hex.Hex(spot, "Plains");
            assert.equal(the_hex.getCoord().equals(spot), true);
        });
    });

    describe('#getCoord() / setcoord()', function() {
        it('Able to access and change a hexs coordinate', function() {
            var spot = new hex_coord.HexCoord(3, 2, -5);
            var the_hex = new hex.Hex(spot, "Plains");
            assert.equal(the_hex.getCoord().equals(spot), true);
            var new_spot = new hex_coord.HexCoord(-2, 1, 1);
            the_hex.setCoord(new_spot);
            assert.equal(the_hex.getCoord().equals(spot), false);
            assert.equal(the_hex.getCoord().equals(new_spot), true);
        });
    });

    describe('#getBiome()', function() {
        it('Able to access a hexs biome', function() {
            var spot = new hex_coord.HexCoord(-3, 2, 1);
            var the_hex = new hex.Hex(spot, "Plains");
            assert.equal(the_hex.getBiome(), "Plains");
        });
    });

    describe('#getBiome() / setBiome()', function() {
        it('Able to access and change a hexs biome', function() {
            var spot = new hex_coord.HexCoord(-3, 2, 1);
            var the_hex = new hex.Hex(spot, "Forest");
            assert.equal(the_hex.getBiome(), "Forest");
            the_hex.setBiome("Plains");
            assert.equal(the_hex.getBiome(), "Plains");
        });
    });

    describe('#numLandmarks() / addLandmark()', function() {
        it('Able to count and add landmarks', function() {
            var spot = new hex_coord.HexCoord(-3, 2, 1);
            var the_hex = new hex.Hex(spot, "Plains");
            assert.equal(the_hex.numLandmarks(), 0);
            the_hex.addLandmark("a red flower");
            assert.equal(the_hex.numLandmarks(), 1);
        });
    });

    describe('#addLandmark() / getLandmark()', function() {
        it('Able to add and retrieve landmarks', function() {
            var spot = new hex_coord.HexCoord(-3, 2, 1);
            var the_hex = new hex.Hex(spot, "Plains");
            the_hex.addLandmark("a red flower");
            assert.equal(the_hex.getLandmark(0), "a red flower");
        });
    });

    describe('#delLandmark()', function() {
        it('Able to add and delete landmarks', function() {
            var spot = new hex_coord.HexCoord(-3, 2, 1);
            var the_hex = new hex.Hex(spot, "Plains");
            the_hex.addLandmark("a blue flower");
            assert.equal(the_hex.getLandmark(0), "a blue flower");
            the_hex.addLandmark("a pink flower");
            the_hex.delLandmark(0);
            assert.equal(the_hex.getLandmark(0), "a pink flower");
        });
    });

});//end Hex

describe('World', function() {
    describe('#getHex()', function() {
        it('Place and retrieve a hex on the map', function() {
            var spot = new hex_coord.HexCoord(0, 1, -1);
            var the_hex = new hex.Hex(spot, "Plains");
            var same_spot = new hex_coord.HexCoord(0, 1, -1);
            world.setHex(the_hex.getCoord(), the_hex);
            assert.equal(world.getHex(same_spot).getBiome(), "Plains");
        });
    });

    describe('#getHex() 2', function() {
        it('Place and retrieve a hex on the map', function() {
            var spot = new hex_coord.HexCoord(2, -1, -1);
            var the_hex = new hex.Hex(spot, "Forest");
            var same_spot = new hex_coord.HexCoord(2, -1, -1);
            world.setHex(the_hex.getCoord(), the_hex);
            assert.equal(world.getHex(same_spot).getBiome(), "Forest");
        });
    });

    describe('#getHex() 3', function() {
        it('Retrieve auto-generated hex on map.', function() {
            var spot = new hex_coord.HexCoord(0, 0, 0);
            var same_spot = new hex_coord.HexCoord(0, 0, 0);
            assert.equal(world.getHex(spot).getCoord().equals(same_spot), true);
        });
    });
});//end World

describe('Session', function() {
    describe('#hasUser()', function() {
        it('Should recognize the user we put there.', function() {
            var session = new sess.Session(123);
            assert.equal(session.hasUser(123), true);
        });
    });

    describe('#hasUser() 2', function() {
        it('Should not recognize the user we did not put there.', function() {
            var session = new sess.Session(123);
            assert.equal(session.hasUser(456), false);
        });
    });

    describe('#addUser()', function() {
        it('Add additional users to the session', function() {
            var session = new sess.Session(123);
            assert.equal(session.numUsers(), 1);
            session.addUser(456)
            assert.equal(session.numUsers(), 2);
            assert.equal(session.hasUser(456), true);
        });
    });

    describe('#removeUser()', function() {
        it('Remove a user from the session', function() {
            var session = new sess.Session(123);
            assert.equal(session.numUsers(), 1);
            session.addUser(456)
            assert.equal(session.numUsers(), 2);
            assert.equal(session.hasUser(123), true);
            session.removeUser(123);
            assert.equal(session.hasUser(123), false);
        });
    });

    describe('#getSeason()', function() {
        it('Can retrieve season', function() {
            var session = new sess.Session(123);
            assert.equal(session.getSeason(), save.season);
        });
    });

    describe('#setSeason()', function() {
        it('Can set and retrieve season', function() {
            var session = new sess.Session(123);
            assert.equal(session.getSeason(), save.season);
            session.setSeason("Summer");
            assert.equal(session.getSeason(), "Summer");
        });
    });

    describe('#setPos() / getPos()', function() {
        it('Can set and retrieve position', function() {
            var session = new sess.Session(123);
            var start_pos = new hex_coord.HexCoord(save.basex, save.basey, save.basez);
            assert.equal(session.getPos().equals(start_pos), true);

            var spot = new hex_coord.HexCoord(2, -1, -1);
            var same_spot = new hex_coord.HexCoord(2, -1, -1);
            session.setPos(spot);
            assert.equal(session.getPos().equals(spot), true);
        });
    });

    describe('#setFacing() / getFacing()', function() {
        it('Can set and retrieve facing', function() {
            var session = new sess.Session(123);
            assert.equal(session.getFacing(), 0);

            session.setFacing(3);
            assert.equal(session.getFacing(), 3);
        });
    });

    describe('#setHour() / getHour()', function() {
        it('Can set and retrieve hour', function() {
            var session = new sess.Session(123);
            assert.equal(session.getHour(), 8);

            session.setHour(11);
            assert.equal(session.getHour(), 11);
        });
    });

    describe('#setMinute() / getMinute()', function() {
        it('Can set and retrieve minute', function() {
            var session = new sess.Session(123);
            assert.equal(session.getMinute(), 0);

            session.setMinute(30);
            assert.equal(session.getMinute(), 30);
        });
    });

    describe('#passMinutes()', function() {
        it('Can advance time by a number of minutes', function() {
            var session = new sess.Session(123);
            assert.equal(session.getHour(), 8);
            assert.equal(session.getMinute(), 0);
            session.passMinutes(67);
            assert.equal(session.getHour(), 9);
            assert.equal(session.getMinute(), 7);
        });
    });

    describe('#getState()', function() {
        it('Session starts in the FREE state', function() {
            var session = new sess.Session(123);
            assert.equal(session.getState(), sess.StateEnum.FREE);
        });
    });

    describe('#setState()', function() {
        it('Can set and get state', function() {
            var session = new sess.Session(123);
            assert.equal(session.getState(), sess.StateEnum.FREE);
            session.setState(sess.StateEnum.FIGHT);
            assert.equal(session.getState(), sess.StateEnum.FIGHT);
        });
    });

    describe('#setState() 2', function() {
        it('Cannot set to invalid state', function() {
            var session = new sess.Session(123);
            assert.equal(session.getState(), sess.StateEnum.FREE);
            session.setState("eating");
            assert.equal(session.getState(), sess.StateEnum.FREE);
        });
    });

    describe('#isIgnoring()', function() {
        it('Should not recognize the landmark we didnt put there.', function() {
            var session = new sess.Session(123);
            assert.equal(session.isIgnoring("a big leafy tree"), false);
        });
    });

    describe('#addIgnore()', function() {
        it('Add ignored landmark to the session', function() {
            var session = new sess.Session(123);
            session.addIgnore("a big leafy tree");
            assert.equal(session.isIgnoring("a big leafy tree"), true);
        });
    });

    describe('#unIgnore()', function() {
        it('Remove a user from the session', function() {
            var session = new sess.Session(123);
            session.addIgnore("a big leafy tree");
            assert.equal(session.isIgnoring("a big leafy tree"), true);
            session.unIgnore("a big leafy tree");
            assert.equal(session.isIgnoring("a big leafy tree"), false);
        });
    });

    describe('#unIgnore()', function() {
        it('Remove a user from the session', function() {
            var session = new sess.Session(123);
            session.addIgnore("a big leafy tree");
            session.addIgnore("a little scrawny tree");
            assert.equal(session.isIgnoring("a big leafy tree"), true);
            assert.equal(session.isIgnoring("a little scrawny tree"), true);
            session.clearIgnores();
            assert.equal(session.isIgnoring("a big leafy tree"), false);
            assert.equal(session.isIgnoring("a little scrawny tree"), false);
        });
    });

});//end Session

describe('GameMaster', function() {
    describe('#makeSessionFor()', function() {
        it('Make a new session for a user', function() {
            gm.makeSessionFor(123);
            assert.equal(gm.hasSessionWith(123), true);
        });
    });

    describe('#makeSessionFor()', function() {
        it('Do not make session if user is already in one', function() {
            gm.makeSessionFor(123);
            assert.equal(gm.makeSessionFor(123), false);
        });
    });

    describe('#hasSessionWith()', function() {
        it('Should return false for a user we have not added yet', function() {
            assert.equal(gm.hasSessionWith(456), false);
        });
    });

    describe('#addUserByTag()', function() {
        it('Does not add user if they are already in session or if wrong user is tagged', function() {
            gm.makeSessionFor(123);
            assert.equal(gm.addUserByTag(123, 123), false);//already in
            assert.equal(gm.addUserByTag(456, 404), false);//wrong tag
        });
    });

    describe('#addUserByTag() 2', function() {
        it('Add a user to an existing session with another user', function() {
            gm.makeSessionFor(123);
            gm.addUserByTag(456, 123);
            assert.equal(gm.hasSessionWith(456), true);
        });
    });

    describe('#removeFromSession()', function() {
        it('Take the user out of their session', function() {
            gm.makeSessionFor(123);
            assert.equal(gm.hasSessionWith(123), true);
            gm.removeFromSession(123);
            assert.equal(gm.hasSessionWith(123), false);
        });
    });

    describe('#setFacing()', function() {
        it('Set the facing of a party with a user.', function() {
            gm.makeSessionFor(123);
            assert.equal(gm.getFacing(123), 0);//default
            gm.setFacing(3, 123); //uses navDir instead of hexDir
            assert.equal(gm.getFacing(123), 3);
        });
    });
    
    describe('#walkHr()', function() {
        it('Walk in a direction for some hours', function() {
            gm.makeSessionFor(123);
            gm.setFacing(0, 123); //uses navDir instead of hexDir; NE
            var expected_spot = gm.getPos(123);
            expected_spot = expected_spot.shift(0, 1.5);
            gm.walkHr(3, 123);
            assert.equal(gm.getPos(123).equals(expected_spot), true);
        });
    });

    describe('#turn()', function() {
        it('Turn a number of 45 degree increments.', function() {
            gm.makeSessionFor(234);
            gm.setFacing(3, 234); //uses navDir instead of hexDir
            assert.equal(gm.getFacing(234), 3);
            gm.turn(3, 234);
            assert.equal(gm.getFacing(234), 6);
        });
    });

    describe('#turn() 2', function() {
        it('Turn a number of 45 degree increments.', function() {
            gm.makeSessionFor(234);
            gm.setFacing(3, 234); //uses navDir instead of hexDir
            assert.equal(gm.getFacing(234), 3);
            gm.turn(-3, 234);
            assert.equal(gm.getFacing(234), 0);
        });
    });
});//end GameMaster

describe('Landmark', function() {
    describe('#getPos()', function() {
        it('Can make a landmark and get its position', function() {
            var pos = new hex_coord.HexCoord(1, 2, -3);
            var landm = new landmark.Landmark(pos, "a large, old tree with many gnarled branches", "a big tree");
            assert.equal(landm.getPos().equals(pos), true);
        });
    });
    describe('#setPos()', function() {
        it('Can get and set landmark position', function() {
            var pos = new hex_coord.HexCoord(1, 2, -3);
            var landm = new landmark.Landmark(pos, "a large, old tree with many gnarled branches", "a big tree");
            var new_pos = new hex_coord.HexCoord(1.4, 1.6, -3);
            landm.setPos(new_pos);
            assert.equal(landm.getPos().equals(new_pos), true);
            assert.equal(landm.getPos().equals(pos), false);
        });
    });
    describe('#getCloseDesc() / setCloseDesc()', function() {
        it('Can get and set landmark description (up close)', function() {
            var pos = new hex_coord.HexCoord(1, 2, -3);
            var landm = new landmark.Landmark(pos, "a large, old tree with many gnarled branches", "a big tree");
            assert.equal(landm.getCloseDesc(), "a large, old tree with many gnarled branches");
            landm.setCloseDesc("a tall pine tree");
            assert.equal(landm.getCloseDesc(), "a tall pine tree");
        });
    });

    describe('#getFarDesc() / setFarDesc()', function() {
        it('Can get and set landmark description (far away)', function() {
            var pos = new hex_coord.HexCoord(1, 2, -3);
            var landm = new landmark.Landmark(pos, "a large, old tree with many gnarled branches", "a big tree");
            assert.equal(landm.getFarDesc(), "a big tree");
            landm.setFarDesc("a gnarled tree");
            assert.equal(landm.getFarDesc(), "a gnarled tree");
        });
    });

    describe('#getSpotEase() / setSpotEase()', function() {
        it('Can get and set spot ease (affects how close you must be to see it)', function() {
            var pos = new hex_coord.HexCoord(1, 2, -3);
            var landm = new landmark.Landmark(pos, "a large, old tree with many gnarled branches", "a big tree");
            assert.equal(landm.getSpotEase(), 1);
            landm.setSpotEase(0.5);
            assert.equal(landm.getSpotEase(), 0.5);
        });
    });

    describe('#canSpot()', function() {
        it('Tests whether or not you can spot the landmark from a position with a certain sight radius', function() {
            var pos = new hex_coord.HexCoord(1, 2, -3);
            var landm = new landmark.Landmark(pos, "a large, old tree with many gnarled branches", "a big tree");
            var new_pos = new hex_coord.HexCoord(1.3, 1.7, -3);
            landm.setSpotEase(1);
            assert.equal(landm.canSpot(new_pos, 1), true);

        });
    });

    describe('#canSpot() 2', function() {
        it('Tests whether or not you can spot the landmark from a position with a certain sight radius', function() {
            var pos = new hex_coord.HexCoord(1, 2, -3);
            var landm = new landmark.Landmark(pos, "a large, old tree with many gnarled branches", "a big tree");
            var new_pos = new hex_coord.HexCoord(1.3, 1.7, -3);
            landm.setSpotEase(0.1);
            assert.equal(landm.canSpot(new_pos, 1), false);
        });
    });
});//end Landmark

describe('LandmarkMaker', function() {
    describe('#makeLandmark()', function() {
        it('creates a valid landmark within the given hex', function() {
            var pos = new hex_coord.HexCoord(1, 2, -3);
            var landm = lmaker.makeLandmark(pos, "Plains");
            assert.equal(landm.getPos().round().equals(pos), true);
        });
    });
});//end LandmarkMaker
