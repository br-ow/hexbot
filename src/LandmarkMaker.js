/* Creates landmarks.
 * Author: Brifactor
 */

const coord = require('./HexCoord.js');
const landmark = require('./Landmark.js');

var landmarkMaker = (function() {
    //private members

    //function privateMethod () {
        // ...
    //}

    return { // public interface
        // all private members are accesible here

        //Makes a landmark in this hex
        makeLandmark: function (hex_pos, biome) {
            //dummy version of the function for now
            return new landmark.Landmark(hex_pos, "a large, old tree with many gnarled branches", "a big tree");
        }
    }; //end public
})();//end world

exports.instance = landmarkMaker;