/* Contains everything that needs to be known about a certain area.
 * Author: Brifactor
 */
"use strict";

const coord = require('./HexCoord.js');

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
        this.coord = coordinate;
        this.biome = biome;
        //add more here as we have more to add.
    }

}//end class

exports.Hex = Hex;