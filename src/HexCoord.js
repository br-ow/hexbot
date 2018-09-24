/* Cubic hex coordinates
 * Author: Brifactor
 * Making heavy use of:
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 */

// const HEX_DIR; //Hex directions using cubic coordinates

//Cubic hex coordinates
//all three coordinates must have a sum of zero.
exports.HexCoord = function(q, r, s) {
    if (Math.round(q + r + s) !== 0) {
        throw "q + r + s must be 0";
    }
    else {
        this.q = q;
        this.r = r;
        this.s = s;
        this.equals = function(other_coord) {
            return ((other_coord.q === this.q ) && 
            (other_coord.r === this.r) && 
            (other_coord.s === this.s));
        };
        //TODO: Equals, hash code
        return this;
    }
};

//Basic functions for manipulating HexCoords
exports.add = function(a, b) {
    return exports.HexCoord(a.q + b.q, a.r + b.r, a.s + b.s);
};

exports.subtract = function(a, b) {
    return exports.HexCoord(a.q - b.q, a.r - b.r, a.s - b.s);
};

exports.scale = function(a, k) {
    return exports.HexCoord(a.q * k, a.r * k, a.s * k);
};

exports.rotate_left = function(a) {
    return exports.HexCoord(-a.s, -a.q, -a.r);
};

exports.rotate_right = function(a) {
    return exports.HexCoord(-a.r, -a.s, -a.q);
};

/* Initial definition now that HexCoord has been defined
 * Since we're using FLAT-TOPPED hexes, directions are :
 * 0 = NE;  1 = SE;  2 = S
 * 3 = SW;  4 = NW;  5 = N
 */
const HEX_DIR = [exports.HexCoord(1, 0, -1), exports.HexCoord(1, -1, 0),
 exports.HexCoord(0, -1, 1), exports.HexCoord(-1, 0, 1), exports.HexCoord(-1, 1, 0),
  exports.HexCoord(0, 1, -1)];

exports.direction = function(direction) {
    return HEX_DIR[direction];
};

//Find neighbor in Direction
exports.neighbor = function(coord, direction) {
    return exports.hex_add(coord, hex_direction(direction));
};

exports.length = function(coord) {
    return ((Math.abs(coord.q) + Math.abs(coord.r) + Math.abs(coord.s)) / 2);
};

//Distance between two hexes
exports.distance = function(a, b) {
    return exports.hex_length (hex_subtract(a, b));
};

//round a cube coordinate to the nearest integer (hex) coordinate
exports.round = function(h) {
    var qi = Math.round(h.q);
    var ri = Math.round(h.r);
    var si = Math.round(h.s);
    var q_diff = Math.abs(qi - h.q);
    var r_diff = Math.abs(ri - h.r);
    var s_diff = Math.abs(si - h.s);

    if (q_diff > r_diff && q_diff > s_diff) {
        qi = -ri - si;
    }
    else if (r_diff > s_diff) {
        ri = -qi - si;
    }
    else {
        si = -qi - ri;
    }
    return exports.HexCoord(qi, ri, si);
};

//Shift a HexCoord x distance in y direction
exports.shift = function(h, dir, dist) {
    //Make a copy of the direction so we don't mess it up
    var dir_ref = exports.hex_direction(dir);
    var direction = exports.HexCoord(dir_ref.q, dir_ref.r, dir_ref.s);

    return exports.hex_add(h, hex_scale(direction, dist));
};