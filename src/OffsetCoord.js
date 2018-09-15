/* Offset hex coordinates
 * Only used for converting to and from world generator
 * Author: Brifactor
 * Making heavy use of:
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 */

//include
const Hex = require('./HexCoord.js');

//constants
const EVEN = 1; //What TextMapper currently uses!
const ODD = -1;
const OFFSET = EVEN; //since it's not going to change and could get messy otherwise

function OffsetCoord(col, row) {
    this.col = col;
    this.row = row;
    return this;
 }


function qoffset_from_cube(offset, h) {
    var col = h.q;
    var row = h.r + (h.q + offset * (h.q & 1)) / 2;
    return OffsetCoord(col, row);
}

//Wrapper function because offset is likely to be predeterimined
function offs_from_cube(h) {
    return qoffset_from_cube(OFFSET, h);
}

function qoffset_to_cube(offset, h) {
    var q = h.col;
    var r = h.row - (h.col + offset * (h.col & 1)) / 2;
    var s = -q - r;
    return HexCoord(q, r, s);
}

function offs_to_cube(h) {
    return qoffset_to_cube(OFFSET, h);
}