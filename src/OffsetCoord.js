/* Offset hex coordinates
 * Only used for converting to and from world generator
 * Author: Brifactor
 * Making heavy use of:
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 */
"use strict";

//include
const Hex = require('./HexCoord.js');

//constants
const EVEN = 1; //What TextMapper currently uses!
const ODD = -1;
const OFFSET = EVEN; //since it's not going to change and could get messy otherwise

class OffsetCoord {
    constructor (col, row) {
    this.col = col;
    this.row = row;
    }

    equals(other_coord) {
        return ((other_coord.col === this.col ) && 
        (other_coord.row === this.row));
    }

    offsetToCube(offset, h) {
        var q = h.col;
        var r = h.row - (h.col + offset * (h.col & 1)) / 2;//bitwise &; returns 1 if ODD, else 0 if EVEN
        var s = -q - r;
        return new Hex.HexCoord(q, r, s);
    }

    //Wrapper function because offset is likely to be predeterimined
    toCube() {
        return this.offsetToCube(OFFSET, this);
    }
}//end class

exports.OffsetCoord = OffsetCoord;


function offsetFromCube(offset, h) {
    var col = h.q;
    var row = h.r + (h.q + offset * (h.q & 1)) / 2;
    return new OffsetCoord(col, row);
}

//Wrapper function because offset is likely to be predeterimined
exports.fromCube = function (h) {
    return offsetFromCube(OFFSET, h);
}
