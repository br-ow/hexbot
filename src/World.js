/* A hex/hash map that stores all information about hexes in the world.
 * Author: Brifactor
 * Thanks to: https://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-singleton-in-javascript
 */
"use strict";

//Includes
const HashMap = require('hashmap');
const coord = require('./HexCoord.js');
const hex = require('./Hex.js');
const config = require('../config.json'); //Config file

/* Planned features:
 *  -Store every hex on the map
 *  -Store every edge between two hexes
 *  -Create new hexes and edges as needed
 *  -Save the world to a JSON file whenever there is an update.
 *      (Figure out what to do when hexes are bulk-added or upated!)
 */
var worldInstance = (function() {
    //private members
    var map = new HashMap();

    //Make more hexes
    function __genHexes (where) {
        //will add if/else here later when fleshing out world gen
        __dummyGen(where);
    }

    //dummy world-generation method that creates a boring but valid world
    function __dummyGen(where) { 
        map.set(where.toString(), new hex.Hex(where, "Plains"));
    }

    //function privateMethod () {
        // ...
    //}

    return { // public interface
        // all private members are accesible here

        //gets a hex, or generates it if it doesn't exist
        getHex: function (which_coord) {
            if (map.has(which_coord.toString())) {
                //Everything is fine
            }
            else {
                //Generate more hexes!
                __genHexes(which_coord);
            }

            return map.get(which_coord.toString());
        },

        //used for updating hexes (building, etc)
        setHex: function (which_coord, which_hex) {
            map.set(which_coord.toString(), which_hex);
        }
    }; //end public
})();//end world

exports.instance = worldInstance;