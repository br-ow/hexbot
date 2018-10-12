/* Offset hex coordinates
 * Only used for converting to and from world generator
 * Author: Brifactor
 * Making heavy use of:
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 */
"use strict";

//include
const Hex = require('./HexCoord.js');
var __ = require('private-parts').createKey(); //Makes attributes private

//constants
const EVEN = 1; //What TextMapper currently uses!
const ODD = -1;
const OFFSET = EVEN; //since it's not going to change and could get messy otherwise

class OffsetCoord {
    constructor (col, row) {
    __(this).col = col;
    __(this).row = row;
    }

    equals(other_coord) {
        return ((__(other_coord).col === __(this).col ) && 
        (__(other_coord).row === __(this).row));
    }

    getCol() {
        return __(this).col;
    }

    getRow() {
        return __(this).row;
    }

    offsetToCube(offset, h) {
        var q = __(h).col;
        var r = __(h).row - (__(h).col + offset * (__(h).col & 1)) / 2;//bitwise &; returns 1 if ODD, else 0 if EVEN
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
    var col = h.getQ();
    var row = h.getR() + (h.getQ() + offset * (h.getQ() & 1)) / 2;
    return new OffsetCoord(col, row);
}

//Wrapper function because offset is likely to be predeterimined
exports.fromCube = function (h) {
    return offsetFromCube(OFFSET, h);
}
