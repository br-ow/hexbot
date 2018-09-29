/* Cubic hex coordinates
 * Author: Brifactor
 * Making heavy use of:
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 */
"use strict";

const math = require('mathjs');


//Cubic hex coordinates
//all three coordinates must have a sum of zero.
class HexCoord {
    constructor(q, r, s) {
        this.q = q;
        this.r = r;
        this.s = s;

        if(math.round(q + r + s) !== 0) {
            throw "q + r + s must be 0";
        }
    }
    equals(other_coord) {
            return ((other_coord.q === this.q ) && 
            (other_coord.r === this.r) && 
            (other_coord.s === this.s));
    }

    //Basic functions for manipulating HexCoords
    add(b) {
        return new HexCoord(this.q + b.q, this.r + b.r, this.s + b.s);
    }

    subtract(b) {
        var qi = this.q - b.q;
        var ri = this.r - b.r;
        var si = this.s - b.s;
        var answer = new HexCoord(qi, ri, si);
        return answer;
    }

    scale(k) {
        return new HexCoord(this.q * k, this.r * k, this.s * k);
    }

    rotate_left() {
        return new HexCoord(-this.s, -this.q, -this.r);
    }

    rotate_right() {
        return new HexCoord(-this.r, -this.s, -this.q);
    }

    direction(direction) {
        /* Initial definition now that HexCoord has been defined
         * Since we're using FLAT-TOPPED hexes, directions are :
         * 0 = NE;  1 = SE;  2 = S
         * 3 = SW;  4 = NW;  5 = N
         */
        
        const dirs = [new HexCoord(1, 0, -1), new HexCoord(1, -1, 0),
         new HexCoord(0, -1, 1), new HexCoord(-1, 0, 1), new HexCoord(-1, 1, 0),
          new HexCoord(0, 1, -1)];
        return dirs[direction];
    }

    //Find neighbor in Direction
    neighbor(direction) {
        return this.add(this.direction(direction));
    }

    length() {
        return ((math.abs(this.q) + math.abs(this.r) + math.abs(this.s))/2);
    }

    //Distance between two hexes
    distance(b) {
        var difference = this.subtract(b);
        return difference.length();
    }

    //round a cube coordinate to the nearest integer (hex) coordinate
    round() {
        var qi = math.round(this.q);
        var ri = math.round(this.r);
        var si = math.round(this.s);
        var q_diff = math.abs(qi - this.q);
        var r_diff = math.abs(ri - this.r);
        var s_diff = math.abs(si - this.s);

        if (q_diff > r_diff && q_diff > s_diff) {
            qi = -ri - si;
        }
        else if (r_diff > s_diff) {
            ri = -qi - si;
        }
        else {
            si = -qi - ri;
        }
        return new HexCoord(qi, ri, si);
    }

    //Shift a HexCoord x distance in y direction
    shift(dir, dist) {
        //Make a copy of the direction so we don't mess it up
        var dir_ref = this.direction(dir);
        var direction = new HexCoord(dir_ref.q, dir_ref.r, dir_ref.s);

        return this.add(direction.scale(dist));
    }

}//end class



exports.HexCoord = HexCoord;