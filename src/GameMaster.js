/* Handles or coordinates any task involved in playing sessions.
 * Author: Brifactor
 */

const math = require('mathjs');
const hex_coord = require ('../src/HexCoord.js');
const world_mod = require('../src/World.js');
var world = world_mod.instance;
const hex = require('../src/Hex.js');
const sess = require('../src/Session.js');
const config = require('../config.json'); //Config file

var gmInstance = (function() {
    //private members
    var __sessions = [];

    function __whichSessionHas(user) {
        var answer = -1;
        __sessions.forEach(function(item, index, array) {
            if(item.hasUser(user) === true) {
                answer = index;
            }
        });
        return answer;
    }

    //Return from NavDir (used for veering)
    //TO HexDir (used for HexCoord manipulation)
    function __NavToHex(number) {
        var actual_dir;
        /*
         * Since we're using FLAT-TOPPED hexes, directions are:
         * 0 = NE;  1 = E;  2 = SE
         * 3 = S;  4 = SW;  5 = W
         * 6 = NW; 7 = N
         */
        switch(number) {
            case 1:
                actual_dir = 6;
                break;
            case 2:
                actual_dir = 1;
                break;
            case 3:
                actual_dir = 2;
                break;
            case 4:
                actual_dir = 3;
                break;
            case 5:
                actual_dir = 7;
                break;
            case 6:
                actual_dir = 4;
                break;
            case 7:
                actual_dir = 5;
                break;
            default: //hopefully only 0
                actual_dir = 0;
                break;
        }

        return actual_dir;
    }

    //Alternate method of numbering directions
    //For party navigation only.
    //So it's easier to write code for veering off course
    function __HexToNav(number) {
        var actual_dir;
        /*
         * Since we're using FLAT-TOPPED hexes, directions are:
         * 0 = NE;  1 = SE;  2 = S
         * 3 = SW;  4 = NW;  5 = N
         * 6 = E; 7 = W
         */
        switch(number) {
            case 1:
                actual_dir = 2;
                break;
            case 2:
                actual_dir = 3;
                break;
            case 3:
                actual_dir = 4;
                break;
            case 4:
                actual_dir = 6;
                break;
            case 5:
                actual_dir = 7;
                break;
            case 6:
                actual_dir = 1;
                break;
            case 7:
                actual_dir = 5;
                break;
            default: //hopefully only 0
                actual_dir = 0;
                break;
        }

        return actual_dir;
    }

    //function privateMethod () {
        // ...
    //}

    return { // public interface
        // all private members are accesible here

        //----------------------- Join/Leave Sessions ---------------------------
        getSessions: function () {
            return __sessions;
        },

        listSessions: function () {
            var output = "";
            if (__sessions.length === 0) {
                output = "There are no active sessions currently!";
            }
            else {
                output = "Current Sessions: ";
                var users;
                var biome;
                __sessions.forEach(function(sess, index, array) {
                    output += `\n Session ${index}: \n  Users: `;
                    users = sess.getUsers();
                    users.forEach(function(user, index, array) {
                        output += `${user}; `;
                    });
                    biome = world.getHex(sess.getPos().round()).getBiome();
                    output += `\n  Biome: ${biome}`;
                });
            }
            return output;
        },

        hasSessionWith: function (user) {

            var answer = false;
            __sessions.forEach(function(item, index, array) {
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
                __sessions.push(new sess.Session(new_user));
                success = true;
            }
            return success;
        },

        addUserByTag: function (new_user, tag_user) {
            var success;
            var tag_index = __whichSessionHas(tag_user);
            if (this.hasSessionWith(new_user) || (this.hasSessionWith(tag_user) === false)) {
                success = false; //can't play in two sessions at once
            }
            else {
                var s_index = __whichSessionHas(tag_user);
                success = true;
                (__sessions[s_index]).addUser(new_user);
            }
            return success;
        },

        addUserByIndex: function (new_user, index) {
            var success;
            var try_index = math.round(index);
            if (this.hasSessionWith(new_user) || (try_index < 0) || (try_index >= __sessions.length)) {
                success = false;
            }
            else {
                success = true;
                (__sessions[index]).addUser(new_user);
            }
            return success;
        },

        removeFromSession: function (user) {
            var success;
            if (this.hasSessionWith(user)) {
                success = true;
                var s_index = __whichSessionHas(user);
                (__sessions[s_index]).removeUser(user);
                if((__sessions[s_index]).numUsers() <= 0) {
                    //if a session has no users, end it
                    __sessions.splice(s_index, 1);
                }
            }
            else {
                success = false;
            }
            return success;
        },
        //------------ Navigation ------------------------
        setFacing: function (nav_dir, user) {//uses __NavDir directions
            var success;
            var which_s = __whichSessionHas(user);

            if (which_s === -1) {
                success = false;
            }
            else {
                success = true;
                __sessions[which_s].setFacing(__NavToHex(nav_dir));
            }
            return success;
        },

        getFacing: function (user) {//uses __navDir directions
            var answer;
            var which_s = __whichSessionHas(user);

            if (which_s === -1) {
                answer = -1;
            }
            else {
                answer = __HexToNav(__sessions[which_s].getFacing());
            }
            return answer;
        },

        getPos: function (user) {//uses __navDir directions
            var answer;
            var which_s = __whichSessionHas(user);

            if (which_s === -1) {
                answer = -1;
            }
            else {
                answer = __sessions[which_s].getPos();
            }
            return answer;
        },

        //basic walking the party in a direction for some hours
        walkHr: function (hours, user) {
            var success;
            var which_s = __whichSessionHas(user);

            if (which_s === -1) {
                success = false;
            }
            else {
                success = true;
                var session = __sessions[which_s];
                var pos = session.getPos();
                var facing = session.getFacing();
                var distance = (Number(config.travel_rate))*(Number(hours));
                var new_pos = pos.shift(facing, distance);
                session.setPos(new_pos);
                session.passMinutes(math.round(60*hours));
            }
            return success;
        },

        currentBiome(user) {
            var answer;
            var which_s = __whichSessionHas(user);

            if (which_s === -1) {
                answer = "none";
            }
            else {
                success = true;
                answer = world.getHex(__sessions[which_s].getPos().round()).getBiome();
            }
            return answer;
        }

    }; //end public
})();//end world

exports.instance = gmInstance;