/* Landmark or dungeon within a hex.
 * Author: Brifactor
 */

 //Includes
const math = require('mathjs');
var __ = require('private-parts').createKey(); //Makes attributes private
const coord = require('./HexCoord.js');

class Landmark {
    constructor (pos, close_desc, far_desc) {

        __(this).coord = pos;
        __(this).close_desc = close_desc; //Description when you're at the landmark
        __(this).far_desc = far_desc; //What the landmark looks like from far away.
        __(this).spot_ease = 1; //How easy it is to see this landmark; multiply
                                // the party's sight radius by spot_ease when looking for this
    }

    getPos() {
        return __(this).coord;
    }

    setPos(new_pos) {
        __(this).coord = new_pos;
    }

    getCloseDesc() {
        return __(this).close_desc;
    }

    setCloseDesc(new_desc) {
        __(this).close_desc = new_desc;
    }

    getFarDesc() {
        return __(this).far_desc;
    }

    setFarDesc(new_desc) {
        __(this).far_desc = new_desc;
    }

    getSpotEase() {
        return __(this).spot_ease;
    }

    setSpotEase(new_ease) {
        __(this).spot_ease = new_ease;
    }

    /* Returns boolean; whether or not this landmark can be seen
     *  from the given spot with the given sight radius
     */
    canSpot(from_pos, sight_rad) {
        var sight_dist = sight_rad * __(this).spot_ease;
        var act_dist = __(this).coord.distance(from_pos);
        return (act_dist <= sight_dist);
    }

    //Returns string; Generates a code fairly unique to this landmark
    sCode() {
        return __(this).close_desc + " " + __(this).coord.toString();
    }

}

exports.Landmark = Landmark;