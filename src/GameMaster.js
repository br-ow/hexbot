/* Handles or coordinates any task involved in playing sessions.
 * Author: Brifactor
 */

const hex_coord = require ('../src/HexCoord.js');
const world_mod = require('../src/World.js');
var world = world_mod.instance;
const hex = require('../src/Hex.js');
const sess = require('../src/Session.js');

var gmInstance = (function() {
    //private members
    var sessions = [];

    function whichSessionHas(user) {
        var answer = -1;
        sessions.forEach(function(item, index, array) {
            if(item.hasUser(user) === true) {
                answer = index;
            }
        });
        return answer;
    }
    //function privateMethod () {
        // ...
    //}

    return { // public interface
        // all private members are accesible here
        getSessions: function () {
            return sessions;
        },

        hasSessionWith: function (user) {

            var answer = false;
            sessions.forEach(function(item, index, array) {
                if(item.hasUser(user) === true) {
                    answer = true; //inside an if so we don't overwrite it
                }
            });
            return answer;
        },

        makeSessionFor: function (new_user) {
            var success;
            if (this.hasSessionWith(new_user)) {
                success = false; //can't play in two sessions at once
            }
            else {
                sessions.push(new sess.Session(new_user));
                success = true;
            }
            return success;
        },

        addUserByTag: function (new_user, tag_user) {
            var success;
            var tag_index = whichSessionHas(tag_user);
            if (this.hasSessionWith(new_user) || (this.hasSessionWith(tag_user) === false)) {
                success = false; //can't play in two sessions at once
            }
            else {
                var s_index = whichSessionHas(tag_user);
                success = true;
                (sessions[s_index]).addUser(new_user);
            }
            return success;
        },

        removeFromSession: function (user) {
            var success;
            if (this.hasSessionWith(user)) {
                success = true;
                var s_index = whichSessionHas(user);
                (sessions[s_index]).removeUser(user);
            }
            else {
                success = false;
            }
            return success;
        }

    }; //end public
})();//end world

exports.instance = gmInstance;