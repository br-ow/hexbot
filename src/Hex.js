/* Contains everything that needs to be known about a certain area.
 * Author: Brifactor
 */
"use strict";

const coord = require('./HexCoord.js');
var __ = require('private-parts').createKey(); //Makes attributes private

/* Planned properties:
 * Coordinate: This one's easy. Just the hex's position on the map.
 * Biome: What type of area is it?
 * EncounterList: What monsters can be found there?
 * Boss? Unique boss monster that is generated from the encounter list
 * Point of Interest: Can be a dungeon or boss lair. But it's more likely
 *      to be a somewhat interesting landmark (e.g. a red cactus)
 */

class Hex {
    constructor (coordinate, biome) {
        __(this).coord = coordinate;
        __(this).biome = biome;
        //add more here as we have more to add.
    }

    getCoord() {
        return __(this).coord;
    }

    setCoord(new_coord) {
        __(this).coord = new_coord;
    }

    getBiome() {
        return __(this).biome;
    }

    setBiome(new_biome) {
        __(this).biome = new_biome;
    }

}//end class

exports.Hex = Hex;