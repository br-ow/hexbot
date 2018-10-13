/* A hex/hash map that stores all information about hexes in the world.
 * Author: Brifactor
 * Thanks to: https://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-singleton-in-javascript
 */
"use strict";

//Includes
const coord = require('./HexCoord.js');
const hex = require('./Hex.js');
var HashMap = require('hashmap');

/* Planned features:
 *  -Store every hex on the map
 *  -Store every edge between two hexes
 *  -Save the world to a JSON file whenever there is an update.
 *      (Figure out what to do when hexes are bulk-added or upated!)
 */
var worldInstance = (function() {
    //private members
    var map = new HashMap();

    //function privateMethod () {
        // ...
    //}

    return { // public interface
        // all private members are accesible here
        getHex: function (which_coord) {
            return map.get(which_coord.toString());
        },
        setHex: function (which_coord, which_hex) {
            map.set(which_coord.toString(), which_hex);
        }
    }; //end public
})();//end world

exports.instance = worldInstance;