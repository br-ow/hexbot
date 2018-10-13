/* Cubic hex coordinates
 * Author: Brifactor
 * Making heavy use of:
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 */
"use strict";

//Includes
const math = require('mathjs');
var __ = require('private-parts').createKey(); //Makes attributes private


//Cubic hex coordinates
//all three coordinates must have a sum of zero.
class HexCoord {
    constructor(q, r, s) {
        __(this).q = q;
        __(this).r = r;
        __(this).s = s;

        if(math.round(q + r + s) !== 0) {
            throw "q + r + s must be 0";
        }
    }
    //For comparisons
    equals(other_coord) {
            return ((other_coord.getQ() === __(this).q ) && 
            (other_coord.getR() === __(this).r) && 
            (other_coord.getS() === __(this).s));
    }

    //For hash codes
    toString() {
        return "(" + __(this).q.toString() + ", " + __(this).r.toString() + ", " + __(this).s.toString() + ")";
    }

    getQ() {
        return __(this).q;
    }

    getR() {
        return __(this).r;
    }

    getS() {
        return __(this).s;
    }

    //Basic functions for manipulating HexCoords
    add(b) {
        return new HexCoord(__(this).q + b.getQ(), __(this).r + b.getR(), __(this).s + b.getS());
    }

    subtract(b) {
        var qi = __(this).q - b.getQ();
        var ri = __(this).r - b.getR();
        var si = __(this).s - b.getS();
        var answer = new HexCoord(qi, ri, si);
        return answer;
    }

    scale(k) {
        return new HexCoord(__(this).q * k, __(this).r * k, __(this).s * k);
    }

    rotateLeft() {
        return new HexCoord(-__(this).s, -__(this).q, -__(this).r);
    }

    rotateRight() {
        return new HexCoord(-__(this).r, -__(this).s, -__(this).q);
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
        return ((math.abs(__(this).q) + math.abs(__(this).r) + math.abs(__(this).s))/2);
    }

    //Distance between two hexes
    distance(b) {
        var difference = this.subtract(b);
        return difference.length();
    }

    //round a cube coordinate to the nearest integer (hex) coordinate
    round() {
        var qi = math.round(__(this).q);
        var ri = math.round(__(this).r);
        var si = math.round(__(this).s);
        var q_diff = math.abs(qi - __(this).q);
        var r_diff = math.abs(ri - __(this).r);
        var s_diff = math.abs(si - __(this).s);

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
        var direction = this.direction(dir);

        return this.add(direction.scale(dist));
    }

    //Get all coordinates in a ring at distance r from here
    ring(radius) {
        if (radius == 0) {
            return this;
        }
        var results = [];
        // this code doesn't work for radius == 0; can you see why?
        var cube = this.shift(4, radius);

        var i;
        var j;
        for (i = 0; i < 6; i++) {
            for(j = 0; j < radius; j++) {
                results.push(cube);
                cube = cube.neighbor(i);
            }
        }
        return results;
    }

    spiral(radius) {
        var results = [this];
        var k;
        var m;
        var ring;
        for (k = 1; k <= radius; k++) {
            ring = this.ring(k);
            for (m = 0; m < ring.length; m++) {
                results.push(ring[m]);
            }
        }
        return results;
    }

}//end class



exports.HexCoord = HexCoord;