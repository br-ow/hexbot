/* Cubic hex coordinates
 * Author: Brifactor
 * Making heavy use of:
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 */

const HEX_DIR; //Hex directions using cubic coordinates

//Cubic hex coordinates
//all three coordinates must have a sum of zero.
function HexCoord(q, r, s) {
    if (Math.round(q + r + s) !== 0) {
       throw "q + r + s must be 0";
    }
    else {
       this.q = q;
       this.r = r;
       this.s = s;
       //TODO: Equals, hash code
       return this;
    }
}

//Basic functions for manipulating HexCoords
function hex_add(a, b) {
    return HexCoord(a.q + b.q, a.r + b.r, a.s + b.s);
}

function hex_subtract(a, b) {
    return HexCoord(a.q - b.q, a.r - b.r, a.s - b.s);
}

function hex_scale(a, k) {
    return HexCoord(a.q * k, a.r * k, a.s * k);
}

function hex_rotate_left(a) {
    return HexCoord(-a.s, -a.q, -a.r);
}

function hex_rotate_right(a) {
    return HexCoord(-a.r, -a.s, -a.q);
}

/* Initial definition now that HexCoord has been defined
 * Since we're using FLAT-TOPPED hexes, directions are:
 * 0 = NE;  1 = SE;  2 = S
 * 3 = SW;  4 = NW;  5 = N
 */
HEX_DIR = [HexCoord(1, 0, -1), HexCoord(1, -1, 0), HexCoord(0, -1, 1),
 HexCoord(-1, 0, 1), HexCoord(-1, 1, 0), HexCoord(0, 1, -1)];

function hex_direction(direction) {
    return HEX_DIR[direction];
}

//Find neighbor in Direction
function hex_neighbor(coord, direction) {
    return hex_add(coord, hex_direction(direction));
}

function hex_length(coord) {
    return ((Math.abs(coord.q) + Math.abs(coord.r) + Math.abs(coord.s)) / 2);
}

//Distance between two hexes
function hex_distance(a, b) {
    return hex_length (hex_subtract(a, b));
}

//round a cube coordinate to the nearest integer (hex) coordinate
function hex_round(h) {
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
    return HexCoord(qi, ri, si);
}

//Shift a HexCoord x distance in y direction
function hex_shift(h, dir, dist) {
    //Make a copy of the direction so we don't mess it up
    var dir_ref = hex_direction(dir);
    var direction = HexCoord(dir_ref.q, dir_ref.r, dir_ref.s);

    return hex_add(h, hex_scale(direction, dist));
}
